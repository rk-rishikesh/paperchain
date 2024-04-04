export const PaperChainAddress = "0x6B31234ad8Bd2DE42c9a35DeBC0D8D197B07D0eb";

export const PaperChainABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "documentRoot",
        type: "bytes32",
      },
    ],
    name: "DocumentStored",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_documentHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_documentRoot",
        type: "bytes32",
      },
    ],
    name: "storeDoc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_documentHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "_merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "checkValidity",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "documentRoots",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
