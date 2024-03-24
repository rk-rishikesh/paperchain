import React from 'react';
import backgroundImage from '../assets/images/Hero/person4.png'; // Adjust the path to your background image

const QRCodeIssuerSignature = ({ documentHash }) => {
  // Simulated generation of QR code or issuer signature
  const generateQRCode = () => {
    // Generate QR code for document hash
    alert("QR Code generated successfully!");
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
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
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
        <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>QR Code / Issuer Signature</h2>
        <p style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>Document Hash: {documentHash}</p>
        <button
          onClick={generateQRCode}
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
          Generate QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodeIssuerSignature;
