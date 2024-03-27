import { MerkleTree } from "merkletreejs";
import { keccak256 } from "js-sha3";
import Web3 from "web3";

export const generateMerkelProof = async (documents, documentHash) => {
  console.log(documents);
  console.log(documentHash);

  const leaves = documents.map((p) => keccak256(Web3.utils.asciiToHex(p)));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });

  const merkleRoot = tree.getHexRoot();
  console.log("Root : ", merkleRoot);

  const merkleProof = tree.getHexProof(leaves[1]);
  console.log("Proof : ", merkleProof);

  console.log("Contract Leaf Input : ", keccak256(Web3.utils.asciiToHex(documents[1])));

  return {
    merkleProof: merkleProof,
    contractLeafInput: keccak256(Web3.utils.asciiToHex(documents[1])),
    merkleRoot: merkleRoot
  };
  
};