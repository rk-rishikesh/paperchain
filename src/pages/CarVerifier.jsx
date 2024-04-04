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

export default function CarVerifier() {
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
  const [result, setResult] = useState(0);

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

  const verify = async () => {
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
      // console.log(details.merkleRoot);
      // setMerkelRoot(details.merkleRoot);
      // setLeafInput(details.contractLeafInput);
      console.log(details.contractLeafInput);
      console.log(details.merkleProof);
      try {
        const transaction = await paperChain.checkValidity(
          "0x" + details.contractLeafInput,
          details.merkleProof
        );
        console.log("Document validity:", transaction);
        setResult(1); // 1 : True
      } catch (error) {
        console.error("Error checking document validity:", error);
        console.log("Document validity: False");
        setResult(2); // 2 : False
      }
    }
  };

  if (rootCID == null || files.length === 0) {
    return null;
  }

  return (
    <div style={{ borderRadius: "3px", padding: "1rem" }}>
      {result == 1 && (
        <>
          <div className="mb-4">✅ Document Verified Successfully ✅</div>
          <div className="flex justify-center">
            <img
              className="justify-center w-96"
              src="https://img.freepik.com/premium-vector/compliance-document-icon-comic-style-approved-process-vector-cartoon-illustration-white-isolated-background-checkmark-business-concept-splash-effect_157943-23066.jpg"
            />
          </div>
        </>
      )}
      {result == 2 && (
        <>
          <div className="mb-4">❌ Document Not Verified ❌</div>
          <div className="flex justify-center">
            <img
              className="justify-center w-96"
              src="https://img.freepik.com/premium-vector/fake-document-profile-fraud-paper-office-stamp-concept-flat-graphic-design-illustration_133260-7396.jpg"
            />
          </div>
        </>
      )}
      {result == 0 && <button onClick={verify}>Verify Document</button>}
    </div>
  );
}
