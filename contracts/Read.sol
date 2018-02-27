pragma solidity ^0.4.16;

import "./lib7070.sol";
import "./lib8080.sol";
import "./lib9090.sol";

contract Read {

  using lib7070 for *;
  using lib8080 for *;
  using lib9090 for *;

  lib7070.input7070Map map7;
  lib8080.input8080Map map8;
  lib9090.input9090Map map9;

  uint tempNow_7;
  uint tempNow_8;
  uint tempNow_9;

  function Read() public {
    // constructor
    map8.setAllowedID(11);
    map8.setAllowedID(12);
  }

  function read7070(uint8 _mc) public {
    map7.readInput(now, _mc);
    tempNow_7 = now;
  }

  function read8080(uint _id, int8 _p, uint32 _ti, uint32 _te) public {
    map8.readInput(now, _id, _p, _ti, _te);
    tempNow_8 = now;
  }

  function read9090(uint8 _p, bool _dir, uint32 _e) public {
    map9.readInput(now, _p, _dir, _e);
    tempNow_9 = now;
  }

  function get7070() view public returns (uint8) {
    return map7.inputMap[tempNow_7].maxCurrent;
  }

  function get8080(uint _id) view public returns (int8 _p, uint32 _ti, uint32 _te) {
    _p = map8.inputMap[_id][tempNow_8].power;
    _ti = map8.inputMap[_id][tempNow_8].totalImport;
    _te = map8.inputMap[_id][tempNow_8].totalExport;
  }

  function get9090() view public returns (uint8 _p, bool _dir, uint32 _e) {
    _p = map9.inputMap[tempNow_9].power;
    _dir = map9.inputMap[tempNow_9].direction;
    _e = map9.inputMap[tempNow_9].energy;
  }
}
