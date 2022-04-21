/* eslint-disable @typescript-eslint/no-empty-interface */
export type AppSearchSuggestionTO =
  AppSearchSuggestionActionTO;

export type FormComponentTO =
  DatetimeComponentTO
  | FileComponentTO
  | LocationComponentTO
  | MultiSelectComponentTO
  | ParagraphComponentTO
  | PersonalInfoComponentTO
  | SingleSelectComponentTO
  | TextInputComponentTO;

export type FormComponentValueTO =
  DatetimeComponentValueTO
  | FileComponentValueTO
  | LocationComponentValueTO
  | MultiSelectComponentValueTO
  | PersonalInfoComponentValueTO
  | SingleSelectComponentValueTO
  | TextInputComponentValueTO;

export type FormValidatorTO =
  MaxDateValidatorTO
  | MaxLengthValidatorTO
  | MaxValidatorTO
  | MinDateValidatorTO
  | MinLengthValidatorTO
  | MinValidatorTO
  | RegexValidatorTO
  | RequiredValidatorTO;

export type JobOfferActionTO =
  JobOfferChatActionTO
  | JobOfferOpenActionTO;

export type MapActionChipTO =
  SearchSuggestionTO;

export type MapAnnouncementTO =
  TextAnnouncementTO;

export type MapGeometryTO =
  LineStringGeometryTO
  | MultiLineStringGeometryTO
  | MultiPolygonGeometryTO
  | PolygonGeometryTO;

export type MapItemLineTO =
  MapItemLineTextTO;

export type MapListSectionItemTO =
  ExpandableListSectionItemTO
  | LinkListSectionItemTO
  | OpeningHoursListSectionItemTO
  | OpeningHoursSectionItemTO
  | ToggleListSectionItemTO;

export type MapSearchSuggestionTO =
  MapSearchSuggestionItemTO
  | MapSearchSuggestionKeywordTO;

export type MapSectionTO =
  GeometrySectionTO
  | ListSectionTO
  | MediaSectionTO
  | NewsGroupSectionTO
  | NewsItemSectionTO
  | NewsSectionTO
  | TextSectionTO
  | VoteSectionTO;

export type NewFlowMessageTO =
  FormMessageTO
  | MessageTO;

export type NextActionTO =
  NextActionDefaultTO
  | NextActionSectionTO
  | NextActionSubmitTO
  | NextActionURLTO;

export type NotificationSettingsItemTO =
  NotificationSettingsButtonItemTO
  | NotificationSettingsToggleItemTO;

export type Step =
  FormFlowStepTO
  | MessageFlowStepTO;


export const enum AppSearchSuggestionType {
  ACTION = 'action',
}

export const enum FormComponentType {
  DATETIME = 'datetime',
  FILE = 'file',
  LOCATION = 'location',
  MULTI_SELECT = 'multi_select',
  PARAGRAPH = 'paragraph',
  PERSONAL_INFO = 'personal_info',
  SINGLE_SELECT = 'single_select',
  TEXT_INPUT = 'text_input',
}

export const enum FormValidatorType {
  MAX = 'max',
  MAXDATE = 'maxdate',
  MAXLENGTH = 'maxlength',
  MIN = 'min',
  MINDATE = 'mindate',
  MINLENGTH = 'minlength',
  REGEX = 'regex',
  REQUIRED = 'required',
}

export const enum JobOfferActionType {
  CHAT = 1,
  OPEN = 0,
}

export const enum MapActionChipType {
  SEARCH_SUGGESTION = 'search_suggestion',
}

export const enum MapAnnouncementType {
  TEXT = 'text',
}

export const enum MapGeometryType {
  LINE_STRING = 'LineString',
  MULTI_LINE_STRING = 'MultiLineString',
  MULTI_POLYGON = 'MultiPolygon',
  POLYGON = 'Polygon',
}

export const enum MapItemLineType {
  TEXT = 'text',
}

export const enum MapListSectionItemType {
  DYNAMIC_OPENING_HOURS = 'opening-hours',
  EXPANDABLE = 'expandable',
  LINK = 'link',
  OPENING_HOURS = 'opening_hours',
  TOGGLE = 'toggle',
}

export const enum MapSearchSuggestionType {
  ITEM = 'item',
  KEYWORD = 'keyword',
}

export const enum MapSectionType {
  GEOMETRY = 'geometry',
  LIST = 'list',
  MEDIA = 'media',
  NEWS = 'news',
  NEWS_GROUP = 'news-group',
  NEWS_ITEM = 'news-item',
  TEXT = 'text',
  VOTE = 'vote',
}

export const enum MessageType {
  FORM = 'form_step',
  MESSAGE = 'message_step',
}

export const enum NewMessageType {
  FORM_MESSAGE = 2,
  MESSAGE = 1,
}

export const enum NextActionType {
  NEXT = 'next',
  SECTION = 'section',
  SUBMIT = 'submit',
  URL = 'url',
}

export const enum NotificationSettingType {
  BUTTON = 'button',
  TOGGLE = 'toggle',
}


export interface AckInvitationByInvitationSecretRequestTO {
  invitor_code: string | null;
  secret: string | null;
}

export interface AckInvitationByInvitationSecretResponseTO {
}

export interface AckMessageRequestTO {
  button_id: string | null;
  custom_reply: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  timestamp: number;
}

export interface AckMessageResponseTO {
  result: number;
}

export interface AddProfileAddressRequestTO {
  address: BaseProfileAddressTO;
}

export interface AddProfileAddressResponseTO {
  address: ProfileAddressTO;
}

export interface AddProfileEmailRequestTO {
  email: BaseProfileEmailTO;
}

export interface AddProfileEmailResponseTO {
  email: ProfileEmailTO;
}

export interface AddProfilePhoneNumberRequestTO {
  phone_number: BaseProfilePhoneNumberTO;
}

export interface AddProfilePhoneNumberResponseTO {
  phone_number: ProfilePhoneNumberTO;
}

export interface AdvancedOrderCategory {
  id: string;
  items: AdvancedOrderItem[];
  name: string | null;
}

export interface AdvancedOrderFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: AdvancedOrderFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface AdvancedOrderFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: AdvancedOrderTO;
}

export interface AdvancedOrderItem {
  description: string | null;
  has_price: boolean;
  id: string;
  image_url: string | null;
  name: string | null;
  step: number;
  step_unit: string | null;
  step_unit_conversion: number;
  unit: string | null;
  unit_price: number;
  value: number;
}

export interface AdvancedOrderTO {
  categories: AdvancedOrderCategory[];
  currency: string | null;
  leap_time: number;
}

export interface AdvancedOrderWidgetResultTO {
  categories: AdvancedOrderCategory[];
  currency: string | null;
}

export interface AppSearchSuggestionActionTO {
  action: string;
  description: string | null;
  icon: string | null;
  title: string | null;
  readonly type: AppSearchSuggestionType.ACTION;
}

export interface AppSearchTO {
  query: string | null;
}

export interface AttachmentTO {
  content_type: string | null;
  download_url: string | null;
  name: string | null;
  size: number;
  thumbnail: Thumbnail | null;
}

export interface AutoCompleteFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: AutoCompleteFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface AutoCompleteFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: AutoCompleteTO;
}

export interface AutoCompleteTO {
  choices: string[];
  keyboard_type: string | null;
  max_chars: number;
  place_holder: string | null;
  suggestions: string[];
  value: string | null;
}

export interface BaseMediaTO {
  content: string;
  thumbnail_url: string | null;
  type: string;
}

export interface BasePaymentMethod {
  amount: number;
  currency: string | null;
  precision: number;
}

export interface BaseProfileAddressTO {
  bus_nr: string | null;
  city: string | null;
  country: string | null;
  distance: number;
  geo_location: GeoPointTO;
  house_nr: string | null;
  label: string | null;
  street_name: string | null;
  type: number;
  zip_code: string | null;
}

export interface BaseProfileEmailTO {
  email: string;
  label: string | null;
  type: number;
}

export interface BaseProfilePhoneNumberTO {
  label: string | null;
  number: string;
  type: number;
}

export interface BreakFriendshipRequestTO {
  friend: string | null;
}

export interface BreakFriendshipResponseTO {
}

export interface BulkSaveJobsRequestTO {
  ids: number[];
  status: number;
}

export interface BulkSaveJobsResponseTO {
  ids: number[];
}

export interface ButtonTO {
  action: string | null;
  caption: string | null;
  color: string | null;
  id: string | null;
  ui_flags: number;
}

export interface ChangeMembersOfConversationRequestTO {
  emails: string[];
  parent_message_key: string;
  type: string | null;
}

export interface ChangeMembersOfConversationResponseTO {
  error_string: string | null;
}

export interface ChatMemberStatisticsTO {
  count: number;
  search_enabled: boolean;
  show_members: boolean;
}

export interface ChoiceTO {
  label: string | null;
  value: string | null;
}

export interface ConsentSettingsTO {
  ask_push_notifications: boolean;
  ask_tos: boolean;
}

export interface ConversationDeletedRequestTO {
  parent_message_key: string | null;
}

export interface ConversationDeletedResponseTO {
}

export interface ConversationMemberTO {
  avatar_url: string;
  email: string;
  name: string;
  permission: string;
}

export interface CoordsListTO {
  coords: GeoPointTO[];
}

export interface CreateJobChatRequestTO {
  anonymous: boolean;
  job_id: number;
  message: string | null;
}

export interface CreateJobChatResponseTO {
  message_key: string | null;
}

export interface CreateNotificationRequestTO {
}

export interface CreateNotificationResponseTO {
}

export interface DateSelectFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: DateSelectFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface DateSelectFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: DateSelectTO;
}

export interface DateSelectTO {
  date: number;
  has_date: boolean;
  has_max_date: boolean;
  has_min_date: boolean;
  max_date: number;
  min_date: number;
  minute_interval: number;
  mode: string | null;
  unit: string | null;
}

export interface DatetimeComponentTO {
  description: string | null;
  format: string | null;
  id: string;
  sensitive: boolean;
  title: string | null;
  validators: FormValidatorTO[];
  readonly type: FormComponentType.DATETIME;
}

export interface DatetimeComponentValueTO {
  day: number;
  hour: number;
  minute: number;
  month: number;
  year: number;
  id: string;
  readonly type: FormComponentType.DATETIME;
}

export interface DeleteConversationRequestTO {
  parent_message_key: string | null;
}

export interface DeleteConversationResponseTO {
}

export interface DeleteGroupRequestTO {
  guid: string;
}

export interface DeleteGroupResponseTO {
}

export interface DeleteProfileAddressesRequestTO {
  uids: string[];
}

export interface DeleteProfileAddressesResponseTO {
  uids: string[];
}

export interface DeleteProfileEmailRequestTO {
  email: string;
}

export interface DeleteProfileEmailResponseTO {
  email: string;
}

export interface DeleteProfilePhoneNumbersRequestTO {
  uids: string[];
}

export interface DeleteProfilePhoneNumbersResponseTO {
  uids: string[];
}

export interface DisableNewsRequestTO {
  news_id: number;
}

export interface DisableNewsResponseTO {
}

export interface EditProfileRequestTO {
  access_token: string | null;
  avatar: string | null;
  birthdate: number;
  extra_fields: string | null;
  first_name: string | null;
  gender: number;
  has_birthdate: boolean;
  has_gender: boolean;
  last_name: string | null;
  name: string | null;
}

export interface EditProfileResponseTO {
}

export interface EmbeddedAppTO {
  description: string | null;
  name: string;
  serving_url: string | null;
  title: string | null;
  types: string[];
  url_regexes: string[];
  version: number;
}

export interface EndMessageFlowRequestTO {
  message_flow_run_id: string | null;
  parent_message_key: string;
  wait_for_followup: boolean;
}

export interface EndMessageFlowResponseTO {
}

export interface ErrorTO {
  action: string | null;
  caption: string | null;
  message: string | null;
  title: string | null;
}

export interface ExpandableListSectionItemTO {
  background_color: string | null;
  icon: string | null;
  icon_color: string | null;
  title: string | null;
  readonly type: MapListSectionItemType.EXPANDABLE;
}

export interface FileComponentFileTO {
  file_type: string | null;
  name: string;
  value: string;
}

export interface FileComponentTO {
  description: string | null;
  file_types: string[];
  id: string;
  sensitive: boolean;
  title: string | null;
  validators: FormValidatorTO[];
  readonly type: FormComponentType.FILE;
}

export interface FileComponentValueTO {
  files: FileComponentFileTO[];
  id: string;
  readonly type: FormComponentType.FILE;
}

export interface FindRogerthatUsersViaEmailRequestTO {
  email_addresses: string[];
}

export interface FindRogerthatUsersViaEmailResponseTO {
  matched_addresses: string[];
}

export interface FindServiceCategoryTO {
  category: string | null;
  cursor: string | null;
  items: FindServiceItemTO[];
}

export interface FindServiceItemTO {
  avatar: string | null;
  avatar_id: number;
  description: string | null;
  description_branding: string | null;
  detail_text: string | null;
  email: string;
  name: string | null;
  qualified_identifier: string | null;
}

export interface FindServiceRequestTO {
  avatar_size: number;
  cursor: string | null;
  geo_point: GeoPointWithTimestampTO | null;
  hashed_tag: string | null;
  organization_type: number;
  search_string: string | null;
}

export interface FindServiceResponseTO {
  error_string: string | null;
  matches: FindServiceCategoryTO[];
}

export interface FloatListWidgetResultTO {
  values: number[];
}

export interface FloatWidgetResultTO {
  value: number;
}

export interface FlowStartedRequestTO {
  message_flow_run_id: string | null;
  service: string | null;
  static_flow_hash: string | null;
  thread_key: string | null;
}

export interface FlowStartedResponseTO {
}

export interface FormFlowStepTO {
  acknowledged_timestamp: number;
  answer_id: string | null;
  button: string | null;
  display_value: string | null;
  form_result: FormResult | null;
  form_type: string | null;
  message: string | null;
  message_flow_id: string | null;
  received_timestamp: number;
  step_id: string | null;
  readonly step_type: MessageType.FORM;
}

export interface FormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: FormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
  readonly message_type: NewMessageType.FORM_MESSAGE;
}

export interface FormResult {
  result: WidgetResult;
  type: string | null;
}

export interface FormSectionBrandingTO {
  avatar_url: string | null;
  logo_url: string | null;
}

export interface FormSectionTO {
  branding: FormSectionBrandingTO | null;
  components: FormComponentTO[];
  description: string | null;
  id: string;
  next_action: NextActionTO | null;
  next_button_caption: string | null;
  title: string | null;
}

export interface FormSectionValueTO {
  components: FormComponentValueTO[];
  id: string;
}

export interface FormSubmissionSectionTO {
  branding: FormSectionBrandingTO | null;
  components: FormComponentTO[];
  description: string | null;
  next_button_caption: string | null;
  title: string | null;
}

export interface FormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: Widget;
}

export interface FormVersionTO {
  id: number;
  version: number;
}

export interface ForwardLogsRequestTO {
  jid: string | null;
}

export interface ForwardLogsResponseTO {
}

export interface FriendCategoryTO {
  avatar: string | null;
  guid: string | null;
  name: string | null;
}

export interface FriendSelectFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: FriendSelectFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface FriendSelectFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: FriendSelectTO;
}

export interface FriendSelectTO {
  multi_select: boolean;
  selection_required: boolean;
}

export interface FriendTO {
  actionMenu: ServiceMenuTO | null;
  appData: string | null;
  avatarHash: string | null;
  avatarId: number;
  callbacks: number;
  category_id: string | null;
  contentBrandingHash: string | null;
  description: string | null;
  descriptionBranding: string | null;
  email: string;
  existence: number;
  flags: number;
  generation: number;
  hasUserData: boolean;
  name: string | null;
  organizationType: number;
  pokeDescription: string | null;
  profileData: string | null;
  qualifiedIdentifier: string | null;
  shareLocation: boolean;
  sharesContacts: boolean;
  sharesLocation: boolean;
  type: number;
  userData: string | null;
  versions: number[];
}

export interface GPSLocationFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: GPSLocationFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface GPSLocationFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: GPSLocationTO;
}

export interface GPSLocationTO {
  gps: boolean;
}

export interface GeoPointTO {
  lat: number;
  lon: number;
}

export interface GeoPointWithTimestampTO {
  accuracy: number;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface GeometrySectionTO {
  description: string | null;
  geometry: MapGeometryTO[];
  title: string | null;
  readonly type: MapSectionType.GEOMETRY;
}

export interface GetAppAssetRequestTO {
  kind: string | null;
}

export interface GetAppAssetResponseTO {
  kind: string;
  scale_x: number;
  url: string | null;
}

export interface GetAppSearchSuggestionsRequestTO {
  search: AppSearchTO | null;
}

export interface GetAppSearchSuggestionsResponseTO {
  items: AppSearchSuggestionTO[];
}

export interface GetAvatarRequestTO {
  avatarId: number;
  size: number;
}

export interface GetAvatarResponseTO {
  avatar: string | null;
}

export interface GetCategoryRequestTO {
  category_id: string | null;
}

export interface GetCategoryResponseTO {
  category: FriendCategoryTO;
}

export interface GetConversationAvatarRequestTO {
  avatar_hash: string;
  thread_key: string;
}

export interface GetConversationAvatarResponseTO {
  avatar: string;
}

export interface GetConversationMemberMatchesRequestTO {
  parent_message_key: string;
}

export interface GetConversationMemberMatchesResponseTO {
  emails: string[];
}

export interface GetConversationMembersRequestTO {
  cursor: string | null;
  parent_message_key: string;
  search_string: string | null;
}

export interface GetConversationMembersResponseTO {
  cursor: string | null;
  items: ConversationMemberTO[];
}

export interface GetConversationRequestTO {
  offset: string | null;
  parent_message_key: string | null;
}

export interface GetConversationResponseTO {
  conversation_sent: boolean;
}

export interface GetConversationStatisticsRequestTO {
  parent_message_key: string;
}

export interface GetConversationStatisticsResponseTO {
  members: ChatMemberStatisticsTO;
  permission: string | null;
}

export interface GetEmbeddedAppRequestTO {
  name: string | null;
}

export interface GetEmbeddedAppResponseTO {
  description: string | null;
  name: string;
  serving_url: string | null;
  title: string | null;
  types: string[];
  url_regexes: string[];
  version: number;
}

export interface GetEmbeddedAppsRequestTO {
}

export interface GetEmbeddedAppsResponseTO {
  embedded_apps: EmbeddedAppTO[];
}

export interface GetFormRequestTO {
  id: number;
}

export interface GetFormResponseTO {
  id: number;
  max_submissions: number;
  sections: FormSectionTO[];
  submission_section: FormSubmissionSectionTO | null;
  title: string | null;
  version: number;
}

export interface GetFriendEmailsRequestTO {
}

export interface GetFriendEmailsResponseTO {
  emails: string[];
  friend_set_version: number;
  generation: number;
}

export interface GetFriendInvitationSecretsRequestTO {
}

export interface GetFriendInvitationSecretsResponseTO {
  secrets: string[];
}

export interface GetFriendRequestTO {
  avatar_size: number;
  email: string | null;
}

export interface GetFriendResponseTO {
  avatar: string | null;
  friend: FriendTO | null;
  generation: number;
}

export interface GetGroupAvatarRequestTO {
  avatar_hash: string;
  size: number;
}

export interface GetGroupAvatarResponseTO {
  avatar: string;
}

export interface GetGroupsRequestTO {
}

export interface GetGroupsResponseTO {
  groups: GroupTO[];
}

export interface GetHomeScreensRequestTO {
}

export interface GetHomeScreensResponseTO {
  items: HomeScreenTO[];
}

export interface GetIdentityQRCodeRequestTO {
  email: string | null;
  size: string | null;
}

export interface GetIdentityQRCodeResponseTO {
  qrcode: string | null;
  shortUrl: string | null;
}

export interface GetIdentityRequestTO {
}

export interface GetIdentityResponseTO {
  identity: IdentityTO;
  shortUrl: string | null;
}

export interface GetJSEmbeddingRequestTO {
}

export interface GetJSEmbeddingResponseTO {
  items: JSEmbeddingItemTO[];
}

export interface GetJobChatInfoRequestTO {
  job_id: number;
}

export interface GetJobChatInfoResponseTO {
  anonymous: JobChatAnonymousTO | null;
  chat_key: string | null;
  default_text: string | null;
  info_text: string | null;
  job_id: number;
}

export interface GetJobsCriteriaRequestTO {
}

export interface GetJobsCriteriaResponseTO {
  active: boolean;
  contract_types: JobKeyLabelTO[];
  job_domains: JobKeyLabelTO[];
  keywords: string[];
  location: JobCriteriaLocationTO | null;
  notifications: JobCriteriaNotificationsTO | null;
}

export interface GetJobsRequestTO {
  activity_type: string | null;
  cursor: string | null;
  ids: number[];
}

export interface GetJobsResponseTO {
  cursor: string | null;
  has_more: boolean;
  info: JobsInfoTO;
  is_profile_active: boolean;
  items: JobOfferTO[];
}

export interface GetMapItemDetailsRequestTO {
  ids: string[];
  tag: string;
}

export interface GetMapItemDetailsResponseTO {
  items: MapItemDetailsTO[];
}

export interface GetMapItemsRequestTO {
  coords: GeoPointTO;
  cursor: string | null;
  distance: number;
  filter: string | null;
  search: MapSearchTO | null;
  tag: string;
}

export interface GetMapItemsResponseTO {
  cursor: string | null;
  distance: number;
  items: MapItemTO[];
  top_sections: MapSectionTO[];
}

export interface GetMapRequestTO {
  tag: string;
}

export interface GetMapResponseTO {
  action_chips: MapActionChipTO[];
  addresses: ProfileAddressTO[];
  announcement: MapAnnouncementTO | null;
  base_urls: MapBaseUrlsTO;
  buttons: MapButtonTO[];
  defaults: MapDefaultsTO;
  empty_text: string | null;
  filters: MapFilterTO[];
  functionalities: string[];
  notifications: MapNotificationsTO | null;
  title: string | null;
}

export interface GetMapSearchSuggestionsRequestTO {
  coords: GeoPointTO;
  distance: number;
  filter: string | null;
  search: MapSearchTO | null;
  tag: string;
}

export interface GetMapSearchSuggestionsResponseTO {
  items: MapSearchSuggestionTO[];
}

export interface GetMenuIconRequestTO {
  coords: number[];
  service: string | null;
  size: number;
}

export interface GetMenuIconResponseTO {
  icon: string | null;
  iconHash: string | null;
}

export interface GetNewsGroupRequestTO {
  group_id: string | null;
}

export interface GetNewsGroupResponseTO {
  group: NewsGroupTO;
}

export interface GetNewsGroupsRequestTO {
}

export interface GetNewsGroupsResponseTO {
  has_locations: boolean;
  if_empty: IfEmtpyScreenTO | null;
  rows: NewsGroupRowTO[];
}

export interface GetNewsItemDetailsRequestTO {
  id: number;
}

export interface GetNewsItemDetailsResponseTO {
  item: NewsStreamItemTO | null;
}

export interface GetNewsStreamFilterTO {
  group_id: string | null;
  group_type: string | null;
  search_string: string | null;
  service_identity_email: string | null;
}

export interface GetNewsStreamItemsRequestTO {
  cursor: string | null;
  filter: GetNewsStreamFilterTO;
  news_ids: number[];
}

export interface GetNewsStreamItemsResponseTO {
  cursor: string | null;
  group_id: string | null;
  items: NewsStreamItemTO[];
}

export interface GetNotificationSettingsRequestTO {
}

export interface GetNotificationSettingsResponseTO {
  sections: NotificationSettingsSectionTO[];
}

export interface GetProfileAddressesRequestTO {
}

export interface GetProfileAddressesResponseTO {
  items: ProfileAddressTO[];
}

export interface GetProfileEmailsRequestTO {
}

export interface GetProfileEmailsResponseTO {
  items: ProfileEmailTO[];
}

export interface GetProfilePhoneNumbersRequestTO {
}

export interface GetProfilePhoneNumbersResponseTO {
  items: ProfilePhoneNumberTO[];
}

export interface GetSavedMapItemsRequestTO {
  cursor: string | null;
  tag: string;
}

export interface GetSavedMapItemsResponseTO {
  cursor: string | null;
  items: MapItemTO[];
}

export interface GetServiceActionInfoRequestTO {
  action: string | null;
  allow_cross_app: boolean;
  code: string | null;
}

export interface GetServiceActionInfoResponseTO {
  actionDescription: string | null;
  app_id: string | null;
  avatar: string | null;
  avatar_id: number;
  description: string | null;
  descriptionBranding: string | null;
  email: string | null;
  error: ErrorTO | null;
  name: string | null;
  profileData: string | null;
  qualifiedIdentifier: string | null;
  staticFlow: string | null;
  staticFlowBrandings: string[];
  staticFlowHash: string | null;
  type: number;
}

export interface GetSingleSignOnLinkRequestTO {
  uid: string | null;
}

export interface GetSingleSignOnLinkResponseTO {
  code: string;
  data: string | null;
}

export interface GetStaticFlowRequestTO {
  coords: number[];
  service: string | null;
  staticFlowHash: string | null;
}

export interface GetStaticFlowResponseTO {
  staticFlow: string | null;
}

export interface GetUserInfoRequestTO {
  allow_cross_app: boolean;
  code: string | null;
}

export interface GetUserInfoResponseTO {
  app_id: string | null;
  avatar: string | null;
  avatar_id: number;
  description: string | null;
  descriptionBranding: string | null;
  email: string | null;
  error: ErrorTO | null;
  name: string | null;
  profileData: string | null;
  qualifiedIdentifier: string | null;
  type: number;
}

export interface GetUserInformationRequestTO {
}

export interface GetUserInformationResponseTO {
  addresses: ProfileAddressTO[];
  emails: ProfileEmailTO[];
  phone_numbers: ProfilePhoneNumberTO[];
}

export interface GetUserLinkRequestTO {
  link: string | null;
}

export interface GetUserLinkResponseTO {
  link: string | null;
}

export interface GroupTO {
  avatar_hash: string | null;
  guid: string;
  members: string[];
  name: string;
}

export interface HeartBeatRequestTO {
  SDKVersion: string | null;
  appType: number;
  buildFingerPrint: string | null;
  deviceId: string | null;
  deviceModelName: string | null;
  flushBackLog: boolean;
  localeCountry: string | null;
  localeLanguage: string | null;
  majorVersion: number;
  minorVersion: number;
  netCarrierCode: string | null;
  netCarrierName: string | null;
  netCountry: string | null;
  netCountryCode: string | null;
  networkState: string | null;
  product: string | null;
  simCarrierCode: string | null;
  simCarrierName: string | null;
  simCountry: string | null;
  simCountryCode: string | null;
  timestamp: number;
  timezone: string | null;
  timezoneDeltaGMT: number;
}

export interface HeartBeatResponseTO {
  systemTime: number;
}

export interface HomeScreenTO {
  id: string;
  name: string;
}

export interface IdentityTO {
  avatarId: number;
  birthdate: number;
  communityId: number;
  email: string | null;
  firstName: string | null;
  gender: number;
  hasBirthdate: boolean;
  hasGender: boolean;
  homeScreenId: string | null;
  lastName: string | null;
  name: string | null;
  owncloudPassword: string | null;
  owncloudUri: string | null;
  owncloudUsername: string | null;
  profileData: string | null;
  qualifiedIdentifier: string | null;
}

export interface IdentityUpdateRequestTO {
  identity: IdentityTO;
}

export interface IdentityUpdateResponseTO {
}

export interface IfEmtpyScreenTO {
  message: string | null;
  title: string | null;
}

export interface InviteFriendRequestTO {
  allow_cross_app: boolean;
  email: string | null;
  message: string | null;
}

export interface InviteFriendResponseTO {
}

export interface JSEmbeddingItemTO {
  hash: string;
  name: string;
}

export interface JobChatAnonymousTO {
  default_value: boolean;
  enabled: boolean;
}

export interface JobCriteriaGeoLocationTO {
  latitude: number;
  longitude: number;
}

export interface JobCriteriaLocationTO {
  address: string | null;
  distance: number;
  geo: JobCriteriaGeoLocationTO | null;
}

export interface JobCriteriaNotificationsTO {
  delivery_day: string | null;
  delivery_time: number;
  how_often: string | null;
  timezone: string | null;
}

export interface JobKeyLabelTO {
  enabled: boolean;
  key: string;
  label: string;
}

export interface JobOfferChatActionTO {
  chat_key: string | null;
  icon: string | null;
  label: string | null;
  readonly type: JobOfferActionType.CHAT;
}

export interface JobOfferContractTO {
  type: string | null;
}

export interface JobOfferEmployerTO {
  name: string | null;
}

export interface JobOfferFunctionTO {
  description: string | null;
  title: string | null;
}

export interface JobOfferLocationTO {
  city: string | null;
  country_code: string | null;
  geo_location: LatLonTO | null;
  postal_code: string | null;
  street: string | null;
  street_number: string | null;
}

export interface JobOfferOpenActionTO {
  action: string;
  icon: string | null;
  label: string | null;
  readonly type: JobOfferActionType.OPEN;
}

export interface JobOfferProviderTO {
  image_url: string;
}

export interface JobOfferSourceTO {
  avatar_url: string | null;
  id: string | null;
  name: string | null;
  type: string | null;
}

export interface JobOfferTO {
  actions: JobOfferActionTO[];
  contract: JobOfferContractTO;
  details: string | null;
  employer: JobOfferEmployerTO;
  function: JobOfferFunctionTO;
  job_id: number;
  location: JobOfferLocationTO;
  source: JobOfferSourceTO;
  timestamp: number;
}

export interface JobsInfoTO {
  description: string | null;
  providers: JobOfferProviderTO[];
  title: string | null;
}

export interface JsMessageFlowMemberRunTO {
  flow_params: string | null;
  hashed_tag: string | null;
  message_flow_run_id: string | null;
  parent_message_key: string | null;
  sender: string | null;
  service_action: string | null;
  steps: Step[];
}

export interface LatLonTO {
  lat: number;
  lon: number;
}

export interface LineStringGeometryTO {
  line: CoordsListTO;
  color: string | null;
  readonly type: MapGeometryType.LINE_STRING;
}

export interface LinkListSectionItemTO {
  external: boolean;
  request_user_link: boolean;
  requires_login: boolean;
  style: number;
  url: string;
  background_color: string | null;
  icon: string | null;
  icon_color: string | null;
  title: string | null;
  readonly type: MapListSectionItemType.LINK;
}

export interface ListSectionTO {
  items: MapListSectionItemTO[];
  style: string | null;
  readonly type: MapSectionType.LIST;
}

export interface ListStreetsRequestTO {
  zip_code: string;
}

export interface ListStreetsResponseTO {
  items: string[];
}

export interface ListZipCodesRequestTO {
}

export interface ListZipCodesResponseTO {
  items: ZipCodeTO[];
}

export interface LocationComponentTO {
  description: string | null;
  id: string;
  sensitive: boolean;
  title: string | null;
  validators: FormValidatorTO[];
  readonly type: FormComponentType.LOCATION;
}

export interface LocationComponentValueTO {
  address: PostalAddressTO | null;
  latitude: number;
  longitude: number;
  id: string;
  readonly type: FormComponentType.LOCATION;
}

export interface LocationWidgetResultTO {
  altitude: number;
  horizontal_accuracy: number;
  latitude: number;
  longitude: number;
  timestamp: number;
  vertical_accuracy: number;
}

export interface LockMessageRequestTO {
  message_key: string | null;
  message_parent_key: string | null;
}

export interface LockMessageResponseTO {
  members: MemberStatusTO[];
}

export interface LogInvitationSecretSentRequestTO {
  phone_number: string | null;
  secret: string | null;
  timestamp: number;
}

export interface LogInvitationSecretSentResponseTO {
}

export interface LongWidgetResultTO {
  value: number;
}

export interface MapBaseUrlsTO {
  icon_pin: string | null;
  icon_transparent: string | null;
}

export interface MapButtonTO {
  action: string;
  color: string | null;
  icon: string | null;
  service: string | null;
  text: string | null;
}

export interface MapDefaultsTO {
  coords: GeoPointTO;
  distance: number;
  filter: string | null;
  max_distance: number;
}

export interface MapFilterTO {
  key: string | null;
  label: string | null;
}

export interface MapIconTO {
  color: string;
  id: string;
}

export interface MapItemDetailsTO {
  geometry: MapGeometryTO[];
  id: string;
  sections: MapSectionTO[];
}

export interface MapItemLineTextPartTO {
  color: string | null;
  text: string | null;
}

export interface MapItemLineTextTO {
  parts: MapItemLineTextPartTO[];
  readonly type: MapItemLineType.TEXT;
}

export interface MapItemTO {
  coords: GeoPointTO;
  description: string | null;
  icon: MapIconTO;
  id: string;
  lines: MapItemLineTO[];
  title: string;
}

export interface MapNotificationsTO {
  enabled: boolean;
}

export interface MapSearchSuggestionItemTO {
  id: string;
  text: string;
  readonly type: MapSearchSuggestionType.ITEM;
}

export interface MapSearchSuggestionKeywordTO {
  text: string;
  readonly type: MapSearchSuggestionType.KEYWORD;
}

export interface MapSearchTO {
  query: string | null;
}

export interface MapVoteOptionTO {
  color: string | null;
  count: number;
  icon: string;
  id: string;
  selected: boolean;
  title: string | null;
}

export interface MarkMessagesAsReadRequestTO {
  message_keys: string[];
  parent_message_key: string | null;
}

export interface MarkMessagesAsReadResponseTO {
}

export interface MaxDateValidatorTO {
  day: number;
  error_message: string | null;
  hour: number;
  minute: number;
  month: number;
  year: number;
  readonly type: FormValidatorType.MAXDATE;
}

export interface MaxLengthValidatorTO {
  error_message: string | null;
  value: number;
  readonly type: FormValidatorType.MAXLENGTH;
}

export interface MaxValidatorTO {
  error_message: string | null;
  value: number;
  readonly type: FormValidatorType.MAX;
}

export interface MediaSectionTO {
  items: BaseMediaTO[];
  ratio: SizeTO;
  readonly type: MapSectionType.MEDIA;
}

export interface MediaTO {
  content: string;
  height: number;
  thumbnail_url: string | null;
  type: string;
  width: number;
}

export interface MemberStatusTO {
  acked_timestamp: number;
  button_id: string | null;
  custom_reply: string | null;
  member: string;
  received_timestamp: number;
  status: number;
}

export interface MemberStatusUpdateRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  custom_reply: string | null;
  flags: number;
  member: string;
  message: string;
  parent_message: string | null;
  received_timestamp: number;
  status: number;
}

export interface MemberStatusUpdateResponseTO {
}

export interface MessageEmbeddedAppTO {
  context: string | null;
  description: string | null;
  id: string | null;
  image_url: string | null;
  result: string | null;
  title: string | null;
}

export interface MessageFlowErrorRequestTO {
  description: string | null;
  errorMessage: string | null;
  jsCommand: string | null;
  mobicageVersion: string | null;
  platform: number;
  platformVersion: string | null;
  stackTrace: string | null;
  timestamp: number;
}

export interface MessageFlowErrorResponseTO {
}

export interface MessageFlowFinishedRequestTO {
  end_id: string | null;
  message_flow_run_id: string | null;
  parent_message_key: string | null;
}

export interface MessageFlowFinishedResponseTO {
}

export interface MessageFlowMemberResultRequestTO {
  email_admins: boolean;
  emails: string[];
  end_id: string | null;
  flush_id: string | null;
  message_flow_name: string | null;
  results_email: boolean;
  run: JsMessageFlowMemberRunTO;
  timestamp: number;
}

export interface MessageFlowMemberResultResponseTO {
}

export interface MessageFlowStepTO {
  acknowledged_timestamp: number;
  answer_id: string | null;
  button: string | null;
  message: string | null;
  message_flow_id: string | null;
  received_timestamp: number;
  step_id: string | null;
  readonly step_type: MessageType.MESSAGE;
}

export interface MessageLockedRequestTO {
  dirty_behavior: number;
  members: MemberStatusTO[];
  message_key: string;
  parent_message_key: string | null;
}

export interface MessageLockedResponseTO {
}

export interface MessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  buttons: ButtonTO[];
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  dismiss_button_ui_flags: number;
  embedded_app: MessageEmbeddedAppTO | null;
  flags: number;
  key: string;
  members: MemberStatusTO[];
  message: string | null;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timeout: number;
  timestamp: number;
  readonly message_type: NewMessageType.MESSAGE;
}

export interface MinDateValidatorTO {
  day: number;
  error_message: string | null;
  hour: number;
  minute: number;
  month: number;
  year: number;
  readonly type: FormValidatorType.MINDATE;
}

export interface MinLengthValidatorTO {
  error_message: string | null;
  value: number;
  readonly type: FormValidatorType.MINLENGTH;
}

export interface MinValidatorTO {
  error_message: string | null;
  value: number;
  readonly type: FormValidatorType.MIN;
}

export interface MultiLineStringGeometryTO {
  lines: CoordsListTO[];
  color: string | null;
  readonly type: MapGeometryType.MULTI_LINE_STRING;
}

export interface MultiPolygonGeometryTO {
  polygons: PolygonTO[];
  color: string | null;
  readonly type: MapGeometryType.MULTI_POLYGON;
}

export interface MultiSelectComponentTO {
  choices: ValueTO[];
  description: string | null;
  id: string;
  sensitive: boolean;
  title: string | null;
  validators: FormValidatorTO[];
  readonly type: FormComponentType.MULTI_SELECT;
}

export interface MultiSelectComponentValueTO {
  values: string[];
  id: string;
  readonly type: FormComponentType.MULTI_SELECT;
}

export interface MultiSelectFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: MultiSelectFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface MultiSelectFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: MultiSelectTO;
}

export interface MultiSelectTO {
  choices: ChoiceTO[];
  values: string[];
}

export interface MyDigiPassAddress {
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  country: string | null;
  state: string | null;
  zip: string | null;
}

export interface MyDigiPassEidAddress {
  municipality: string | null;
  street_and_number: string | null;
  zip_code: string | null;
}

export interface MyDigiPassEidProfile {
  card_number: string | null;
  chip_number: string | null;
  created_at: string | null;
  date_of_birth: string | null;
  first_name: string | null;
  first_name_3: string | null;
  gender: string | null;
  issuing_municipality: string | null;
  last_name: string | null;
  location_of_birth: string | null;
  nationality: string | null;
  noble_condition: string | null;
  validity_begins_at: string | null;
  validity_ends_at: string | null;
}

export interface MyDigiPassFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: MyDigiPassFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface MyDigiPassFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: MyDigiPassTO;
}

export interface MyDigiPassProfile {
  born_on: string | null;
  first_name: string | null;
  last_name: string | null;
  preferred_locale: string | null;
  updated_at: string | null;
  uuid: string | null;
}

export interface MyDigiPassTO {
  scope: string | null;
}

export interface MyDigiPassWidgetResultTO {
  address: MyDigiPassAddress | null;
  eid_address: MyDigiPassEidAddress | null;
  eid_photo: string | null;
  eid_profile: MyDigiPassEidProfile | null;
  email: string | null;
  phone: string | null;
  profile: MyDigiPassProfile | null;
}

export interface NewAdvancedOrderFormRequestTO {
  form_message: AdvancedOrderFormMessageTO;
}

export interface NewAdvancedOrderFormResponseTO {
  received_timestamp: number;
}

export interface NewAutoCompleteFormRequestTO {
  form_message: AutoCompleteFormMessageTO;
}

export interface NewAutoCompleteFormResponseTO {
  received_timestamp: number;
}

export interface NewDateSelectFormRequestTO {
  form_message: DateSelectFormMessageTO;
}

export interface NewDateSelectFormResponseTO {
  received_timestamp: number;
}

export interface NewFlowMessageRequestTO {
  form_result: FormResult | null;
  message: NewFlowMessageTO;
  message_flow_run_id: string | null;
  step_id: string | null;
}

export interface NewFlowMessageResponseTO {
}

export interface NewFriendSelectFormRequestTO {
  form_message: FriendSelectFormMessageTO;
}

export interface NewFriendSelectFormResponseTO {
  received_timestamp: number;
}

export interface NewGPSLocationFormRequestTO {
  form_message: GPSLocationFormMessageTO;
}

export interface NewGPSLocationFormResponseTO {
  received_timestamp: number;
}

export interface NewJobsRequestTO {
  activity_types: string[];
  creation_time: number;
}

export interface NewJobsResponseTO {
}

export interface NewMessageRequestTO {
  message: MessageTO;
}

export interface NewMessageResponseTO {
  received_timestamp: number;
}

export interface NewMultiSelectFormRequestTO {
  form_message: MultiSelectFormMessageTO;
}

export interface NewMultiSelectFormResponseTO {
  received_timestamp: number;
}

export interface NewMyDigiPassFormRequestTO {
  form_message: MyDigiPassFormMessageTO;
}

export interface NewMyDigiPassFormResponseTO {
  received_timestamp: number;
}

export interface NewOauthFormRequestTO {
  form_message: OauthFormMessageTO;
}

export interface NewOauthFormResponseTO {
  received_timestamp: number;
}

export interface NewOpenIdFormRequestTO {
  form_message: OpenIdFormMessageTO;
}

export interface NewOpenIdFormResponseTO {
  received_timestamp: number;
}

export interface NewPayFormRequestTO {
  form_message: PayFormMessageTO;
}

export interface NewPayFormResponseTO {
  received_timestamp: number;
}

export interface NewPhotoUploadFormRequestTO {
  form_message: PhotoUploadFormMessageTO;
}

export interface NewPhotoUploadFormResponseTO {
  received_timestamp: number;
}

export interface NewRangeSliderFormRequestTO {
  form_message: RangeSliderFormMessageTO;
}

export interface NewRangeSliderFormResponseTO {
  received_timestamp: number;
}

export interface NewSignFormRequestTO {
  form_message: SignFormMessageTO;
}

export interface NewSignFormResponseTO {
  received_timestamp: number;
}

export interface NewSingleSelectFormRequestTO {
  form_message: SingleSelectFormMessageTO;
}

export interface NewSingleSelectFormResponseTO {
  received_timestamp: number;
}

export interface NewSingleSliderFormRequestTO {
  form_message: SingleSliderFormMessageTO;
}

export interface NewSingleSliderFormResponseTO {
  received_timestamp: number;
}

export interface NewTextBlockFormRequestTO {
  form_message: TextBlockFormMessageTO;
}

export interface NewTextBlockFormResponseTO {
  received_timestamp: number;
}

export interface NewTextLineFormRequestTO {
  form_message: TextLineFormMessageTO;
}

export interface NewTextLineFormResponseTO {
  received_timestamp: number;
}

export interface NewsActionButtonTO {
  action: string | null;
  caption: string | null;
  flow_params: string | null;
  id: string | null;
}

export interface NewsGroupLayoutTO {
  background_image_url: string | null;
  badge_count: number;
  promo_image_url: string | null;
  subtitle: string | null;
  title: string | null;
}

export interface NewsGroupRowTO {
  items: NewsGroupTO[];
}

export interface NewsGroupSectionTO {
  filter: GetNewsStreamFilterTO;
  group_id: string | null;
  items: NewsStreamItemTO[];
  placeholder_image: string;
  readonly type: MapSectionType.NEWS_GROUP;
}

export interface NewsGroupTO {
  if_empty: IfEmtpyScreenTO | null;
  key: string;
  layout: NewsGroupLayoutTO | null;
  name: string | null;
  services: NewsSenderTO[];
  tabs: NewsGroupTabInfoTO[];
}

export interface NewsGroupTabInfoTO {
  key: string;
  name: string | null;
}

export interface NewsItemSectionTO {
  group_id: string | null;
  item: NewsStreamItemTO;
  placeholder_image: string;
  readonly type: MapSectionType.NEWS_ITEM;
}

export interface NewsSectionTO {
  filter: GetNewsStreamFilterTO;
  limit: number;
  placeholder_image: string;
  readonly type: MapSectionType.NEWS;
}

export interface NewsSenderTO {
  avatar_id: number;
  avatar_url: string;
  email: string;
  name: string;
}

export interface NewsStreamItemTO {
  actions: number;
  buttons: NewsActionButtonTO[];
  disabled: boolean;
  flags: number;
  id: number;
  media: MediaTO | null;
  message: string | null;
  qr_code_caption: string | null;
  qr_code_content: string | null;
  sender: NewsSenderTO;
  share_url: string | null;
  timestamp: number;
  title: string | null;
  type: number;
}

export interface NextActionDefaultTO {
  readonly type: NextActionType.NEXT;
}

export interface NextActionSectionTO {
  section: string | null;
  readonly type: NextActionType.SECTION;
}

export interface NextActionSubmitTO {
  readonly type: NextActionType.SUBMIT;
}

export interface NextActionURLTO {
  url: string;
  readonly type: NextActionType.URL;
}

export interface NotificationSettingsButtonItemTO {
  action: string;
  subtitle: string | null;
  title: string;
  readonly type: NotificationSettingType.BUTTON;
}

export interface NotificationSettingsSectionTO {
  items: NotificationSettingsItemTO[];
  title: string | null;
}

export interface NotificationSettingsToggleItemTO {
  key: string;
  value: boolean;
  subtitle: string | null;
  title: string;
  readonly type: NotificationSettingType.TOGGLE;
}

export interface OauthFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: OauthFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface OauthFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: OauthTO;
}

export interface OauthTO {
  caption: string | null;
  success_message: string | null;
  url: string | null;
}

export interface OpenIdAddressTO {
  country: string | null;
  locality: string | null;
  postal_code: string | null;
  street_address: string | null;
}

export interface OpenIdFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: OpenIdFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface OpenIdFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: OpenIdTO;
}

export interface OpenIdTO {
  provider: string | null;
  scope: string | null;
}

export interface OpenIdWidgetResultTO {
  address: OpenIdAddressTO | null;
  birthdate: string | null;
  email: string | null;
  email_verified: boolean;
  family_name: string | null;
  gender: string | null;
  given_name: string | null;
  locale: string | null;
  name: string | null;
  phone_number: string | null;
  phone_number_verified: boolean;
}

export interface OpeningHourExceptionTO {
  description: string | null;
  description_color: string | null;
  end_date: string;
  periods: OpeningPeriodTO[];
  start_date: string;
}

export interface OpeningHourTO {
  day: number;
  time: string;
}

export interface OpeningHoursListSectionItemTO {
  opening_hours: OpeningInfoTO;
  background_color: string | null;
  icon: string | null;
  icon_color: string | null;
  title: string | null;
  readonly type: MapListSectionItemType.OPENING_HOURS;
}

export interface OpeningHoursSectionItemTO {
  opening_hours: OpeningHoursTO;
  timezone: string;
  background_color: string | null;
  icon: string | null;
  icon_color: string | null;
  title: string | null;
  readonly type: MapListSectionItemType.DYNAMIC_OPENING_HOURS;
}

export interface OpeningHoursTO {
  exceptional_opening_hours: OpeningHourExceptionTO[];
  id: string | null;
  periods: OpeningPeriodTO[];
  text: string | null;
  title: string | null;
  type: string | null;
}

export interface OpeningInfoTO {
  description: string | null;
  description_color: string | null;
  name: string | null;
  subtitle: string | null;
  title: string | null;
  title_color: string | null;
  weekday_text: WeekDayTextTO[];
}

export interface OpeningPeriodTO {
  close: OpeningHourTO | null;
  description: string | null;
  description_color: string | null;
  open: OpeningHourTO;
}

export interface ParagraphComponentTO {
  description: string | null;
  title: string | null;
  readonly type: FormComponentType.PARAGRAPH;
}

export interface PayFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: PayFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface PayFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: PayTO;
}

export interface PayTO {
  auto_submit: boolean;
  base_method: BasePaymentMethod | null;
  embedded_app_id: string | null;
  memo: string | null;
  methods: PaymentMethod[];
  target: string | null;
  test_mode: boolean;
}

export interface PayWidgetResultTO {
  provider_id: string | null;
  status: string | null;
  transaction_id: string | null;
}

export interface PaymentMethod {
  amount: number;
  calculate_amount: boolean;
  currency: string | null;
  precision: number;
  provider_id: string | null;
  target: string | null;
}

export interface PersonalInfoComponentTO {
  description: string | null;
  fields: PersonalInfoFieldTO[];
  id: string;
  sensitive: boolean;
  title: string | null;
  validators: FormValidatorTO[];
  readonly type: FormComponentType.PERSONAL_INFO;
}

export interface PersonalInfoComponentValueTO {
  fields: PersonalInfoFieldValueTO[];
  id: string;
  readonly type: FormComponentType.PERSONAL_INFO;
}

export interface PersonalInfoFieldTO {
  field: string;
  fields: string[];
  required: boolean;
}

export interface PersonalInfoFieldValueTO {
  field: string;
  value: string;
}

export interface PhotoUploadFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: PhotoUploadFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface PhotoUploadFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: PhotoUploadTO;
}

export interface PhotoUploadTO {
  camera: boolean;
  gallery: boolean;
  quality: string | null;
  ratio: string | null;
}

export interface PokeServiceRequestTO {
  context: string | null;
  email: string | null;
  hashed_tag: string | null;
  timestamp: number;
}

export interface PokeServiceResponseTO {
}

export interface PolygonGeometryTO {
  rings: CoordsListTO[];
  color: string | null;
  readonly type: MapGeometryType.POLYGON;
}

export interface PolygonTO {
  rings: CoordsListTO[];
}

export interface PostalAddressTO {
  address_lines: string[];
  country: string | null;
  locality: string | null;
  post_office_box_number: string | null;
  postal_code: string | null;
  region: string | null;
  street_address: string | null;
}

export interface PressMenuIconRequestTO {
  context: string | null;
  coords: number[];
  generation: number;
  hashed_tag: string | null;
  message_flow_run_id: string | null;
  service: string | null;
  static_flow_hash: string | null;
  timestamp: number;
}

export interface PressMenuIconResponseTO {
}

export interface ProfileAddressTO {
  bus_nr: string | null;
  city: string | null;
  country: string | null;
  distance: number;
  geo_location: GeoPointTO;
  house_nr: string | null;
  label: string | null;
  street_name: string | null;
  type: number;
  uid: string;
  zip_code: string | null;
}

export interface ProfileEmailTO {
  email: string;
  label: string | null;
  type: number;
  verified: boolean;
}

export interface ProfilePhoneNumberTO {
  label: string | null;
  number: string;
  type: number;
  uid: string;
}

export interface PublicKeyTO {
  algorithm: string | null;
  index: string | null;
  name: string | null;
  public_key: string | null;
}

export interface PushNotificationSettingsTO {
  enabled: boolean;
}

export interface PutGroupRequestTO {
  avatar: string | null;
  guid: string;
  members: string[];
  name: string | null;
}

export interface PutGroupResponseTO {
  avatar_hash: string | null;
}

export interface RangeSliderFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: RangeSliderFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface RangeSliderFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: RangeSliderTO;
}

export interface RangeSliderTO {
  high_value: number;
  low_value: number;
  max: number;
  min: number;
  precision: number;
  step: number;
  unit: string | null;
}

export interface ReceiveApiCallResultRequestTO {
  error: string | null;
  id: number;
  result: string | null;
}

export interface ReceiveApiCallResultResponseTO {
}

export interface RegexValidatorTO {
  error_message: string | null;
  value: string | null;
  readonly type: FormValidatorType.REGEX;
}

export interface ReportObjectionableContentRequestTO {
  object: string | null;
  reason: string | null;
  type: string | null;
}

export interface ReportObjectionableContentResponseTO {
}

export interface RequestProfileEmailVerificationRequestTO {
  email: string;
}

export interface RequestProfileEmailVerificationResponseTO {
}

export interface RequiredValidatorTO {
  error_message: string | null;
  readonly type: FormValidatorType.REQUIRED;
}

export interface SaveJobsCriteriaRequestTO {
  active: boolean;
  criteria: SaveJobsCriteriaTO | null;
}

export interface SaveJobsCriteriaResponseTO {
  active: boolean;
  new_profile: boolean;
}

export interface SaveJobsCriteriaTO {
  contract_types: string[];
  job_domains: string[];
  keywords: string[];
  location: JobCriteriaLocationTO;
  notifications: JobCriteriaNotificationsTO;
}

export interface SaveMapItemVoteRequestTO {
  item_id: string;
  option_id: string;
  tag: string;
  vote_id: string;
}

export interface SaveMapItemVoteResponseTO {
  item_id: string;
  options: MapVoteOptionTO[];
  vote_id: string;
}

export interface SaveNewsStatisticsRequestTO {
  news_ids: number[];
  type: string;
}

export interface SaveNewsStatisticsResponseTO {
}

export interface SaveNotificationSettingRequestTO {
  key: string;
  value: boolean;
}

export interface SaveNotificationSettingResponseTO {
}

export interface SaveSettingsRequest {
  callLogging: boolean;
  push_notifications: PushNotificationSettingsTO | null;
  tracking: boolean;
}

export interface SaveSettingsResponse {
  settings: SettingsTO;
}

export interface SearchSuggestionTO {
  icon: string | null;
  title: string | null;
  readonly type: MapActionChipType.SEARCH_SUGGESTION;
}

export interface SendApiCallCallbackResultTO {
  error: string | null;
  result: string | null;
}

export interface SendApiCallRequestTO {
  hashed_tag: string | null;
  id: number;
  method: string;
  params: string | null;
  service: string;
  synchronous: boolean;
}

export interface SendApiCallResponseTO {
  result: SendApiCallCallbackResultTO | null;
}

export interface SendMessageRequestTO {
  attachments: AttachmentTO[];
  buttons: ButtonTO[];
  embedded_app: MessageEmbeddedAppTO | null;
  flags: number;
  key: string;
  members: string[];
  message: string | null;
  parent_key: string | null;
  priority: number;
  sender_reply: string | null;
  timeout: number;
}

export interface SendMessageResponseTO {
  key: string | null;
  timestamp: number;
}

export interface ServiceMenuItemLinkTO {
  external: boolean;
  request_user_link: boolean;
  url: string | null;
}

export interface ServiceMenuItemTO {
  action: number;
  coords: number[];
  embeddedApp: string | null;
  fallThrough: boolean;
  form: FormVersionTO | null;
  hashedTag: string | null;
  iconColor: string | null;
  iconName: string | null;
  label: string | null;
  link: ServiceMenuItemLinkTO | null;
  requiresWifi: boolean;
  roles: number[];
  runInBackground: boolean;
  screenBranding: string | null;
  staticFlowHash: string | null;
}

export interface ServiceMenuTO {
  aboutLabel: string | null;
  branding: string | null;
  callConfirmation: string | null;
  callLabel: string | null;
  items: ServiceMenuItemTO[];
  messagesLabel: string | null;
  phoneNumber: string | null;
  share: boolean;
  shareCaption: string | null;
  shareDescription: string | null;
  shareImageUrl: string | null;
  shareLabel: string | null;
  shareLinkUrl: string | null;
  staticFlowBrandings: string[];
}

export interface SetHomeScreenRequestTO {
  id: string;
}

export interface SetHomeScreenResponseTO {
  id: string;
}

export interface SettingsTO {
  backgroundFetchTimestamps: number[];
  consent: ConsentSettingsTO | null;
  geoLocationSamplingIntervalBattery: number;
  geoLocationSamplingIntervalCharging: number;
  geoLocationTracking: boolean;
  geoLocationTrackingDays: number;
  geoLocationTrackingTimeslot: number[];
  operatingVersion: number;
  recordGeoLocationWithPhoneCalls: boolean;
  recordPhoneCalls: boolean;
  recordPhoneCallsDays: number;
  recordPhoneCallsTimeslot: number[];
  useGPSBattery: boolean;
  useGPSCharging: boolean;
  version: number;
  xmppReconnectInterval: number;
}

export interface ShareServiceRequestTO {
  recipient: string | null;
  service_email: string | null;
}

export interface ShareServiceResponseTO {
}

export interface SignFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: SignFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface SignFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: SignTO;
}

export interface SignTO {
  algorithm: string | null;
  caption: string | null;
  index: string | null;
  key_name: string | null;
  payload: string | null;
}

export interface SignWidgetResultTO {
  payload_signature: string | null;
  public_key: PublicKeyTO;
  total_signature: string | null;
}

export interface SingleSelectComponentTO {
  choices: ValueTO[];
  description: string | null;
  id: string;
  sensitive: boolean;
  title: string | null;
  validators: FormValidatorTO[];
  readonly type: FormComponentType.SINGLE_SELECT;
}

export interface SingleSelectComponentValueTO {
  value: string;
  id: string;
  readonly type: FormComponentType.SINGLE_SELECT;
}

export interface SingleSelectFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: SingleSelectFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface SingleSelectFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: SingleSelectTO;
}

export interface SingleSelectTO {
  choices: ChoiceTO[];
  value: string | null;
}

export interface SingleSliderFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: SingleSliderFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface SingleSliderFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: SingleSliderTO;
}

export interface SingleSliderTO {
  max: number;
  min: number;
  precision: number;
  step: number;
  unit: string | null;
  value: number;
}

export interface SizeTO {
  height: number;
  width: number;
}

export interface StartChatRequestTO {
  avatar: string | null;
  emails: string[];
  key: string;
  topic: string | null;
}

export interface StartChatResponseTO {
  key: string | null;
  timestamp: number;
}

export interface StartFlowRequestTO {
  attachments_to_dwnl: string[];
  brandings_to_dwnl: string[];
  flow_params: string | null;
  message_flow_run_id: string | null;
  parent_message_key: string | null;
  service: string;
  static_flow: string;
  static_flow_hash: string;
}

export interface StartFlowResponseTO {
}

export interface StartServiceActionRequestTO {
  action: string | null;
  context: string | null;
  email: string | null;
  message_flow_run_id: string | null;
  static_flow_hash: string | null;
  timestamp: number;
}

export interface StartServiceActionResponseTO {
}

export interface SubmitAdvancedOrderFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: AdvancedOrderWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitAdvancedOrderFormResponseTO {
  result: number;
}

export interface SubmitAutoCompleteFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitAutoCompleteFormResponseTO {
  result: number;
}

export interface SubmitDateSelectFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: LongWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitDateSelectFormResponseTO {
  result: number;
}

export interface SubmitDynamicFormRequestTO {
  id: number;
  sections: FormSectionValueTO[];
  test: boolean;
  version: number;
}

export interface SubmitDynamicFormResponseTO {
  errormsg: string | null;
  success: boolean;
}

export interface SubmitFriendSelectFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeListWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitFriendSelectFormResponseTO {
  result: number;
}

export interface SubmitGPSLocationFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: LocationWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitGPSLocationFormResponseTO {
  result: number;
}

export interface SubmitMultiSelectFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeListWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitMultiSelectFormResponseTO {
  result: number;
}

export interface SubmitMyDigiPassFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: MyDigiPassWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitMyDigiPassFormResponseTO {
  result: number;
}

export interface SubmitOauthFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitOauthFormResponseTO {
  result: number;
}

export interface SubmitOpenIdFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: OpenIdWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitOpenIdFormResponseTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: WidgetResult | null;
  timestamp: number;
}

export interface SubmitPayFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: PayWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitPayFormResponseTO {
  result: number;
}

export interface SubmitPhotoUploadFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitPhotoUploadFormResponseTO {
  result: number;
}

export interface SubmitRangeSliderFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: FloatListWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitRangeSliderFormResponseTO {
  result: number;
}

export interface SubmitSignFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: SignWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitSignFormResponseTO {
  result: number;
}

export interface SubmitSingleSelectFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitSingleSelectFormResponseTO {
  result: number;
}

export interface SubmitSingleSliderFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: FloatWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitSingleSliderFormResponseTO {
  result: number;
}

export interface SubmitTextBlockFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitTextBlockFormResponseTO {
  result: number;
}

export interface SubmitTextLineFormRequestTO {
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  result: UnicodeWidgetResultTO | null;
  timestamp: number;
}

export interface SubmitTextLineFormResponseTO {
  result: number;
}

export interface TestFormRequestTO {
  id: number;
  version: number;
}

export interface TestFormResponseTO {
}

export interface TextAnnouncementTO {
  description: string | null;
  title: string | null;
  readonly type: MapAnnouncementType.TEXT;
}

export interface TextBlockFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: TextBlockFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface TextBlockFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: TextBlockTO;
}

export interface TextBlockTO {
  keyboard_type: string | null;
  max_chars: number;
  place_holder: string | null;
  value: string | null;
}

export interface TextInputComponentTO {
  description: string | null;
  id: string;
  keyboard_type: string | null;
  multiline: boolean;
  placeholder: string | null;
  sensitive: boolean;
  title: string | null;
  validators: FormValidatorTO[];
  readonly type: FormComponentType.TEXT_INPUT;
}

export interface TextInputComponentValueTO {
  value: string;
  id: string;
  readonly type: FormComponentType.TEXT_INPUT;
}

export interface TextLineFormMessageTO {
  alert_flags: number;
  attachments: AttachmentTO[];
  branding: string | null;
  context: string | null;
  default_priority: number;
  default_sticky: boolean;
  flags: number;
  form: TextLineFormTO;
  key: string;
  member: MemberStatusTO;
  message: string | null;
  message_type: number;
  parent_key: string | null;
  priority: number;
  sender: string;
  threadTimestamp: number;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_size: number;
  thread_text_color: string | null;
  timestamp: number;
}

export interface TextLineFormTO {
  javascript_validation: string | null;
  negative_button: string | null;
  negative_button_ui_flags: number;
  negative_confirmation: string | null;
  positive_button: string | null;
  positive_button_ui_flags: number;
  positive_confirmation: string | null;
  type: string | null;
  widget: TextLineTO;
}

export interface TextLineTO {
  keyboard_type: string | null;
  max_chars: number;
  place_holder: string | null;
  value: string | null;
}

export interface TextSectionTO {
  description: string | null;
  title: string | null;
  readonly type: MapSectionType.TEXT;
}

export interface Thumbnail {
  height: number;
  url: string | null;
  width: number;
}

export interface ToggleListSectionItemTO {
  filled: boolean;
  id: string;
  state: string;
  background_color: string | null;
  icon: string | null;
  icon_color: string | null;
  title: string | null;
  readonly type: MapListSectionItemType.TOGGLE;
}

export interface ToggleMapItemRequestTO {
  item_id: string;
  state: string;
  tag: string;
  toggle_id: string;
}

export interface ToggleMapItemResponseTO {
  item_id: string | null;
  toggle_item: ToggleListSectionItemTO;
}

export interface TransferCompletedRequestTO {
  message_key: string;
  parent_message_key: string | null;
  result_url: string;
}

export interface TransferCompletedResponseTO {
}

export interface UnicodeListWidgetResultTO {
  values: string[];
}

export interface UnicodeWidgetResultTO {
  value: string | null;
}

export interface UnregisterMobileRequestTO {
  reason: string | null;
}

export interface UnregisterMobileResponseTO {
}

export interface UpdateAdvancedOrderFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: AdvancedOrderWidgetResultTO | null;
  status: number;
}

export interface UpdateAdvancedOrderFormResponseTO {
}

export interface UpdateAppAssetRequestTO {
  kind: string;
  scale_x: number;
  url: string | null;
}

export interface UpdateAppAssetResponseTO {
}

export interface UpdateApplePushDeviceTokenRequestTO {
  token: string | null;
}

export interface UpdateApplePushDeviceTokenResponseTO {
}

export interface UpdateAutoCompleteFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeWidgetResultTO | null;
  status: number;
}

export interface UpdateAutoCompleteFormResponseTO {
}

export interface UpdateBadgeCountRequestTO {
  badge_count: number;
  group_id: string | null;
  group_type: string | null;
}

export interface UpdateBadgeCountResponseTO {
}

export interface UpdateChatRequestTO {
  avatar: string | null;
  parent_message_key: string;
  topic: string | null;
}

export interface UpdateChatResponseTO {
}

export interface UpdateDateSelectFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: LongWidgetResultTO | null;
  status: number;
}

export interface UpdateDateSelectFormResponseTO {
}

export interface UpdateEmbeddedAppRequestTO {
  description: string | null;
  name: string;
  serving_url: string | null;
  title: string | null;
  types: string[];
  url_regexes: string[];
  version: number;
}

export interface UpdateEmbeddedAppResponseTO {
}

export interface UpdateEmbeddedAppsRequestTO {
  embedded_apps: EmbeddedAppTO[];
}

export interface UpdateEmbeddedAppsResponseTO {
}

export interface UpdateFriendRequestTO {
  friend: FriendTO;
  generation: number;
  status: number;
}

export interface UpdateFriendResponseTO {
  reason: string | null;
  updated: boolean;
}

export interface UpdateFriendSelectFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeListWidgetResultTO | null;
  status: number;
}

export interface UpdateFriendSelectFormResponseTO {
}

export interface UpdateFriendSetRequestTO {
  added_friend: FriendTO | null;
  friends: string[];
  version: number;
}

export interface UpdateFriendSetResponseTO {
  reason: string | null;
  updated: boolean;
}

export interface UpdateGPSLocationFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: LocationWidgetResultTO | null;
  status: number;
}

export interface UpdateGPSLocationFormResponseTO {
}

export interface UpdateGroupsRequestTO {
}

export interface UpdateGroupsResponseTO {
}

export interface UpdateJSEmbeddingRequestTO {
  items: JSEmbeddingItemTO[];
}

export interface UpdateJSEmbeddingResponseTO {
}

export interface UpdateMessageEmbeddedAppRequestTO {
  embedded_app: MessageEmbeddedAppTO;
  message_key: string | null;
  parent_message_key: string | null;
}

export interface UpdateMessageEmbeddedAppResponseTO {
  embedded_app: MessageEmbeddedAppTO;
  message_key: string | null;
  parent_message_key: string | null;
}

export interface UpdateMessageRequestTO {
  embedded_app: MessageEmbeddedAppTO | null;
  existence: number;
  flags: number;
  has_existence: boolean;
  has_flags: boolean;
  last_child_message: string | null;
  message: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  thread_avatar_hash: string | null;
  thread_background_color: string | null;
  thread_text_color: string | null;
}

export interface UpdateMessageResponseTO {
}

export interface UpdateMultiSelectFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeListWidgetResultTO | null;
  status: number;
}

export interface UpdateMultiSelectFormResponseTO {
}

export interface UpdateMyDigiPassFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: MyDigiPassWidgetResultTO | null;
  status: number;
}

export interface UpdateMyDigiPassFormResponseTO {
}

export interface UpdateOauthFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeWidgetResultTO | null;
  status: number;
}

export interface UpdateOauthFormResponseTO {
}

export interface UpdateOpenIdFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: OpenIdWidgetResultTO | null;
  status: number;
}

export interface UpdateOpenIdFormResponseTO {
}

export interface UpdatePayFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: PayWidgetResultTO | null;
  status: number;
}

export interface UpdatePayFormResponseTO {
}

export interface UpdatePhotoUploadFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeWidgetResultTO | null;
  status: number;
}

export interface UpdatePhotoUploadFormResponseTO {
}

export interface UpdateProfileAddressRequestTO {
  address: ProfileAddressTO;
}

export interface UpdateProfileAddressResponseTO {
  address: ProfileAddressTO;
}

export interface UpdateProfileEmailRequestTO {
  email: string;
  label: string;
}

export interface UpdateProfileEmailResponseTO {
  email: ProfileEmailTO;
}

export interface UpdateProfilePhoneNumberRequestTO {
  phone_number: ProfilePhoneNumberTO;
}

export interface UpdateProfilePhoneNumberResponseTO {
  phone_number: ProfilePhoneNumberTO;
}

export interface UpdateRangeSliderFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: FloatListWidgetResultTO | null;
  status: number;
}

export interface UpdateRangeSliderFormResponseTO {
}

export interface UpdateSettingsRequestTO {
  settings: SettingsTO;
}

export interface UpdateSettingsResponseTO {
}

export interface UpdateSignFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: SignWidgetResultTO | null;
  status: number;
}

export interface UpdateSignFormResponseTO {
}

export interface UpdateSingleSelectFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeWidgetResultTO | null;
  status: number;
}

export interface UpdateSingleSelectFormResponseTO {
}

export interface UpdateSingleSliderFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: FloatWidgetResultTO | null;
  status: number;
}

export interface UpdateSingleSliderFormResponseTO {
}

export interface UpdateTextBlockFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeWidgetResultTO | null;
  status: number;
}

export interface UpdateTextBlockFormResponseTO {
}

export interface UpdateTextLineFormRequestTO {
  acked_timestamp: number;
  button_id: string | null;
  message_key: string | null;
  parent_message_key: string | null;
  received_timestamp: number;
  result: UnicodeWidgetResultTO | null;
  status: number;
}

export interface UpdateTextLineFormResponseTO {
}

export interface UpdateUserDataRequestTO {
  app_data: string | null;
  data: string | null;
  keys: string[];
  service: string;
  type: string | null;
  user_data: string | null;
  values: string[];
}

export interface UpdateUserDataResponseTO {
}

export interface UploadChunkRequestTO {
  chunk: string | null;
  content_type: string | null;
  message_key: string;
  number: number;
  parent_message_key: string | null;
  photo_hash: string | null;
  service_identity_user: string | null;
  total_chunks: number;
}

export interface UploadChunkResponseTO {
}

export interface UserScannedRequestTO {
  app_id: string | null;
  email: string | null;
  service_email: string | null;
}

export interface UserScannedResponseTO {
}

export interface ValueTO {
  image_url: string | null;
  label: string;
  next_action: NextActionTO | null;
  value: string;
}

export interface VerifyProfileEmailRequestTO {
  email: string;
  pin_code: number;
}

export interface VerifyProfileEmailResponseTO {
  email: ProfileEmailTO;
}

export interface VoteSectionTO {
  id: string;
  options: MapVoteOptionTO[];
  readonly type: MapSectionType.VOTE;
}

export interface WeekDayTextTO {
  day: string;
  lines: MapItemLineTextPartTO[];
}

export interface Widget {
}

export interface WidgetResult {
}

export interface ZipCodeTO {
  name: string;
  zip_code: string;
}
