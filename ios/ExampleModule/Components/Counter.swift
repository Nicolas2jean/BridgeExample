//
//  Counter.swift
//  BridgeExample
//
//  Created by Nicolas on 14/04/2022.
//

import Foundation

class Counter: NSObject {
  @objc public var _customs: CustomsProcess;
  public var _counter: Array<Int> = Array<Int>([0]);
  
  override init() {
    // initialize customs
    _customs = CustomsProcess(eventName: "ExampleEvents", continueAskCode: NativeCode.SUCCESS_CONTINUE_ASK.rawValue);
  }
  
  @objc func increase(_ indexToIncrease: Int, timeoutCounter: Int) {
    DispatchQueue.main.asyncAfter(deadline: .now() + DispatchTimeInterval.seconds(timeoutCounter)) {
      // create a NSMutableDictionary to store event variables
      let params: NSMutableDictionary = [:]

      if (indexToIncrease < 0 || indexToIncrease > self._counter.count) {
    
        // add success variables to NSMutableDictionary
        params["index"] = indexToIncrease;
        params["error"] = "index to increase doesn't exist in counter array";
        
        // send error event
        self._customs.processEvent(eventId: NativeCode.ERROR_COUNTER_INCREASE.rawValue, params: params)
        return ;
      }
    
      // increase counter
      self._counter[indexToIncrease] += 1;
      
      // add success variables to NSMutableDictionary
      params["index_counter_value"] = self._counter[indexToIncrease];
      params["index"] = indexToIncrease;
      params["error"] = false;

      // send success event
    self._customs.processEvent(eventId: NativeCode.SUCCESS_COUNTER_INCREASE.rawValue, params: params);
    };
  }
  
  @objc func decrease(_ indexToDecrease: Int) {
    // create a NSMutableDictionary to store event variables
    let params: NSMutableDictionary = [:]
  
    if (indexToDecrease < 0 || indexToDecrease > _counter.count) {
  
      // add error variables to NSMutableDictionary
      params["index"] = indexToDecrease;
      params["error"] = "index to decrease doesn't exist in counter array";
      
      // send error event
      _customs.processEvent(eventId: NativeCode.ERROR_COUNTER_DECREASE.rawValue, params: params)
      return ;
    }
  
    // decrease counter
    _counter[indexToDecrease] -= 1;
  
    // add success variables to NSMutableDictionary
    params["index_counter_value"] = _counter[indexToDecrease];
    params["index"] = indexToDecrease;
    params["error"] = false;

    // send success event
    _customs.processEvent(eventId: NativeCode.SUCCESS_COUNTER_DECREASE.rawValue, params: params)
  }

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
    _customs.processEvent(eventId: NativeCode.SUCCESS_COUNTER_GET_COUNT.rawValue, params: params)
  }
}
