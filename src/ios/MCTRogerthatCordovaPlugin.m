//
//  MCTRogerthatCordovaPlugin.m
//  rogerthat
//
//  Created by Bart Pede on 03/05/2017.
//
//

#import "MCTBeaconProximity.h"
#import "MCTComponentFramework.h"
#import "MCTCordovaScreenBrandingVC.h"
#import "MCTMessageHelper.h"
#import "MCTRogerthatCordovaPlugin.h"
#import "MCTSystemPlugin.h"
#import "MCTUIUtils.h"


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
    return self.arguments[0];
}

@end


#pragma mark - MCTRogerthatCordovaPlugin

@interface MCTRogerthatCordovaPlugin ()

@property (nonatomic, copy) NSString *callbackId;
@property (nonatomic, strong) MCTScreenBrandingHelper *helper;
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

    self.helper = [MCTScreenBrandingHelper helperWithViewController:self.vc
                                                            service:self.vc.service
                                                               item:self.vc.item
                                                           delegate:self];
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
    }
}


#pragma mark - RogerthatPlugin interface

- (void)start:(CDVInvokedUrlCommand *)command
{
    HERE();
    if (self.callbackId) {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                                 messageAsString:@"RogerthatPlugin already running."]
                                    callbackId:command.callbackId];
        return;
    }

    self.callbackId = command.callbackId;

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
    pluginResult.keepCallback = @(YES);
    [self.commandDelegate sendPluginResult:pluginResult
                                callbackId:command.callbackId];

    [self.helper start];
}

- (void)log:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper log:command.params];
    [self commandProcessed:command];
}

- (void)api_call:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper sendApiCall:command.params];
    [self commandProcessed:command];
}

- (void)api_resultHandlerConfigured:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper configureApiResultHandler];
    [self commandProcessed:command];
}

- (void)camera_startScanningQrCode:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper startScanningQrCodeWithResultHandler:[self defaultResultHandlerWithCommand:command]
                                               params:command.params];
}

- (void)camera_stopScanningQrCode:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper stopScanningQrCodeWithResultHandler:[self defaultResultHandlerWithCommand:command]
                                              params:command.params];
}

- (void)message_open:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper openMessageWithResultHandler:[self defaultResultHandlerWithCommand:command]
                                       params:command.params];
}

- (void)security_sign:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper signWithResultHandler:[self defaultResultHandlerWithCommand:command]
                                params:command.params];
}

- (void)security_verify:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper verifyWithResultHandler:[self defaultResultHandlerWithCommand:command]
                                  params:command.params];

}

- (void)service_getBeaconsInReach:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper beaconsInReachWithResultHandler:[self defaultResultHandlerWithCommand:command]];
}

- (void)system_onBackendConnectivityChanged:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper registerBackendConnectivityChangesWithResultHandler:[self defaultResultHandlerWithCommand:command]];
}

- (void)ui_hideKeyboard:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self commandProcessed:command]; // Empty stub
}

- (void)user_put:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper putUserData:command.params];
}

- (void)util_isConnectedToInternet:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper isConnectedToInternetWithResultHandler:[self defaultResultHandlerWithCommand:command]];
}

- (void)util_open:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper openNavigationItemWithResultHandler:[self defaultResultHandlerWithCommand:command]
                                              params:command.params];
}

- (void)util_playAudio:(CDVInvokedUrlCommand *)command
{
    HERE();
    [self.helper playAudioWithResultHandler:[self defaultResultHandlerWithCommand:command]
                                              params:command.params];
}


#pragma mark - RogerthatPlugin helper methods

- (MCTCordovaScreenBrandingVC *)vc
{
    return ((MCTCordovaScreenBrandingVC *)self.viewController);
}

- (MCTScreenBrandingResultHandler)defaultResultHandlerWithCommand:(CDVInvokedUrlCommand *)command
{
    __weak __typeof__(self) weakSelf = self;
    return ^(NSDictionary *result, NSDictionary *error) {
        [weakSelf commandProcessed:command withResult:result withError:error];
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
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
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

- (void)beaconInReach:(NSDictionary *)beacon
{
    T_UI();
    [self sendCallback:@"onBeaconInReach" withArguments:beacon];
}

- (void)beaconOutOfReach:(NSDictionary *)beacon
{
    T_UI();
    [self sendCallback:@"onBeaconOutOfReach" withArguments:beacon];
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

- (void)backendConnectivityChanged:(BOOL)connected
{
    T_UI();
    [self sendCallback:@"onBackendConnectivityChanged" withArguments:@(connected)];
}

- (void)signedWithRequestId:(NSString *)requestId result:(NSDictionary *)result error:(NSDictionary *)error
{
    [self commandProcessed:[CDVInvokedUrlCommand commandWithCallbackId:requestId]
                withResult:result
                 withError:error];
}

- (BOOL)shouldOverrideLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    if ([request.URL.scheme isEqualToString:@"poke"]) {
        LOG(@"Received %@", request.URL.absoluteString);
        [self.helper pokeWithTag:[request.URL.absoluteString substringFromIndex:[@"poke://" length]]];
        return NO;
    }

    return YES;
}

@end
