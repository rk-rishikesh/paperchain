import React, { useState } from 'react';
import backgroundImage from '../assets/images/Hero/person3.png'; 

const Verification = () => {
  const [inputHash, setInputHash] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleVerification = () => {
    // Simulated verification process
    if (inputHash === "simulated_document_hash") {
      setVerificationResult("Document Verified Successfully");
    } else {
      setVerificationResult("Verification Failed");
    }
  };

  return (
    // <div
    //   style={{
    //     backgroundImage: `url(${backgroundImage})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     minHeight: '100vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    //   <div
    //     style={{
    //       backgroundColor: 'rgba(255, 255, 255, 0.8)',
    //       borderRadius: '10px',
    //       padding: '20px',
    //       textAlign: 'center',
    //       maxWidth: '400px',
    //     }}
    //   >
    //     <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Verification</h2>
    //     <input
    //       type="text"
    //       placeholder="Enter Document Hash"
    //       value={inputHash}
    //       onChange={(e) => setInputHash(e.target.value)}
    //       style={{
    //         width: '100%',
    //         padding: '10px',
    //         marginBottom: '20px',
    //         border: '1px solid #ccc',
    //         borderRadius: '5px',
    //       }}
    //     />
    //     <button
    //       onClick={handleVerification}
    //       style={{
    //         backgroundColor: '#007bff',
    //         color: '#fff',
    //         border: 'none',
    //         borderRadius: '5px',
    //         padding: '10px 20px',
    //         fontSize: '16px',
    //         cursor: 'pointer',
    //         transition: 'background-color 0.3s',
    //       }}
    //     >
    //       Verify
    //     </button>
    //     <p style={{ fontSize: '16px', color: '#555' }}>{verificationResult}</p>
    //   </div>
    // </div>

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
          <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
              <h3 class="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                Verify Document
              </h3>
            </div>
            <div class="flex flex-col gap-4 p-6">
              <label for="file" class="custum-file-upload">
                <div class="icon flex justify-center items-center">
                  <img
                    className="w-32"
                    src="https://cdn-icons-png.freepik.com/512/9737/9737932.png"
                  />
                </div>
                <div class="text">
                  <p class="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                    Click to upload image
                  </p>
                </div>
                <input
                  onChange={handleVerification}
                  id="file"
                  type="file"
                  style={{display:"none"}}
                />
              </label>
              <button
                onClick={handleVerification}
                className="bg-black text-white py-2 px-4 rounded-lg focus:outline-none"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Verification;
