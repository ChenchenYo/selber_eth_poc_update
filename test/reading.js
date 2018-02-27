var Read = artifacts.require("./Read.sol");
var fs = require('fs');

// var url = 'http://www.wikiproofs.org:7070/api/status';
var input_7 = null;
var input_8 = null;
var input_9 = null;

fs.readFile('test/data/input_7070_stat.json', 'utf8', function (err, data) {
  if (err) throw err;
  input_7 = JSON.parse(data);
});

fs.readFile('test/data/input_8080_stat.json', 'utf8', function (err, data) {
  if (err) throw err;
  input_8 = JSON.parse(data);
});

fs.readFile('test/data/input_9090_stat.json', 'utf8', function (err, data) {
  if (err) throw err;
  input_9 = JSON.parse(data);
});

var read = null;

contract('reading', function(accounts) {

  it("is reading and storing data", function () {
    return Read.deployed().then(function (instance) {
      read = instance;
      console.log("Contract deployed");

      return get7070(input_7);

    }).then(function (result) {

      console.log("got from 7070");

      return read.get7070.call();

    }).then(function (result) {
      console.log("the valued put just now was ", result.toNumber());
      return get8080(input_8);

    }).then(function (result) {

      console.log("got from 8080");

      return read.get8080.call(11);
    }).then(function (result) {
      console.log("the valued put just now was ", result[0].toNumber()/10, result[1].toNumber()/100, result[2].toNumber()/100);
      return get9090(input_9);

    }).then(function (result) {

      console.log("got from 9090");

      return read.get9090.call();
    }).then(function (result) {
      console.log("the valued put just now was ", result[0].toNumber()/10, result[1], result[2].toNumber()/100);
      
    });
  });
});

function get7070(element) {
  console.log("Reading from port 7070. Anything wrong? " + element["Errors"]["StateF"] + " with value of " + element["MaxChargeCurrentA"]);

  var addPromise = read.read7070(element["MaxChargeCurrentA"]);

  return addPromise;
}

function get8080(element) {

  var _id = element["UniqueId"].slice(10);
  console.log("Reading from port 8080. From device " + _id);

  var addPromise = read.read8080(parseInt(_id, 10), element["Power"]["L2"]*10, element["TotalImport"]*100, element["TotalExport"]*100);

  return addPromise;
}

function get9090(element) {

  console.log("Reading from port 9090. Anything wrong? " + element["status"]["error"]);

  if (element["status"]["flowdirection"] == "+A") {
    var _dir = true;
  } else {
    var _dir = false;
  }

  var addPromise = read.read9090(element["1-0:15.7.0*255"]*10, _dir, element["1-0:2.8.0*255"]*100);

  return addPromise;
}