/*
 * Copyright 2019 Green Valley Belgium NV
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY GREEN VALLEY BELGIUM NV IN ACCORDANCE WITH THE APACHE LICENSE VERSION 2.0
 * Copyright 2018 GIG Technology NV
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @@license_version:1.6@@
 */

#import "MCTComponentFramework.h"
#import "MCTCordovaScreenBrandingVC.h"
#import "MCTMessageHelper.h"
#import "MCTRogerthatCordovaPlugin.h"
#import "MCTSystemPlugin.h"
#import "MCTUIUtils.h"

#import <SafariServices/SafariServices.h>

#pragma mark - CDVInvokedUrlCommand+Additions

@interface CDVInvokedUrlCommand (MCTInvokedUrlCommandAdditions)

+ (instancetype)commandWithCallbackId:(NSString *)callbackId;
- (NSDictionary *)params;

@end


@implementation CDVInvokedUrlCommand (MCTInvokedUrlCommandAdditions)

+ (instancetype)commandWithCallbackId:(NSString *)callbackId
{
    return [[CDVInvokedUrlCommand alloc] initWithArguments:nil
                                                callbackId:callbackId
                                                 className:nil
                                                methodName:nil];
}

- (NSDictionary *)params
{
    return self.arguments.count ? self.arguments[0] : @{};
}

@end


#pragma mark - MCTRogerthatCordovaPlugin

@interface MCTRogerthatCordovaPlugin ()

@property (nonatomic, strong) NSMutableArray<NSString *> *callbackIds;
@property (nonatomic, strong) MCTScreenBrandingHelper *helper;
@property (nonatomic) CGFloat originalBrightness;
@end


@implementation MCTRogerthatCordovaPlugin

- (void)pluginInitialize
{
    [super pluginInitialize];

    // [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onPause) name:UIApplicationDidEnterBackgroundNotification object:nil];
    // [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onResume) name:UIApplicationWillEnterForegroundNotification object:nil];

    // Added in 2.5.0
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pageDidLoad:) name:CDVPageDidLoadNotification object:self.webView];

    //Added in 4.3.0
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(viewWillAppear:) name:CDVViewWillAppearNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(viewDidAppear:) name:CDVViewDidAppearNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(viewWillDisappear:) name:CDVViewWillDisappearNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(viewDidDisappear:) name:CDVViewDidDisappearNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(viewWillLayoutSubviews:) name:CDVViewWillLayoutSubviewsNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(viewDidLayoutSubviews:) name:CDVViewDidLayoutSubviewsNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(viewWillTransitionToSize:) name:CDVViewWillTransitionToSizeNotification object:nil];
    
    self.callbackIds = [NSMutableArray array];
    self.helper = [MCTScreenBrandingHelper helperWithViewController:self.vc
                                                            service:self.vc.service
                                                               item:self.vc.item
                                                           delegate:self];
    self.originalBrightness = -1.0;
}


#pragma mark - CDV Notifications

- (void)pageDidLoad:(id)sender { HERE(); }
- (void)viewWillAppear:(id)sender { HERE(); }
- (void)viewDidAppear:(id)sender { HERE(); }
- (void)viewWillDisappear:(id)sender { HERE(); }
- (void)viewWillLayoutSubviews:(id)sender { HERE(); }
- (void)viewDidLayoutSubviews:(id)sender { HERE(); }
- (void)viewWillTransitionToSize:(id)sender { HERE(); }

- (void)viewDidDisappear:(id)sender
{
    HERE();
    if (![self.viewController isInNavigationController]) {
        [self.helper stop];
        if (self.originalBrightness >= 0) {
            [[UIScreen mainScreen] setBrightness:self.originalBrightness];
            self.originalBrightness = -1.0;
        }
    }
}

- (NSDictionary *)getRequestParams:(CDVInvokedUrlCommand *)command
{
    NSMutableDictionary *d = [[NSMutableDictionary alloc] initWithDictionary:command.params];
    [d setObject:command.callbackId forKey:@"id"];
    return d;
}


#pragma mark - RogerthatPlugin interface

- (void)start:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.callbackIds addObject:command.callbackId];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
    pluginResult.keepCallback = @(YES);
    [self.commandDelegate sendPluginResult:pluginResult
                                callbackId:command.callbackId];

    [self.helper start];
}

- (void)log:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper log:[self getRequestParams:command]];
    [self commandProcessed:command];
}

- (void)api_call:(CDVInvokedUrlCommand *)command
{
    HERE();
    BOOL synchronous = [self.helper sendApiCall:[self getRequestParams:command] resultHandler:[self resultHandlerWithCommand:command]];
    if (!synchronous) {
        [self commandProcessed:command];
    }
}

- (void)api_resultHandlerConfigured:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper configureApiResultHandler];
    [self commandProcessed:command];
}

- (void)app_exit:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.vc exitApp];
    [self commandProcessed:command];
}

- (void)badges_list:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper listbadges:[self resultArrayHandlerWithCommand:command]];
}

- (void)camera_startScanningQrCode:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper startScanningQrCodeWithResultHandler:[self resultHandlerWithCommand:command]
                                               params:[self getRequestParams:command]];
}

- (void)camera_stopScanningQrCode:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper stopScanningQrCodeWithResultHandler:[self resultHandlerWithCommand:command]
                                              params:[self getRequestParams:command]];
}

- (void)context:(CDVInvokedUrlCommand *)command
{
    HERE();
    NSDictionary *contextDict = [self.vc.context MCT_JSONValue];
    [self commandProcessed:command withResult:@{@"context":OR(contextDict, @{})}];
}

- (void)message_open:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper openMessageWithResultHandler:[self resultHandlerWithCommand:command]
                                       params:[self getRequestParams:command]];
}

- (void)news_getNewsGroup:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper getNewsGroupWithResultHandler:[self resultHandlerWithCommand:command]
                                        params:[self getRequestParams:command]];
}

- (void)news_getNewsGroups:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper getNewsGroupsWithResultHandler:[self resultHandlerWithCommand:command]
                                         params:[self getRequestParams:command]];
}

- (void)news_getNewsStreamItems:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper getNewsStreamItemsWithResultHandler:[self resultHandlerWithCommand:command]
                                              params:[self getRequestParams:command]];
}

- (void)system_brightness_get:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self commandProcessed:command
                withResult:@{@"brightness":[NSDecimalNumber numberWithFloat:[[UIScreen mainScreen] brightness]]}];
}

- (void)system_brightness_set:(CDVInvokedUrlCommand *)command
{
    HERE();
    if (self.originalBrightness < 0) {
        self.originalBrightness = [[UIScreen mainScreen] brightness];
    }
    NSDictionary *params = [self getRequestParams:command];
    [[UIScreen mainScreen] setBrightness:[params floatForKey:@"brightness"]];
    [self commandProcessed:command
                withResult:@{}];
}

- (void)system_brightness_reset:(CDVInvokedUrlCommand *)command
{
    HERE();
    if (self.originalBrightness >= 0) {
        [[UIScreen mainScreen] setBrightness:self.originalBrightness];
        self.originalBrightness = -1.0;
    }
    [self commandProcessed:command
                withResult:@{}];
}

- (void)ui_hideKeyboard:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self commandProcessed:command]; // Empty stub
}

- (void)user_put:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper putUserData:[self getRequestParams:command]];
}

- (void)user_getProfile:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper getUserProfileWithResultHandler:[self resultDictHandlerWithCommand:command]
                                          params:[self getRequestParams:command]];
}

- (void)user_getUserInformation:(CDVInvokedUrlCommand *)command
{
    HERE();
    if (![self.helper isEmbeddedApp]) {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                                 messageAsString:@"getUserInformation can only be called from embedded apps"]
                                    callbackId:command.callbackId];
        return;
    }
    [self.helper getUserInformationWithResultHandler:[self getUserInformationResultHandlerWithCommand:command]
                                              params:[self getRequestParams:command]];
}

- (void)user_isLoggedIn:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper getUserIsLoggedInWithResultHandler:[self resultDictHandlerWithCommand:command]
                                             params:[self getRequestParams:command]];
}

- (void)util_isConnectedToInternet:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper isConnectedToInternetWithResultHandler:[self resultHandlerWithCommand:command]];
}

- (void)util_open:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper openNavigationItemWithResultHandler:[self resultHandlerWithCommand:command]
                                              params:[self getRequestParams:command]];
}

- (void)util_playAudio:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper playAudioWithResultHandler:[self resultHandlerWithCommand:command]
                                     params:[self getRequestParams:command]];
}

- (void)homescreen_getHomeScreenContent:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper getHomescreenWithResultHandler:[self resultDictErrorStringHandlerWithCommand:command]
                                         params:[self getRequestParams:command]];
}


#pragma mark - RogerthatPlugin helper methods

- (MCTCordovaScreenBrandingVC *)vc
{
    return ((MCTCordovaScreenBrandingVC *)self.viewController);
}

- (MCTScreenBrandingResultHandler)resultHandlerWithCommand:(CDVInvokedUrlCommand *)command
{
    __weak __typeof__(self) weakSelf = self;
    return ^(NSDictionary *result, NSDictionary *error) {
        [weakSelf commandProcessed:command withResult:result withError:error];
    };
}

- (MCTScreenBrandingResultArrayHandler)resultArrayHandlerWithCommand:(CDVInvokedUrlCommand *)command
{
    __weak __typeof__(self) weakSelf = self;
    return ^(NSArray *result) {
        [weakSelf sendArrayCallback:command.callbackId withData:result];
    };
}

- (MCTScreenBrandingResultDictErrorStringHandler)resultDictErrorStringHandlerWithCommand:(CDVInvokedUrlCommand *)command
{
    __weak __typeof__(self) weakSelf = self;
    return ^(NSDictionary *result, NSString *error) {
        [weakSelf sendDictionaryCallback:command.callbackId withResult:result withError:error];
    };
}

- (MCTScreenBrandingResultDictHandler)resultDictHandlerWithCommand:(CDVInvokedUrlCommand *)command
{
    __weak __typeof__(self) weakSelf = self;
    return ^(NSDictionary *result) {
        [weakSelf sendDictionaryCallback:command.callbackId withResult:result withError:nil];
    };
}

- (MCTScreenBrandingResultDictErrorStringHandler)getUserInformationResultHandlerWithCommand:(CDVInvokedUrlCommand *)command
{
    __weak __typeof__(self) weakSelf = self;
    return ^(NSDictionary *result, NSString *error) {
        if (error) {
            [weakSelf.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                                         messageAsString:error]
                                            callbackId:command.callbackId];
        } else {
            [weakSelf sendDictionaryCallback:command.callbackId withResult:result withError:nil];
        }
    };
}

- (void)commandProcessed:(CDVInvokedUrlCommand *)command
{
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK]
                                callbackId:command.callbackId];
}

- (void)commandProcessed:(CDVInvokedUrlCommand *)command
              withResult:(NSDictionary *)result
{
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                         messageAsDictionary:result]
                                callbackId:command.callbackId];
}

- (void)commandProcessed:(CDVInvokedUrlCommand *)command
              withError:(NSDictionary *)error
{
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                         messageAsDictionary:error]
                                callbackId:command.callbackId];
}

- (void)commandProcessed:(CDVInvokedUrlCommand *)command
              withResult:(NSDictionary *)result
               withError:(NSDictionary *)error
{
    if (error) {
        [self commandProcessed:command withError:error];
    } else {
        [self commandProcessed:command withResult:result];
    }
}

- (void)sendCallback:(NSString *)callback withArguments:(id)args
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                  messageAsDictionary:@{@"callback": callback,
                                                                        @"args": args}];
    pluginResult.keepCallback = @(YES);
    for (NSString *callbackId in self.callbackIds) {
        [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
    }
}

- (void)sendArrayCallback:(NSString *)callbackId withData:(NSArray *)data
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                       messageAsArray:data];
    pluginResult.keepCallback = @(YES);
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)sendDictionaryCallback:(NSString *)callbackId 
                    withResult:(NSDictionary *)result
                     withError:(NSString *)error
{
    CDVPluginResult *pluginResult;
    if (error) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsString:error];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                     messageAsDictionary:result];
    }
    pluginResult.keepCallback = @(YES);
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

#pragma mark - MCTScreenBrandingDelegate

- (void)setInfo:(NSDictionary *)info
{
    T_UI();
    [self sendCallback:@"setInfo" withArguments:info];
}

- (void)apiResultReceived:(MCTServiceApiCallbackResult *)r
{
    T_UI();
    [self sendCallback:@"apiResult" withArguments:@{@"method": OR(r.method, MCTNull),
                                                    @"result": OR(r.result, MCTNull),
                                                    @"error": OR(r.error, MCTNull),
                                                    @"tag": OR(r.tag, MCTNull)}];
}

- (void)userDataUpdated:(NSDictionary *)userData
{
    T_UI();
    [self sendCallback:@"userDataUpdated" withArguments:userData];
}

- (void)serviceDataUpdated:(NSDictionary *)serviceData
{
    T_UI();
    [self sendCallback:@"serviceDataUpdated" withArguments:serviceData];
}

- (void)qrCodeScanned:(NSDictionary *)result
{
    T_UI();
    [self sendCallback:@"qrCodeScanned" withArguments:result];
}

- (BOOL)canStartScanning
{
    T_UI();
    return YES;
}

- (void)onJSResultWithRequestId:(NSString *)requestId result:(NSDictionary *)result error:(NSDictionary *)error
{
    [self commandProcessed:[CDVInvokedUrlCommand commandWithCallbackId:requestId]
                withResult:result
                 withError:error];
}

- (void)badgeUpdated:(NSDictionary *)params
{
    [self sendCallback:@"badgeUpdated" withArguments:params];
}

- (void)urlOpened:(NSDictionary *)info
{
    [self sendCallback:@"urlOpened" withArguments:info];
}

- (BOOL)shouldOverrideLoadWithRequest:(NSURLRequest*)request navigationType:(int)navigationType
{
    if ([request.URL.scheme isEqualToString:@"poke"]) {
        LOG(@"Received %@", request.URL.absoluteString);
        [self.helper pokeWithTag:[request.URL.absoluteString substringFromIndex:[@"poke://" length]]];
        return NO;
    }
    if (navigationType == WKNavigationTypeLinkActivated || navigationType == WKNavigationTypeOther) {
        if ([request.URL.scheme hasPrefix:@"http"]) {
            LOG(@"Received %@", request.URL.absoluteString);
            UIViewController *vc = [[SFSafariViewController alloc] initWithURL:request.URL];
            [self.vc presentViewController:vc animated:YES completion:nil];
            return NO;
        }
    }

    return YES;
}

@end
