// import components

import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import { useEffect } from "react";
import Skills from './components/Skills';
import DocumentUpload from './pages/DocumentUpload';
import PaperChainRegistration from './pages/PaperChainRegistration';
import QRCodeIssuerSignature from './pages/QRCodeIssuerSignature';
import Verification from './pages/Verification';
// Animation package
import Aos from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });
  }, []);
  return (
    <div className="">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path ="/paperchain-registration" element= {<PaperChainRegistration />}/> 
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path ="/qrCodeissuersignature" element= {<QRCodeIssuerSignature />}/> 
        <Route path="/verification" element={<Verification />} /> 
      </Routes>
    </div>
  );
};

export default App;
