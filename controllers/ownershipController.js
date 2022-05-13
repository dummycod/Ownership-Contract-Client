const BigPromise = require("../utils/BigPromise");
const Web3 = require("web3");
const { Ownershipcontract, contractAddress } = require("../utils/contract");

const web3 = new Web3("HTTP://127.0.0.1:7545");

//Get the list of accounts on the node
exports.getAccounts = BigPromise(async function (req, res, next) {
  const accounts = await web3.eth.getAccounts();
  res.status(200).json({
    success: true,
    account: accounts[0],
  });
});

//store the file hash on the Blockchain.
exports.addFile = BigPromise(async function (req, res, next) {
  const pvtKey =
    "be4d54f3058accb0cfe0889efba3d7d4bdb36cdcd0cfcbebd06db89c695c6e22";

  const owner = req.body.owner;
  const fileHash = req.body.fileHash;

  const txObject = {
    to: contractAddress,
    gas: 100000,
    gasPrice: web3.utils.toWei("10", "gwei"),
    data: Ownershipcontract.methods.set(owner, fileHash).encodeABI(),
  };

  const signedTransaction = web3.eth.accounts.signTransaction(txObject, pvtKey);

  signedTransaction.then((st) => {
    const sentTx = web3.eth.sendSignedTransaction(st.raw || st.rawTransaction);

    sentTx.on("receipt", (receipt) => {
      // console.log("receipt", receipt);
      res.status(200).json({
        success: true,
        transactionhash: receipt.transactionHash,
      });
    });

    sentTx.on("error", (err) => {
      // console.log("error", err);
      res.status(500).json({
        success: false,
        err,
      });
    });
  });
});

//get the owner of the file along with timestamp.
exports.getOwner = BigPromise(async function (req, res, next) {
  const fileHash = req.params.filehash;
  Ownershipcontract.methods.get(fileHash).call((err, ownerObj) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
    } else {
      const { owner, timestamp } = ownerObj;
      res.status(200).json({
        success: true,
        owner,
        timestamp,
      });
    }
  });
});

/**
 * 1) Get The Account Details.
 * 2) Create a Contract Object.
 * 3) Call the contract methods.
 * 4) Build the front-end.
 */
