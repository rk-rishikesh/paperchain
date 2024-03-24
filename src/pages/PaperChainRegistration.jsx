import React from 'react';
import backgroundImage from '../assets/images/Hero/person2.png'; // Adjust the path as per your project structure

const PaperchainRegistration = ({ document }) => {
  // Simulated processing and registration on blockchain
  const registerDocument = () => {
    // Perform processing and registration
    alert("Document registered on Paperchain successfully!");
  };

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative', // Add this line
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjust opacity here (0.5 for 50% opacity)
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    maxWidth: '400px',
    zIndex: 1, // Ensure content is above overlay
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} ></div> {/* Overlay for background image */}
      <div style={contentStyle} data-aos="fade-up">
        <h2 style={{ color: '#111', fontSize: '24px', marginBottom: '10px' }}>Paperchain Registration</h2>
        <p style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>Document Name: {document ? document.name : "No document uploaded"}</p>
        <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={registerDocument}>Register on Paperchain</button>
      </div>
    </div>
  );
};

export default PaperchainRegistration;
