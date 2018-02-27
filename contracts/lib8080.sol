pragma solidity ^0.4.16;

library lib8080 {

  struct input8080 {
    int8 power;      // input from "Power", x10 (w) 
    uint32 totalImport;    // input from "TotalImport": x100 (wh)
    uint32 totalExport;    // input from "TotalExport": x100 (wh)
  }

  struct input8080Map {
    mapping(uint=>bool) allowedID;
    mapping(uint=>mapping(uint=>input8080)) inputMap;
  } 

  function readInput (input8080Map storage _map, uint _timestamp, uint _id, int8 _p, uint32 _ti, uint32 _te) public {
    require(_map.allowedID[_id] == true);
    _map.inputMap[_id][_timestamp] = input8080(_p, _ti, _te);
  }

  function setAllowedID (input8080Map storage _map, uint _id) public {
    _map.allowedID[_id] = true;
  }

}
