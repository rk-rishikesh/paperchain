import { MerkleTree } from "merkletreejs";
import { keccak256 } from "js-sha3";

export const generateMerkelProof = async (documents, documentHash) => {
  console.log(documents);
  console.log(documentHash);

  const leaves = documents.map((p) => keccak256(p));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });

  const merkleRoot = tree.getHexRoot();
  console.log("Root : ", merkleRoot);

  const merkleProof = tree.getHexProof(leaves[1]);
  console.log("Proof : ", merkleProof);

  console.log("Contract Leaf Input : ", keccak256(documentHash));

  return {
    merkleProof: merkleProof,
    contractLeafInput: keccak256(documents[1]),
    merkleRoot: merkleRoot
  };
  
};