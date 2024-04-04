// @ts-check
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { car } from "@helia/car";
import { unixfs } from "@helia/unixfs";
import { CarWriter } from "@ipld/car/writer";
import { useFiles } from "../hooks/useFiles";
import { useHelia } from "../hooks/useHelia";
import { CommP } from "@web3-storage/data-segment";
import { useSDK } from "@metamask/sdk-react";
import { PaperChainAddress, PaperChainABI } from "../contract/PaperChain";
import { ethers } from "ethers";
import { generateMerkelProof } from "../merkeltree/generateMerkelProof";

/**
 *
 * @param {File} file
 * @returns {Promise<Uint8Array>}
 */
async function readFileAsUint8Array(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result;
      if (arrayBuffer != null) {
        if (typeof arrayBuffer === "string") {
          const uint8Array = new TextEncoder().encode(arrayBuffer);
          resolve(uint8Array);
        } else if (arrayBuffer instanceof ArrayBuffer) {
          const uint8Array = new Uint8Array(arrayBuffer);
          resolve(uint8Array);
        }
        return;
      }
      reject(new Error("arrayBuffer is null"));
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 *
 * @param {AsyncIterable<Uint8Array>} carReaderIterable
 * @returns {Promise<Blob>}
 */
async function carWriterOutToBlob(carReaderIterable) {
  const parts = [];
  for await (const part of carReaderIterable) {
    parts.push(part);
  }
  return new Blob(parts, { type: "application/car" });
}

export default function CarCreator() {
  const { files } = useFiles();
  const { helia } = useHelia();
  const [carBlob, setCarBlob] = useState(/** @type {null | Blob} */ (null));
  const [rootCID, setRootCID] = useState(
    /** @type {null | import('multiformats').CID} */ (null)
  );
  const [pieceCID, setPieceCID] = useState("");
  const [pieceSize, setPieceSize] = useState(0);
  const [carSize, setCarSize] = useState(0);
  const [merkleRoot, setMerkelRoot] = useState("");
  const [leafInput, setLeafInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(false);

  const heliaCar = useMemo(() => {
    if (helia == null) {
      return null;
    }
    return car(helia);
  }, [helia]);
  const heliaFs = useMemo(() => {
    if (helia == null) {
      return null;
    }
    return unixfs(helia);
  }, [helia]);

  const generateCommP = async (bytes) => {
    const commP = await CommP.build(bytes);
    console.log(commP);
    const pieceSize = commP.pieceSize;
    setPieceSize(pieceSize);
    // Gives you a commP as a CID
    const cid = commP.link();
    setPieceCID(cid.toString());
  };

  useEffect(() => {
    if (heliaFs == null || heliaCar == null) {
      return;
    }
    const asyncFn = async () => {
      let rootCID = await heliaFs.addDirectory();
      for await (const file of files) {
        console.log(`current rootCID.toString(): `, rootCID.toString());
        const fileCid = await heliaFs.addBytes(
          await readFileAsUint8Array(file)
        );
        await generateCommP(await readFileAsUint8Array(file));
        const fileSize = await heliaFs.stat(fileCid);
        console.log(fileSize);
        console.log(`fileCid.toString(): `, fileCid.toString());
        console.log(fileCid);
        rootCID = await heliaFs.cp(fileCid, rootCID, file.name);
        console.log(`new rootCID.toString(): `, rootCID.toString());
      }

      const { writer, out } = await CarWriter.create(rootCID);

      // don't await yet..
      const carBlob = carWriterOutToBlob(out);
      // await the heliaCar.export, where heliaCar will write blocks to the writer
      await heliaCar.export(rootCID, writer);
      // await the blob since `out` will have things yielded from the heliaCar.export above.
      setCarBlob(await carBlob);
      setRootCID(rootCID);
      let docs = [];
      docs.push("PaperChainSignature");
      docs.push(rootCID?.toString());

      console.log(docs);
      const details = await generateMerkelProof(docs, docs[1]);
      console.log(details);
      // Execute Contract Here
    };
    asyncFn();
  }, [files, heliaFs, heliaCar]);

  const downloadCarFile = useCallback(async () => {
    if (carBlob == null) {
      return;
    }
    const downloadEl = document.createElement("a");
    const blobUrl = window.URL.createObjectURL(carBlob);
    downloadEl.href = blobUrl;
    downloadEl.download = "test.car";
    document.body.appendChild(downloadEl);
    downloadEl.click();
    window.URL.revokeObjectURL(blobUrl);
  }, [carBlob]);

  const [account, setAccount] = useState("");
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  // const [wallet, setWallet] = useState("");

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const createDossier = async () => {
    setLoading(true);
    const { ethereum } = window;
    var tx;
    if (ethereum) {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer);
      const paperChain = new ethers.Contract(
        PaperChainAddress,
        PaperChainABI,
        signer
      );
      let docs = [];
      docs.push("PaperChainSignature");
      docs.push(rootCID?.toString());

      console.log(docs);
      const details = await generateMerkelProof(docs, docs[1]);
      console.log(details.contractLeafInput);
      console.log(details.merkleRoot);
      const transaction = await paperChain.storeDoc(
        "0x" + details.contractLeafInput,
        details.merkleRoot
      );

      console.log(transaction);
      await transaction.wait();

      console.log(transaction.hash);
    }
    console.log("Create Dossier");
    setLoading(false);
    setSigned(true);
    return tx;
  };

  if (rootCID == null || files.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <>
        <div className="flex flex-row gap-2 justify-center mt-8 mb-4">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </>
    );
  } else {
    return (
      <div style={{ borderRadius: "3px", padding: "1rem" }}>
        {signed && (
          <>
          <div className="mb-4">✍️ Document Signed ✍️</div>
            <div className="grid grid-cols-2 w-[full] gap-2 max-[500px]:grid-cols-1 px-3">
            <div className="group w-full rounded-lg bg-[rgb(41,49,79)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]">
              <p className="text-white text-2xl">{pieceSize}</p>
              <p className="text-white text-sm">Piece Size</p>
            </div>
            <div className="group w-full rounded-lg bg-[rgb(41,49,79)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]">
              <p className="text-white text-2xl">{carBlob?.size}</p>
              <p className="text-white text-sm">Car Size</p>
            </div>
          </div>

          <div className="grid grid-cols-1 w-[full] gap-2 max-[500px]:grid-cols-1 px-3 mt-4">
            <div className="group w-full rounded-lg bg-[rgb(41,49,79)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]">
              <p className="text-white">{pieceCID}</p>
              <p className="text-white text-sm">Piece CID</p>
            </div>
          </div>

          <div className="grid grid-cols-1 w-[full] gap-2 max-[500px]:grid-cols-1 px-3 mt-4">
            <div className="group w-full rounded-lg bg-[rgb(41,49,79)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]">
              <p className="text-white ">{rootCID.toString()}</p>
              <p className="text-white text-sm">Car file CID</p>
            </div>
          </div>
            <button className="mt-4" onClick={downloadCarFile}>Download Car file</button>
          </>
        )}
        {!signed && (
        <button onClick={createDossier}>Sign Document</button>)}
      </div>
    );
  }
}
