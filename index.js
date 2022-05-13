require("dotenv").config();
const app = require("./app");
var http = require("http").Server(app);
var io = require("socket.io")(http);
const { Ownershipcontract } = require("./utils/contract");

Ownershipcontract.events
  .logFileAddedStatus()
  .on("data", (data) => {
    io.send(data);
  })
  .on("error", console.log);

http.listen(3000, () => {
  console.log(`Listening on PORT 3000`);
});
