var express = require("express");

var app = express();

app.use(express.static(__dirname + "/dist"));

var server = app.listen(6001, function () {
  console.log("/////////////////\\\\\\\\\\\\\\\\\\\\\\\\");
  console.log("listening on:", 6001);
  console.log("/////////////////\\\\\\\\\\\\\\\\\\\\\\\\");
});
