#import <Foundation/Foundation.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <Expo/Expo.h>

// add this import to access ExampleModule
#import "ExampleModule.h"

@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate>

// add ExampleModule.m class as property here
@property (strong, nonatomic) ExampleModule *exampleModule;


@end
