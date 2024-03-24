import React, { useState } from 'react';
import { content } from "../Content";

const DocumentUpload = ({ onUpload }) => {
  const { hero } = content;
  const [document, setDocument] = useState(null);

  const handleDocumentUpload = (event) => {
    const uploadedDocument = event.target.files[0];
    setDocument(uploadedDocument);
  };

  const handleUpload = () => {
    if (document) {
      onUpload(document);
      setDocument(null);
    } else {
      alert("Please upload a document");
    }
  };

  return (
    <section id="document-upload" className="overflow-hidden relative">
      {/* Image */}
      <img
        src={hero.image1}
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
          opacity: 0.7,
          position: 'absolute' // Ensure image is below text content
        }}
        alt="..."
        className="h-full object-cover"
      />

      {/* Text content */}
      <div className="min-h-screen relative flex flex-col justify-center items-center">
        <div className="pb-16 px-6 pt-5 text-center" data-aos="fade-up">
          <h2 className="text-black">Document Upload</h2>
          <br />
          <div className="flex flex-col gap-10 mt-10 z-10"> {/* Adjust z-index to ensure text is above image */}
            <input type="file" onChange={handleDocumentUpload} className="bg-black text-white py-2 px-4 border border-white focus:outline-none" />
            <button onClick={handleUpload} className="bg-black text-white py-2 px-4 rounded-lg focus:outline-none">Upload</button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default DocumentUpload;
