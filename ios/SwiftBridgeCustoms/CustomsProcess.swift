//
//  BridgeProcessor.swift
//  monbuilding
//
//  Created by Nicolas on 21/01/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//
import Foundation

class CustomsProcess: NSObject {
  var eventQueue = Queue<NSMutableDictionary>();
  var callbackQueue = Queue<NSMutableDictionary>();
  var _eventName: String;
  var _continueAskCode: String;

  init(eventName: String, continueAskCode: String) {
    _eventName = eventName;
    _continueAskCode = continueAskCode;
  }

  /**
   * Events from user input
   */

  func processEvent(eventId: String, params: NSMutableDictionary) {
    let data: NSMutableDictionary = [:]
    data["code"] = eventId;
    data["data"] = params;
    storeEvent(params: data);
  }

  func processEvent(eventId: String) {
    let data: NSMutableDictionary = [:]
    data["code"] = eventId;
    storeEvent(params: data);
  }

  func storeEvent(params: NSMutableDictionary) {
    if (params == nil) {
      return;
    }
    eventQueue.append(params);

    if (!eventQueue.isBeingPeeked) {
      sendEvent();
    }
  }

  func sendEvent() {
    let data: NSMutableDictionary? = eventQueue.peek();
    ReactNativeEventEmitter.shared?.emitEvent(withName: _eventName, body: data)
  }


  /**
   * Events from sdk callback
   */
  func processCallback(eventId: String, params: NSMutableDictionary) {
    let data: NSMutableDictionary = [:]
    data["code"] = eventId;
    data["data"] = params;
    storeCallback(params: data);
  }

  func processCallback(eventId: String) {
    let data: NSMutableDictionary = [:]
    data["code"] = eventId;
    storeCallback(params: data);
  }

  func storeCallback(params: NSMutableDictionary) {
    if (params == nil) {
      return;
    }
    callbackQueue.append(params);

    if (!callbackQueue.isBeingPeeked) {
      sendCallback();
    }
  }

  func sendCallback() {
    let data: NSMutableDictionary? = callbackQueue.peek();
    ReactNativeEventEmitter.shared?.emitEvent(withName: _eventName, body: data)
  }

  @objc func checkQueue(lastActionAsked: String) {

    if (!eventQueue.isEmpty) {
      let eventSent: NSMutableDictionary? = eventQueue.peek();
      if (eventSent != nil && eventSent?.value(forKey: "code") as! String == lastActionAsked) {
        eventQueue.remove();
        if (!eventQueue.isEmpty) {
          sendEvent();
          return;
        }
      }
    }
    if (!callbackQueue.isEmpty) {
      let callbackSent: NSMutableDictionary? = callbackQueue.peek();
      if (callbackSent != nil && callbackSent?.value(forKey: "code") as! String == lastActionAsked) {
        callbackQueue.remove();
        if (!callbackQueue.isEmpty) {
          sendCallback();
          return;
        }
      }
    }
    let data: NSMutableDictionary = [:]
    data["code"] = _continueAskCode; // replace status by generique int
    ReactNativeEventEmitter.shared?.emitEvent(withName: _eventName, body: data)
  }

}
