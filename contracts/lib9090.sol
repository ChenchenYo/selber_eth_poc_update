pragma solidity ^0.4.16;

library lib9090 {

  struct input9090 {
    uint8 power;      // input from "1-0:15.7.0*255", x10 (w) 
    bool direction;   // input from "flowdirection": true +; false -
    uint32 energy;    // input from "1-0:2.8.0*255": x100 (wh)
  }

  struct input9090Map {
    mapping(uint=>input9090) inputMap;
  } 

  function readInput (input9090Map storage _map, uint _timestamp, uint8 _p, bool _dir, uint32 _e) public {
    _map.inputMap[_timestamp] = input9090(_p, _dir, _e);
  }

}
