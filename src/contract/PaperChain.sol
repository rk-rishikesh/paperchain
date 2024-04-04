// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract PaperChain {

    mapping(bytes32 => bytes32) public documentRoots;

    event DocumentStored(address indexed user, bytes32 documentRoot);

    function storeDoc(bytes32 _documentHash, bytes32 _documentRoot) public {
        documentRoots[_documentHash] = _documentRoot;
        emit DocumentStored(msg.sender, _documentRoot);
    }

    function checkValidity(bytes32 _documentHash, bytes32[] calldata _merkleProof) public view returns (bool){
        require(MerkleProof.verify(_merkleProof, documentRoots[_documentHash], _documentHash), "Incorrect proof");
        return true;
    }
    
}
