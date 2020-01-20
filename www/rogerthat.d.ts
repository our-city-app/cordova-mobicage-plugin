/**
 * See http://www.rogerthat.net/developers/javascript-api for more info
 */
import { RogerthatError } from './rogerthat-errors';
import { PaymentRequestData, PayWidgetContextData, RogerthatPayments } from './rogerthat-payment';
import {
  GetNewsGroupRequestTO,
  GetNewsGroupResponseTO,
  GetNewsGroupServicesRequestTO,
  GetNewsGroupServicesResponseTO,
  GetNewsGroupsRequestTO,
  GetNewsGroupsResponseTO,
  GetNewsStreamItemsRequestTO,
  GetNewsStreamItemsResponseTO,
  MessageEmbeddedApp,
  NewsSenderTO,
} from './types';

export * from './rogerthat-errors';
export * from './rogerthat-payment';
export * from './types';


export interface SignatureData {
  data: string;
  transaction: string;
  transactionHash: string;
}

export interface RogerthatUserInfo {
  account: string;
  avatarUrl: string;
  data: { [ key: string ]: any };
  language: string;
  name: string;
  firstName: string;
  lastName: string;
  put: (data: any) => Promise<void>;
}

export interface RogerthatSystem {
  os: 'ios' | 'android';
  version: string; // '10.1' (iOS) | '25' => android api 25 (Nougat)
  appVersion: string; // '2.0.2000.I'
  appName: string; // 'Rogerthat'
  appId: string; // 'rogerthat'
  colors: {
    accent: string;
    primary: string;
    primaryDark: string;
    text: string;
    textInverse: string;
  };
  debug: boolean;
  baseUrl: string;
  mainService: string;
}

export interface RogerthatMessage {
  // Returned error may be of type RogerthatMessageOpenError
  open: (messageKey: string) => Promise<void>;
}

export const enum NewsItemType {
  /**
   * application/service to person
   */
  NORMAL = 1,
  QR_CODE = 2
}

export interface NewsActionButton {
  action: string;
  caption: string;
  flow_params: string;
  id: string;
}

export interface NewsItem {
  buttons: NewsActionButton[];
  sender: NewsSenderTO;
  broadcast_type: string;
  flags: number;
  id: number;
  image_url: string;
  message: string;
  qr_code_caption: string;
  qr_code_content: string;
  reach: number;
  sort_priority: number;
  sort_timestamp: number;
  timestamp: number;
  title: string;
  type: NewsItemType;
  users_that_rogered: string[];
  version: number;
  read: boolean;
  pinned: boolean;
  rogered: boolean;
  disabled: boolean;
  isPartial: boolean;
  sortKey: number;
}

export interface CountNewsItemsResult {
  count: number;
}

export interface ListNewsItemsParams {
  cursor?: string;
  /**
   * Amount of news items that will be returned
   */
  limit?: number;
}

export interface ListNewsItemsResult {
  items: NewsItem[];
  cursor: string;
}

export type CameraType = 'front' | 'back';

export interface RogerthatCamera {
  // Returned error may be of type StartScanningQrCodeError
  startScanningQrCode: (cameraType: CameraType) => Promise<void>;
  // Returned error may be of type StopScanningQrCodeError
  stopScanningQrCode: (cameraType: CameraType) => Promise<void>;
}

export interface PublicKey {
  algorithm: string;
  name: string;
  index: string;
  public_key: string;
}

export interface CreateKeyPairResult {
  public_key: string;
  seed: string;
}

export interface HasKeyPairResult {
  exists: boolean;
}

export interface ListAddressesResult {
  index: number;
  address: string;
}

export interface CryptoSeed {
  seed: string;
}

export interface CryptoAddress {
  address: string;
}

export interface CryptoSignature {
  /**
   * Base64 payload
   */
  payload: string;
  /**
   * Base64 signature
   */
  payload_signature: string;
}

export interface CryptoTransactionInput {
  parent_id: string;
  timelock: number;
}

export interface CryptoTransactionOutput {
  value: string;
  unlockhash: string;
}

export interface CryptoTransactionData {
  input: CryptoTransactionInput;
  outputs: CryptoTransactionOutput[];
  algorithm: SupportedAlgorithms;
  public_key: string;
  public_key_index: number;
  /**
   * base64
   */
  signature_hash: string;
  /**
   * base64 signature, this should be set by using rogerthat.security.sign by the client
   */
  signature: string;
  timelock: number;
}

export interface CryptoTransaction {
  data: CryptoTransactionData[];
  from_address: string;
  minerfees: string;
  to_address: string;
}

export interface VerifyResult {
  valid: boolean;
}

export type SupportedAlgorithms = 'ed25519';

export interface KeyPair {
  algorithm: SupportedAlgorithms;
  name: string;
  arbitrary_data: string | null;
}

export interface KeyPairList {
  keyPairs: KeyPair[];
}

export interface RogerthatSecurity {
  createKeyPair: (successCallback: (result: CreateKeyPairResult) => void,
                  errorCallback: (error: RogerthatError) => void,
                  algorithm: SupportedAlgorithms,
                  keyName: string,
                  message: string | null,
                  force: boolean,
                  seed: string | null,
                  arbitraryData: string | null) => void;
  getAddress: (successCallback: (result: CryptoAddress) => void,
               errorCallback: (error: RogerthatError) => void,
               algorithm: SupportedAlgorithms,
               keyName: string,
               index: number,
               message: string | null) => void;
  getPublicKey: (successCallback: (result: PublicKey) => void,
                 errorCallback: (error: RogerthatError) => void,
                 algorithm: SupportedAlgorithms,
                 keyName: string) => void;
  getSeed: (successCallback: (result: CryptoSeed) => void,
            errorCallback: (error: RogerthatError) => void,
            algorithm: SupportedAlgorithms,
            keyName: string,
            message: string) => void;
  hasKeyPair: (successCallback: (result: HasKeyPairResult) => void,
               errorCallback: (error: RogerthatError) => void,
               algorithm: SupportedAlgorithms,
               keyName: string,
               index: number) => void;
  listAddresses: (successCallback: (result: ListAddressesResult[]) => void,
                  errorCallback: (error: RogerthatError) => void,
                  algorithm: SupportedAlgorithms,
                  keyName: string,
                  index: number) => void;
  sign: (successCallback: (result: CryptoSignature) => void,
         errorCallback: (error: RogerthatError) => void,
         algorithm: SupportedAlgorithms,
         keyName: string,
         index: number,
         message: string,
         payload: string,
         forcePin: boolean,
         hashPayload: boolean) => void;
  verify: (successCallback: (result: VerifyResult) => void,
           errorCallback: (error: RogerthatError) => void,
           algorithm: SupportedAlgorithms,
           keyName: string,
           index: number,
           payload: string,
           payload_signature: string) => void;
  listKeyPairs: (successCallback: (result: KeyPairList) => void,
                 errorCallback: (error: RogerthatError) => void) => void;

}

export const enum FeatureSupported {
  CHECKING = 0,
  SUPPORTED = 1,
  NON_SUPPORTED = 2,
}

export interface RogerthatFeatures {
  base64URI: FeatureSupported;
  backgroundSize: FeatureSupported;
  callback: (feature: 'base64URI' | 'backgroundSize') => void;
}

export interface RogerthatUI {
  hideKeyboard: () => Promise<void>; // Android only
}

export interface InternetConnectionStatus {
  connected: boolean;
  connectedToWifi?: boolean;
}

interface Translations {
  /**
   * Example: { 'name': {'nl': 'Naam', 'en': 'Name'} }
   */
  [ key: string ]: { [ key: string ]: string };
}

export interface OpenParams {
  action_type?: string | null;
  action: string;
  title?: string | null;
  service?: string | null;
  params?: { [ key: string ]: any };
}

export interface RogerthatUtil {
  _translateHTML: () => void;
  _translations: { defaultLanguage: string; values: Translations };
  embeddedAppTranslations: () => Promise<{ translations: any }>;
  isConnectedToInternet: () => Promise<InternetConnectionStatus>
  open: (params: OpenParams) => Promise<void>;

  /**
   * Play a sound file which is located in the branding zip
   */
  playAudio: (path: string) => Promise<void>;
  translate: (key: string, parameters: any) => string;
  /**
   * Generate a random UUID
   */
  uuid: () => string;
}

export interface UserDetails {
  app_id: string; // 'rogerthat'
  avatar_url: string;
  email: string; // 'test@example.com
  language: string; // 'en_US'
  name: string; // 'test user'
  public_key: string | null;
  public_keys: PublicKey[];
}

export interface QrCodeScannedContent {
  status: 'resolving' | 'resolved' | 'error';
  /**
   * Content of the QR code, or an error message in case status == 'error'
   */
  content: string;
  userDetails?: UserDetails;
}

export interface RogerthatCallbacks {
  badgeUpdated: (callback: (result: { key: string, count: number }) => void) => void;
  newsReceived: (callback: (result: { ids: number[] }) => void) => void;
  /**
   * The device its Internet connectivity has changed.
   */
  onBackendConnectivityChanged: (callback: (connectionStatus: InternetConnectionStatus) => void) => void;
  /**
   * A QR code has been scanned as result of rogerthat.camera.startScanningQrCode
   * This method is called twice. If the smartphone is connected to the Internet,
   * the app will request the details of the scanned QR code.
   * The 'userDetails' property will only be available in the second callback.
   */
  qrCodeScanned: (callback: (result: QrCodeScannedContent) => void) => void;
  /**
   * Rogerthat user and service data has been set
   */
  ready: (callback: () => void) => void;
  /**
   *  The app received an update and rogerthat.service.data is updated.
   */
  serviceDataUpdated: (callback: () => void) => void;
  /**
   * The app received an update and rogerthat.user.data is updated.
   */
  userDataUpdated: (callback: () => void) => void;
}

export interface RogerthatApiCallbacks {
  resultReceived: (callback: (method: string, result: any, error: string | null, tag: string) => void) => void;
}

export interface RogerthatApi {
  call: (method: string, data: string | null, tag: string) => Promise<void>;
  callbacks: RogerthatApiCallbacks;
}

export interface RogerthatMenuItem {
  label: string;
  hashedTag: string;
  action: number;
  coords: number[];
}

export interface RogerthatApp {
  exit: () => void;
  exitWithResult: (result: string) => void;
}


export const enum RogerthatContextType {
  PAY_WIDGET = 'pay',
  CREATE_PAYMENT_REQUEST = 'create-payment-request',
  PAYMENT_REQUEST = 'payment-request',
  QR_SCANNED = 'qr-scanned',
  URL = 'url',
}

export interface PayWidgetContext {
  type: RogerthatContextType.PAY_WIDGET;
  data: PayWidgetContextData;
}

export interface CreatePaymentRequestContext {
  type: RogerthatContextType.CREATE_PAYMENT_REQUEST;
  data: PaymentRequestData;
}

export interface PaymentRequestContext {
  type: RogerthatContextType.PAYMENT_REQUEST;
  data: MessageEmbeddedApp;
}

export interface QrScannedContext {
  type: RogerthatContextType.QR_SCANNED;
  data: { content: string };
}

/**
 * Embedded app opened via clicking an url in the browser (aka a deep link)
 */
export interface UrlContext {
  type: RogerthatContextType.URL;
  data: { content: string };
}

export type RogerthatContext = PayWidgetContext | CreatePaymentRequestContext | PaymentRequestContext | QrScannedContext | UrlContext;

export class Rogerthat {
  api: RogerthatApi;
  app: RogerthatApp;
  callbacks: RogerthatCallbacks;
  camera: RogerthatCamera;
  context: () => Promise<{ context: RogerthatContext | null }>;
  features: RogerthatFeatures;
  /**
   * The menu item that was pressed to open the html app.
   */
  menuItem: RogerthatMenuItem;
  message: RogerthatMessage;
  news: {
    getNewsGroup: (request: GetNewsGroupRequestTO) => Promise<GetNewsGroupResponseTO>;
    getNewsGroups: (request: GetNewsGroupsRequestTO) => Promise<GetNewsGroupsResponseTO>;
    getNewsStreamItems: (request: GetNewsStreamItemsRequestTO) => Promise<GetNewsStreamItemsResponseTO>;
    getNewsGroupServices: (request: GetNewsGroupServicesRequestTO) => Promise<GetNewsGroupServicesResponseTO>;
  };
  service: {
    name: string;
    account: string;
    data: any;
  };
  security: RogerthatSecurity;
  system: RogerthatSystem;
  ui: RogerthatUI;
  user: RogerthatUserInfo;
  util: RogerthatUtil;
  /**
   * Only available if rogerthat-payments plugin is available in the app
   */
  payments: RogerthatPayments;
}

declare global {
  const rogerthat: Rogerthat;
  /**
   * See {@link https://github.com/emn178/js-sha256/}
   */
  const sha256: any;
}
