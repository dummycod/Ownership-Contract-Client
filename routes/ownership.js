const express = require("express");
const {
  getAccounts,
  addFile,
  getOwner,
} = require("../controllers/ownershipController");

const router = express.Router();

router.route("/getaccounts").get(getAccounts);
router.route("/addfile").post(addFile);
router.route("/getowner/:filehash").get(getOwner);

module.exports = router;
