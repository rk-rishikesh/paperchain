// import components

import React from 'react';
import { ethers } from "ethers";
import {PaperChainAddress} from "./contract/PaperChain.js"
import {PaperChainABI} from "./contract/PaperChain.js"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import { useEffect } from "react";
import Skills from './components/Skills';
import DocumentUpload from './pages/DocumentUpload';
import Verification from './pages/Verification';
// Animation package
import Aos from "aos";
import "aos/dist/aos.css";

const App = () => {
  // const [publicKey, setPublicKey] = useState();
  // const [connected, setConnected] = useState(false);
  // const [chainId, setChainId] = useState();
  // const [msg, setMsg] = useState();
  // const [contract, setContract] = useState();

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });

  }, []);
  // const connectButton = async () => {
  //   const { ethereum } = window;
  //   if (ethereum.isMetaMask) {
  //     try {
  //       await ethereum.request({ method: 'eth_requestAccounts' });
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const network = await provider.getNetwork();
  //       setChainId(network.chainId);
  //       const signer = provider.getSigner();
  //       setPublicKey(await signer.getAddress());
  //       const contract = new ethers.Contract(PaperChainAddress, PaperChainABI, signer);
  //       setContract(contract);
  //       setConnected(true);
  //     } catch (error) {
  //       console.error(error);
  //       setMsg("Error connecting to MetaMask");
  //     }
  //   } else {
  //     setMsg("Install MetaMask");
  //   }
  // };
  // const writeDocument = async (_documentRoot) => {
  //   try {
  //     await contract.storeDoc(_documentRoot);
  //     console.log("Document written successfully!");
  //   } catch (error) {
  //     console.error("Error writing document:", error);
  //   }
  // };

  // const readNotice = async (_documentRoot, _merkleProof) => {
  //   try {
  //     const isValid = await contract.checkValidity(_documentRoot, _merkleProof);
  //     console.log('Document validity:', isValid);
  //   } catch (error) {
  //     console.error('Error checking document validity:', error);
  //   }
  // };


  
  return (
    <div className="">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/issue-document" element={<DocumentUpload />} />
        <Route path="/verify-document" element={<Verification />} /> 
      </Routes>
    </div>
  );
};

export default App;
