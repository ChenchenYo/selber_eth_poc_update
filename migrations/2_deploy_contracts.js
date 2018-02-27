var lib7070 = artifacts.require("./lib7070.sol");
var lib8080 = artifacts.require("./lib8080.sol");
var lib9090 = artifacts.require("./lib9090.sol");

var Read = artifacts.require("./Read.sol");


module.exports = function(deployer) {
    console.log("migrations deploying...");
    deployer.deploy(lib7070).then(function() {

    return deployer.link(lib7070,Read);
  }).then(function() {
    return deployer.deploy(lib8080);
  }).then(function() {
    return deployer.link(lib8080,Read);
  }).then(function() {
    return deployer.deploy(lib9090);
  }).then(function() {
    return deployer.link(lib9090,Read);
  }).then(function() {
    return deployer.deploy(Read);
  }).then(function() {
    console.log("Read ADDRESS: " + Read.address);

    console.log("\n\n----------------\nDEPLOYMENT DONE!\n----------------\n\n");
  });
}
