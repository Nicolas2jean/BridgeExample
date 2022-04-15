#import "ExampleModule.h"

// header to retrieve @objc files from swift
#import <BridgeExample-Swift.h>

@implementation ExampleModule

// this exports Module to React native
RCT_EXPORT_MODULE(ExampleModule);

// name of the swift Class
Counter* _swiftCounter;

// function to initialize swift Class (is called in AppDelegate.m)
- (BOOL) start {
  _swiftCounter = [[Counter alloc] init];
  return true;
}

// this exports increase function to React native
RCT_EXPORT_METHOD(increase:(NSInteger) indexToIncrease) {
  [_swiftCounter increase:indexToIncrease];
}

// this exports decrease function to React native for counter one
RCT_EXPORT_METHOD(decrease:(NSInteger) indexToIncrease) {
  [_swiftCounter decrease:indexToIncrease];
}

// this exports getCounter function to React native for counter one
RCT_EXPORT_METHOD(getCounter) {
  [_swiftCounter getCounter];
}


@end
