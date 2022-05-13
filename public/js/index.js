function submit() {
  var file = $("#formFile")[0].files[0];
  if (file) {
    var owner = $("#ownername").val();
    if (owner == "") {
      alert("Please Enter owner name");
    } else {
      var reader = new FileReader();
      reader.onload = function (event) {
        var file_wordArr = CryptoJS.lib.WordArray.create(event.target.result);
        var hash = CryptoJS.SHA1(file_wordArr).toString(CryptoJS.enc.Hex);
        var alertBox = $("#alert");

        $.post(
          "http://localhost:3000/api/v1/addfile",
          {
            owner,
            fileHash: hash,
          },
          (data) => {
            alertBox.html(
              "Transaction Hash: " + JSON.stringify(data.transactionhash)
            );
          }
        ).fail((response) => {
          alert(JSON.stringify(response));
          alertBox.html("Error Occurred");
        });
      };
      reader.readAsArrayBuffer(file);
    }
  } else {
    alert("File is not present");
  }
}

function getInfo() {
  var file = $("#formFile")[0].files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var file_wordArr = CryptoJS.lib.WordArray.create(event.target.result);
      var hash = CryptoJS.SHA1(file_wordArr).toString(CryptoJS.enc.Hex);
      var alertBox = $("#alert");

      $.get("http://localhost:3000/api/v1/getowner/" + hash, (data) => {
        if (data.success == true) {
          if (data.owner == "") {
            alertBox.innerHTML = "File not Found";
          } else {
            var d = new Date(data.timestamp * 1000);
            alertBox.html("Owner Name : " + data.owner + "<br> Time :" + d);
          }
        } else {
          alertBox.html("Error Occurred While Getting The Info..");
        }
      }).fail((response) => {
        alertBox.html("Error Occurred While Getting The Info..");
      });
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert("File is not present");
  }
}

function transactionItem(
  event,
  block_no,
  block_hash,
  tx_hash,
  address,
  signature
) {
  var div = $("<div>", { id: "foo", class: "alert alert-success transaction" });
  div.append(`<p><b>Event: </b>${event}</p>`);
  div.append(`<p><b>Block No. : </b>${block_no}</p>`);
  div.append(`<p><b>Block Hash: </b>${block_hash}</p>`);
  div.append(`<p><b>Tx Hash: </b>${tx_hash}</p>`);
  div.append(`<p><b>Address: </b>${address}</p>`);
  div.append(`<p><b>Signature: </b>${signature}</p>`);
  return div;
}

const socket = io();

socket.on("connect", () => {
  console.log("Connection Established...");
  socket.on("message", (msg) => {
    if (msg) {
      $("#no-tx").hide();
      var tx = transactionItem(
        msg.event,
        msg.blockNumber,
        msg.blockHash,
        msg.transactionHash,
        msg.address,
        msg.signature
      );
      $("#transaction-list").prepend(tx);
    }
  });
});
