//
//  Counter.swift
//  BridgeExample
//
//  Created by Nicolas on 14/04/2022.
//

import Foundation

class Counter: NSObject {
  
  public var _counter: Array<Int> = Array<Int>([0]);
  
  override init() {

  }
  
  // sends event to React Native
  func sendEvent (status: String, data: NSMutableDictionary) {
    ReactNativeEventEmitter.shared?.emitEvent(withName: "ExampleEvents", body: ["status": status, "data": data])
  }
  
  @objc func increase(_ indexToIncrease: Int) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
      // create a NSMutableDictionary to store event variables
      let params: NSMutableDictionary = [:]

      if (indexToIncrease < 0 || indexToIncrease > self._counter.count) {
    
        // add success variables to NSMutableDictionary
        params["index"] = indexToIncrease;
        params["error"] = "index to increase doesn't exist in counter array";
        
        // send error event
        self.sendEvent(status: "ERROR_INCREASE", data: params)
        return ;
      }
    
      // increase counter
      self._counter[indexToIncrease] += 1;
      
      // add success variables to NSMutableDictionary
      params["index_counter_value"] = self._counter[indexToIncrease];
      params["index"] = indexToIncrease;
      params["error"] = false;

      // send success event
      self.sendEvent(status: "SUCCESS_INCREASE", data: params)
    }
  }
  
  @objc func decrease(_ indexToDecrease: Int) {
    // create a NSMutableDictionary to store event variables
    let params: NSMutableDictionary = [:]
  
    if (indexToDecrease < 0 || indexToDecrease > _counter.count) {
  
      // add error variables to NSMutableDictionary
      params["index"] = indexToDecrease;
      params["error"] = "index to decrease doesn't exist in counter array";
      
      // send error event
      sendEvent(status: "ERROR_DECREASE", data: params)
      return ;
    }
  
    // decrease counter
    _counter[indexToDecrease] -= 1;
  
    // add success variables to NSMutableDictionary
    params["index_counter_value"] = _counter[indexToDecrease];
    params["index"] = indexToDecrease;
    params["error"] = false;

    // send success event
    sendEvent(status: "SUCCESS_DECREASE", data: params)  }

  // a simple getter for _counter
  @objc func getCounter() {
    // create a NSMutableDictionary to store event variables
    let params: NSMutableDictionary = [:]
  
    // create a NSMutableArray to store counter array
    let counterArray: NSMutableArray = []

    // fill NSMutableArray with counter array values
    for i in (0..._counter.count-1) {
      counterArray.add(_counter[i]);
    }
    
    // add NSMutableArray to NSMutableDictionary
    params["counter"] = counterArray;
    
    // send success event
    sendEvent(status: "SUCCESS_GET_COUNTER", data: params)
  }
}
