pragma solidity ^0.4.16;

library lib7070 {

  struct input7070 {
    uint8 maxCurrent;      // input from "MaxChargeCurrentA"
  }

  struct input7070Map {
    mapping(uint=>input7070) inputMap;
  } 

  function readInput (input7070Map storage _map, uint _timestamp, uint8 _mc) public {
    _map.inputMap[_timestamp] = input7070(_mc);
  }

}
