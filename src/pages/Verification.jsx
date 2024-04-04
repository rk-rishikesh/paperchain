import React, { useState } from "react";
import backgroundImage from "../assets/images/Hero/person3.png";
import FileUploader from "./FileUploader";
import FileProvider from "../provider/FileProvider";
import CarVerifier from "./CarVerifier";

const Verification = () => {

  return (
    <section id="document-upload" className="overflow-hidden relative">
      {/* Image */}
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
                  Verify Document
                </h3>
              </div>
              <div class="flex flex-col gap-4 p-6">
                <FileProvider>
                  <FileUploader />
                  <CarVerifier />
                </FileProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verification;
