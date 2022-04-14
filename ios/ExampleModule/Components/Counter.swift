//
//  Counter.swift
//  BridgeExample
//
//  Created by Nicolas on 14/04/2022.
//

import Foundation

// need to inherit from NSObject to have @objc functions
class Counter: NSObject {
  
  public var _counter: Array<Int> = Array<Int>([0])
  
  override init() {

  }
  
  /**
    * Increase method takes the counterToIncrease as arguments goes from 0 to size of _counter
    * will increase the counter by 1
   */
  
  // need to have a _ before adding arguments
  @objc func increase(_ indexToIncrease: Int) -> Array<Int>? {
    if (indexToIncrease < 0 || indexToIncrease > _counter.count) {
      return nil;
    }
    _counter[indexToIncrease] += 1;
    return _counter;
  }
  
  /**
    * Decrease method takes the counterToIncrease as arguments goes from 0 to size of _counter
    * will decrease the counter by 1
   */
  
  // need to have a _ before adding arguments
  @objc func decrease(_ indexToIncrease: Int) -> Array<Int>? {
    if (indexToIncrease < 0 || indexToIncrease > _counter.count) {
      return nil;
    }
    _counter[indexToIncrease] -= 1;
    return _counter;
  }

  // a simple getter for _counter
  @objc func getCounter() -> Array<Int> {
    return _counter;
  }
}
