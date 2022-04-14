#import <Foundation/Foundation.h>

@interface ExampleModule : NSObject

- (BOOL) start;
- (void) increase:(NSInteger) indexToIncrease;
- (void) decrease:(NSInteger) indexToIncrease;
- (void) getCounter;

@end
