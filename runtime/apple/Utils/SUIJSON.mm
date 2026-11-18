//
//  SUIJSON.mm
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#import "SUIJSON.h"

NSString *_Nullable SUIJSONStringFromPayload(NSDictionary<NSString *, id> *payload)
{
  if (![NSJSONSerialization isValidJSONObject:payload]) {
    return nil;
  }
  NSData *data = [NSJSONSerialization dataWithJSONObject:payload options:0 error:nil];
  return data != nil ? [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding] : nil;
}
