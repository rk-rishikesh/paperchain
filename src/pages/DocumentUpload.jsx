import React, { useState, useEffect } from "react";
import { content } from "../Content";
import backgroundImage from "../assets/images/Hero/person3.png";
import { useHelia } from "../hooks/useHelia";
import FileUploader from "./FileUploader";
import FileProvider from "../provider/FileProvider";
import CarCreator from "./CarCreator";
import { useSDK } from "@metamask/sdk-react";

const DocumentUpload = () => {
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

  return (
    <section id="document-upload" className="overflow-hidden relative">
      {/* Image */}
      {/* <button style={{ padding: 10, margin: 10 }} onClick={connect}>
                Connect
            </button>
            {connected && (
                <div>
                    <>
                        {chainId && `Connected chain: ${chainId}`}
                        <p></p>
                        {account && `Connected account: ${account}`}
                    </>
                </div>
            )} */}
      <div
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
          opacity: 0.7,
          position: "absolute", // Ensure image is below text content
          backgroundImage: `url(${backgroundImage})`,
        }}
        alt="..."
        className="h-full object-cover"
      ></div>

      {/* Text content */}
      <div className="min-h-screen relative flex flex-col justify-center items-center">
        <div className="pb-16 px-6 pt-5 text-center" data-aos="fade-up">
          <div className="flex flex-col gap-10 mt-10 z-10">
            {" "}
            {/* Adjust z-index to ensure text is above image */}
            <div class="relative flex w-[800px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div class="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
                <h3 class="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                  Document Upload
                </h3>
              </div>
              <div class="flex flex-col gap-4 p-6">
                <FileProvider>
                  <FileUploader />
                  <CarCreator />
                </FileProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentUpload;
