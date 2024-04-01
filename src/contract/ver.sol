// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract PaperChain {

    mapping(address => bytes32) public documentRoots;
    
    event DocumentStored(address indexed user, bytes32 documentRoot);

    function storeDoc(bytes32 _documentRoot) public {
        documentRoots[msg.sender] = _documentRoot;
        emit DocumentStored(msg.sender, _documentRoot);
    }

    function storeDoc(bytes32 _documentRoot, bytes32[] calldata _merkleProof) public view returns (bool){
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, _documentRoot, leaf), "Incorrect proof");
        return true;
    }

}