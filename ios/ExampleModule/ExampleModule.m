#import "ExampleModule.h"

// header to retrieve @objc files from swift
#import <BridgeExample-Swift.h>

@implementation ExampleModule

// name of the swift Class
Counter* _swiftCounter;

// function to initialize swift Class (is called in AppDelegate.m)
- (BOOL) start {
  _swiftCounter = [[Counter alloc] init];
  return true;
}

// Objective C function wrapping swift methods from initialized swift class

- (void) increase:(NSInteger) indexToIncrease {
  NSLog(@"counter in increase method : %@", [_swiftCounter increase:indexToIncrease]);
}

- (void) decrease:(NSInteger) indexToIncrease {
  NSLog(@"counter in decrease method : %@", [_swiftCounter decrease:indexToIncrease]);
}

- (void) getCounter {
  NSLog(@"counter in getCounter method : %@", [_swiftCounter getCounter]);
}


@end
