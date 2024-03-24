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
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Verification</h2>
        <input
          type="text"
          placeholder="Enter Document Hash"
          value={inputHash}
          onChange={(e) => setInputHash(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={handleVerification}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Verify
        </button>
        <p style={{ fontSize: '16px', color: '#555' }}>{verificationResult}</p>
      </div>
    </div>
  );
};

export default Verification;
