const Web3 = require("web3");

const web3 = new Web3(process.env.WS_ADDRESS);

web3.setProvider(new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545"));

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "owner",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileHash",
        type: "string",
      },
    ],
    name: "logFileAddedStatus",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "owner",
        type: "string",
      },
      {
        internalType: "string",
        name: "fileHash",
        type: "string",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fileHash",
        type: "string",
      },
    ],
    name: "get",
    outputs: [
      {
        internalType: "string",
        name: "owner",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const contractAddress = process.env.CONTRACT_ADDRESS;

const Ownershipcontract = new web3.eth.Contract(abi, contractAddress);

module.exports = { Ownershipcontract, contractAddress };
