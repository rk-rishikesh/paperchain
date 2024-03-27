const { ethers } = require("ethers");
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = ethers.utils;

export const generateMerkelRoot = async(documents) => {

    // Creating a buffer since we bytes array
    const padBuffer = (docHash) => {
        return Buffer.from(docHash.substr(2).padStart(32 * 2, 0), "hex");
    };
  
    // Creating buffer from leaves (lowest points in tree)
    const leaves = documents.map((docHash) => padBuffer(docHash));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    
    // Creating a merkleRoot that we'll inject into smart contract
    const merkleRoot = tree.getHexRoot();

    return {
        merkelRoot: merkleRoot
    }

}