export type SectionRenderer = {
  itemSectionRenderer?: ItemSectionRenderer
  continuationItemRenderer?: ContinuationItemRenderer
}

export type VideoRenderer = {
  videoId: string
  thumbnail: CollapsedThumbnailElement
  title: Title
  longBylineText: Text
  publishedTimeText?: SubscriberCountText
  lengthText: VideoCountTextClass
  viewCountText: SubscriberCountText
  navigationEndpoint: Endpoint
  badges?: BadgeElement[]
  ownerBadges?: OwnerBadge[]
  ownerText: Text
  shortBylineText: Text
  trackingParams: string
  showActionMenu: boolean
  shortViewCountText: VideoCountTextClass
  menu: VideoRendererMenu
  channelThumbnailSupportedRenderers: ChannelThumbnailSupportedRenderers
  thumbnailOverlays: VideoRendererThumbnailOverlay[]
  detailedMetadataSnippets?: DetailedMetadataSnippet[]
  inlinePlaybackEndpoint: Endpoint
  searchVideoResultEntityKey: string
  expandableMetadata?: ExpandableMetadata
}

export type SearchResult = {
  id: string
  url: string
  title: string
  duration: string
  thumbnailUrl: string
}

type ContinuationItemRenderer = {
  trigger: string
  continuationEndpoint: ContinuationEndpoint
  loggingDirectives: ContinuationItemRendererLoggingDirectives
}

type ContinuationEndpoint = {
  clickTrackingParams: string
  commandMetadata: ContinuationEndpointCommandMetadata
  continuationCommand: ContinuationCommand
}

type ContinuationEndpointCommandMetadata = {
  webCommandMetadata: PurpleWebCommandMetadata
}

type PurpleWebCommandMetadata = {
  sendPost: boolean
  apiUrl?: PurpleAPIURL
}

type PurpleAPIURL =
  | '/youtubei/v1/search'
  | '/youtubei/v1/browse/edit_playlist'
  | '/youtubei/v1/share/get_share_panel'
  | '/youtubei/v1/playlist/create'

type ContinuationCommand = {
  token: string
  request: string
}

type ContinuationItemRendererLoggingDirectives = {
  trackingParams: string
}

type ItemSectionRenderer = {
  contents: ContentElement[]
  trackingParams: string
}

type ContentElement = {
  adSlotRenderer?: ContentAdSlotRenderer
  channelRenderer?: ChannelRenderer
  shelfRenderer?: ShelfRenderer
  videoRenderer?: VideoRenderer
  playlistRenderer?: PlaylistRenderer
  searchPyvRenderer?: SearchPyvRenderer
  reelShelfRenderer?: ReelShelfRenderer
}

type ContentAdSlotRenderer = {
  adSlotMetadata: AdSlotMetadata
  fulfillmentContent: PurpleFulfillmentContent
  enablePacfLoggingWeb: boolean
}

type AdSlotMetadata = {
  slotId: string
  slotType: string
  slotPhysicalPosition: number
  adSlotLoggingData: AdSlotLoggingData
}

type AdSlotLoggingData = {
  serializedSlotAdServingDataEntry: string
}

type PurpleFulfillmentContent = {
  fulfilledLayout: PurpleFulfilledLayout
}

type PurpleFulfilledLayout = {
  inFeedAdLayoutRenderer: PurpleInFeedAdLayoutRenderer
}

type PurpleInFeedAdLayoutRenderer = {
  adLayoutMetadata: AdLayoutMetadata
  renderingContent: PurpleRenderingContent
}

type AdLayoutMetadata = {
  layoutId: string
  layoutType: string
  adLayoutLoggingData: AdLayoutLoggingData
}

type AdLayoutLoggingData = {
  serializedAdServingDataEntry: string
}

type PurpleRenderingContent = {
  promotedSparklesWebRenderer?: PromotedSparklesWebRenderer
  textImageNoButtonLayoutRenderer?: TextImageNoButtonLayoutRenderer
}

type PromotedSparklesWebRenderer = {
  thumbnail: CollapsedThumbnailElement
  title: SubscriberCountText
  description: SubscriberCountText
  websiteText: SubscriberCountText
  navigationEndpoint: NavigationEndpoint
  impressionCommands: Command[]
  menu: PromotedSparklesWebRendererMenu
  trackingParams: string
  clickLocationTargets: ClickLocationTarget[]
  mediaHoverOverlay: MediaHoverOverlay
  mediaBadge: MediaBadge
  promotedSparklesWebStyle: string
  isSquareThumbnail: boolean
  thumbnailNavigationEndpoint: NavigationEndpoint
  adBadge: BadgeElement
}

type BadgeElement = {
  metadataBadgeRenderer: BadgeMetadataBadgeRenderer
}

type BadgeMetadataBadgeRenderer = {
  style: PurpleStyle
  label: Label
  trackingParams: string
  accessibilityData?: AccessibilityData
}

type AccessibilityData = {
  label: string
}

type Label = 'Sponsored' | 'New' | '4K' | 'CC'

type PurpleStyle = 'BADGE_STYLE_TYPE_AD' | 'BADGE_STYLE_TYPE_SIMPLE'

type ClickLocationTarget = {
  location: string
  code: number
  behaviorType: BehaviorType
}

type BehaviorType =
  | 'PROMOTED_SPARKLES_CLICK_BEHAVIOR_TYPE_OPEN_AD'
  | 'PROMOTED_SPARKLES_CLICK_BEHAVIOR_TYPE_NOOP'

type SubscriberCountText = {
  simpleText: string
}

type Command = {
  clickTrackingParams: string
  loggingUrls: LoggingURL[]
  pingingEndpoint: PingingEndpoint
}

type LoggingURL = {
  baseUrl: string
}

type PingingEndpoint = {
  hack: boolean
}

type MediaBadge = {
  metadataBadgeRenderer: MediaBadgeMetadataBadgeRenderer
}

type MediaBadgeMetadataBadgeRenderer = {
  icon: Icon
  style: string
  trackingParams: string
}

type Icon = {
  iconType: IconType
}

type IconType =
  | 'EXTERNAL_LINK'
  | 'OFFICIAL_ARTIST_BADGE'
  | 'PLAYLISTS'
  | 'PLAY_ALL'
  | 'FEEDBACK'
  | 'YOUTUBE_SHORTS_BRAND_24'
  | 'CHECK'
  | 'WATCH_LATER'
  | 'ADD_TO_QUEUE_TAIL'
  | 'SHARE'
  | 'PLAYLIST_ADD_CHECK'
  | 'EXPAND_LESS'
  | 'EXPAND_MORE'
  | 'CHEVRON_RIGHT'
  | 'CHEVRON_LEFT'

type MediaHoverOverlay = {
  buttonRenderer: MediaHoverOverlayButtonRenderer
}

type MediaHoverOverlayButtonRenderer = {
  style: string
  text: SubscriberCountText
  icon: Icon
  trackingParams: string
  iconPosition: string
}

type PromotedSparklesWebRendererMenu = {
  menuRenderer: PurpleMenuRenderer
}

type PurpleMenuRenderer = {
  trackingParams: string
  isDisabled: boolean
  disabledCommand: DisabledCommand
}

type DisabledCommand = {
  clickTrackingParams: string
  openPopupAction: DisabledCommandOpenPopupAction
}

type DisabledCommandOpenPopupAction = {
  popup: PurplePopup
  popupType: PopupType
}

type PurplePopup = {
  aboutThisAdRenderer: AboutThisAdRenderer
}

type AboutThisAdRenderer = {
  url: URL
  trackingParams: string
}

type URL = {
  privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string
}

type PopupType = 'DIALOG'

type NavigationEndpoint = {
  clickTrackingParams: string
  loggingUrls: LoggingURL[]
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  urlEndpoint: URLEndpoint
}

type ThumbnailNavigationEndpointCommandMetadata = {
  webCommandMetadata: FluffyWebCommandMetadata
}

type FluffyWebCommandMetadata = {
  url: string
  webPageType: WebPageType
  rootVe: number
  apiUrl?: FluffyAPIURL
}

type FluffyAPIURL = '/youtubei/v1/browse'

type WebPageType =
  | 'WEB_PAGE_TYPE_UNKNOWN'
  | 'WEB_PAGE_TYPE_CHANNEL'
  | 'WEB_PAGE_TYPE_SEARCH'
  | 'WEB_PAGE_TYPE_WATCH'
  | 'WEB_PAGE_TYPE_PLAYLIST'
  | 'WEB_PAGE_TYPE_SHORTS'

type URLEndpoint = {
  url: string
  target: Target
}

type Target = 'TARGET_NEW_WINDOW'

type CollapsedThumbnailElement = {
  thumbnails: ThumbnailThumbnail[]
}

type ThumbnailThumbnail = {
  url: string
  width: number
  height: number
}

type TextImageNoButtonLayoutRenderer = {
  title: Headline
  headline: Headline
  websiteText: SubscriberCountText
  navigationCommand: NavigationEndpoint
  impressionCommand: Command
  menu: PromotedSparklesWebRendererMenu
  mediaHoverOverlay: MediaHoverOverlay
  mediaBadge: MediaBadge
  adBadge: BadgeElement
  sitelinks: Sitelink[]
  clickLocationTargets: ClickLocationTarget[]
  trackingParams: string
}

type Headline = {
  runs: HeadlineRun[]
}

type HeadlineRun = {
  text: string
  navigationEndpoint: NavigationEndpoint
  loggingDirectives: RunLoggingDirectives
}

type RunLoggingDirectives = {
  trackingParams: string
  visibility: Visibility
  enableDisplayloggerExperiment: boolean
}

type Visibility = {
  types: string
}

type Sitelink = {
  title: Headline
  onTap: NavigationEndpoint
}

type ChannelRenderer = {
  channelId: string
  title: SubscriberCountText
  navigationEndpoint: ChannelRendererNavigationEndpoint
  thumbnail: CollapsedThumbnailElement
  descriptionSnippet: DescriptionSnippet
  shortBylineText: Text
  videoCountText: VideoCountTextClass
  subscriptionButton: SubscriptionButton
  ownerBadges: OwnerBadge[]
  subscriberCountText: SubscriberCountText
  subscribeButton: SubscribeButton
  trackingParams: string
  longBylineText: Text
}

type DescriptionSnippet = {
  runs: DescriptionSnippetRun[]
}

type DescriptionSnippetRun = {
  text: string
  bold?: boolean
}

type Text = {
  runs: LongBylineTextRun[]
}

type LongBylineTextRun = {
  text: string
  navigationEndpoint?: ChannelRendererNavigationEndpoint
}

type ChannelRendererNavigationEndpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  browseEndpoint: PurpleBrowseEndpoint
}

type PurpleBrowseEndpoint = {
  browseId: string
  canonicalBaseUrl?: string
}

type OwnerBadge = {
  metadataBadgeRenderer: OwnerBadgeMetadataBadgeRenderer
}

type OwnerBadgeMetadataBadgeRenderer = {
  icon: Icon
  style: FluffyStyle
  tooltip: Tooltip
  trackingParams: string
  accessibilityData: AccessibilityData
}

type FluffyStyle = 'BADGE_STYLE_TYPE_VERIFIED_ARTIST'

type Tooltip = 'Official Artist Channel'

type SubscribeButton = {
  buttonRenderer: SubscribeButtonButtonRenderer
}

type SubscribeButtonButtonRenderer = {
  style: string
  size: string
  isDisabled: boolean
  text: VideoCountText
  navigationEndpoint: ButtonRendererNavigationEndpoint
  trackingParams: string
}

type ButtonRendererNavigationEndpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  signInEndpoint: SignInEndpoint
}

type SignInEndpoint = {
  nextEndpoint: NextEndpoint
  continueAction: string
}

type NextEndpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  searchEndpoint: SearchEndpoint
}

type SearchEndpoint = {
  query: string
}

type VideoCountText = {
  runs: VideoCountTextRun[]
}

type VideoCountTextRun = {
  text: string
}

type SubscriptionButton = {
  subscribed: boolean
}

type VideoCountTextClass = {
  accessibility: Accessibility
  simpleText: string
}

type Accessibility = {
  accessibilityData: AccessibilityData
}

type PlaylistRenderer = {
  playlistId: string
  title: SubscriberCountText
  thumbnails: CollapsedThumbnailElement[]
  videoCount: string
  navigationEndpoint: PlaylistRendererNavigationEndpoint
  viewPlaylistText: ViewPlaylistText
  shortBylineText: Text
  videos: Video[]
  videoCountText: VideoCountText
  trackingParams: string
  thumbnailText: DescriptionSnippet
  longBylineText: Text
  ownerBadges: OwnerBadge[]
  thumbnailRenderer: ThumbnailRenderer
  thumbnailOverlays: PlaylistRendererThumbnailOverlay[]
}

type PlaylistRendererNavigationEndpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  watchEndpoint: PurpleWatchEndpoint
}

type PurpleWatchEndpoint = {
  videoId: string
  playlistId: string
  params?: string
  loggingContext: WatchEndpointLoggingContext
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig
}

type WatchEndpointLoggingContext = {
  vssLoggingContext: LoggingContext
}

type LoggingContext = {
  serializedContextData: SerializedContextData
}

type SerializedContextData =
  | 'GiJQTDBqcC11WjdhNGc5RlFXVzVSX3UwcHo0eXpWNFJpT1h1'
  | 'CgIIDA%3D%3D'

type WatchEndpointSupportedOnesieConfig = {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig
}

type Html5PlaybackOnesieConfig = {
  commonConfig: CommonConfig
}

type CommonConfig = {
  url: string
}

type PlaylistRendererThumbnailOverlay = {
  thumbnailOverlayBottomPanelRenderer?: ThumbnailOverlayBottomPanelRenderer
  thumbnailOverlayHoverTextRenderer?: ThumbnailOverlayHoverTextRenderer
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayRenderer
}

type ThumbnailOverlayBottomPanelRenderer = {
  text: SubscriberCountText
  icon: Icon
}

type ThumbnailOverlayHoverTextRenderer = {
  text: VideoCountText
  icon: Icon
}

type ThumbnailOverlayRenderer = {
  text: VideoCountText
}

type ThumbnailRenderer = {
  playlistVideoThumbnailRenderer: PlaylistVideoThumbnailRenderer
}

type PlaylistVideoThumbnailRenderer = {
  thumbnail: PlaylistVideoThumbnailRendererThumbnail
  trackingParams: string
}

type PlaylistVideoThumbnailRendererThumbnail = {
  thumbnails: ThumbnailThumbnail[]
  sampledThumbnailColor: SampledThumbnailColor
  darkColorPalette: DarkColorPalette
  vibrantColorPalette: VibrantColorPalette
}

type DarkColorPalette = {
  section2Color: number
  iconInactiveColor: number
  iconDisabledColor: number
}

type SampledThumbnailColor = {
  red: number
  green: number
  blue: number
}

type VibrantColorPalette = {
  iconInactiveColor: number
}

type Video = {
  childVideoRenderer: ChildVideoRenderer
}

type ChildVideoRenderer = {
  title: SubscriberCountText
  navigationEndpoint: PlaylistRendererNavigationEndpoint
  lengthText: VideoCountTextClass
  videoId: string
}

type ViewPlaylistText = {
  runs: ViewPlaylistTextRun[]
}

type ViewPlaylistTextRun = {
  text: string
  navigationEndpoint: PurpleNavigationEndpoint
}

type PurpleNavigationEndpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  browseEndpoint: FluffyBrowseEndpoint
}

type FluffyBrowseEndpoint = {
  browseId: string
}

type ReelShelfRenderer = {
  title: SubscriberCountText
  button: Button
  items: ReelShelfRendererItem[]
  trackingParams: string
  icon: Icon
}

type Button = {
  menuRenderer: ButtonMenuRenderer
}

type ButtonMenuRenderer = {
  items: PurpleItem[]
  trackingParams: string
  accessibility: Accessibility
}

type PurpleItem = {
  menuNavigationItemRenderer: MenuNavigationItemRenderer
}

type MenuNavigationItemRenderer = {
  text: VideoCountText
  icon: Icon
  navigationEndpoint: MenuNavigationItemRendererNavigationEndpoint
  trackingParams: string
  accessibility: Accessibility
}

type MenuNavigationItemRendererNavigationEndpoint = {
  clickTrackingParams: string
  commandMetadata: PurpleCommandMetadata
  userFeedbackEndpoint: UserFeedbackEndpoint
}

type PurpleCommandMetadata = {
  webCommandMetadata: TentacledWebCommandMetadata
}

type TentacledWebCommandMetadata = {
  ignoreNavigation: boolean
}

type UserFeedbackEndpoint = {
  additionalDatas: AdditionalData[]
}

type AdditionalData = {
  userFeedbackEndpointProductSpecificValueData: PlayerExtraURLParam
}

type PlayerExtraURLParam = {
  key: Key
  value: string
}

type Key = 'lockup' | 'inline' | 'video_id'

type ReelShelfRendererItem = {
  reelItemRenderer: ReelItemRenderer
}

type ReelItemRenderer = {
  videoId: string
  headline: SubscriberCountText
  thumbnail: ReelWatchEndpointThumbnail
  viewCountText: VideoCountTextClass
  navigationEndpoint: ReelItemRendererNavigationEndpoint
  menu: Button
  trackingParams: string
  accessibility: Accessibility
  style: ReelItemRendererStyle
  videoType: VideoType
  inlinePlaybackEndpoint: Endpoint
  badge?: ReelItemRendererBadge
  loggingDirectives: RunLoggingDirectives
}

type ReelItemRendererBadge = {
  textBadgeRenderer: TextBadgeRenderer
}

type TextBadgeRenderer = {
  label: SubscriberCountText
}

type Endpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  watchEndpoint: InlinePlaybackEndpointWatchEndpoint
}

type InlinePlaybackEndpointWatchEndpoint = {
  videoId: string
  playerParams: string
  playerExtraUrlParams?: PlayerExtraURLParam[]
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig
  params?: string
}

type ReelItemRendererNavigationEndpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  reelWatchEndpoint: ReelWatchEndpoint
}

type ReelWatchEndpoint = {
  videoId: string
  playerParams: string
  thumbnail: ReelWatchEndpointThumbnail
  overlay: Overlay
  params: ReelWatchEndpointParams
  sequenceProvider: SequenceProvider
  sequenceParams: string
  loggingContext: ReelWatchEndpointLoggingContext
  ustreamerConfig: UstreamerConfig
}

type ReelWatchEndpointLoggingContext = {
  vssLoggingContext: LoggingContext
  qoeLoggingContext: LoggingContext
}

type Overlay = {
  reelPlayerOverlayRenderer: ReelPlayerOverlayRenderer
}

type ReelPlayerOverlayRenderer = {
  style: ReelPlayerOverlayRendererStyle
  trackingParams: string
  reelPlayerNavigationModel: ReelPlayerNavigationModel
}

type ReelPlayerNavigationModel = 'REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED'

type ReelPlayerOverlayRendererStyle = 'REEL_PLAYER_OVERLAY_STYLE_SHORTS'

type ReelWatchEndpointParams = 'CBQwAkoUCgkiB2JlYXRsZXMSB2JlYXRsZXM%3D'

type SequenceProvider = 'REEL_WATCH_SEQUENCE_PROVIDER_RPC'

type ReelWatchEndpointThumbnail = {
  thumbnails: ThumbnailThumbnail[]
  isOriginalAspectRatio: boolean
}

type UstreamerConfig = 'CAwSGG1MdndaZU9qYzlpR3pxNnFMMkxGS1Q0PQ=='

type ReelItemRendererStyle = 'REEL_ITEM_STYLE_AVATAR_CIRCLE'

type VideoType = 'REEL_VIDEO_TYPE_VIDEO'

type SearchPyvRenderer = {
  ads: Ad[]
  trackingParams: string
}

type Ad = {
  adSlotRenderer: AdAdSlotRenderer
}

type AdAdSlotRenderer = {
  adSlotMetadata: AdSlotMetadata
  fulfillmentContent: FluffyFulfillmentContent
  enablePacfLoggingWeb: boolean
}

type FluffyFulfillmentContent = {
  fulfilledLayout: FluffyFulfilledLayout
}

type FluffyFulfilledLayout = {
  inFeedAdLayoutRenderer: FluffyInFeedAdLayoutRenderer
}

type FluffyInFeedAdLayoutRenderer = {
  adLayoutMetadata: AdLayoutMetadata
  renderingContent: FluffyRenderingContent
}

type FluffyRenderingContent = {
  promotedVideoRenderer: PromotedVideoRenderer
}

type PromotedVideoRenderer = {
  videoId: string
  thumbnail: PromotedVideoRendererThumbnail
  title: SubscriberCountText
  description: SubscriberCountText
  longBylineText: Text
  shortBylineText: Text
  lengthText: VideoCountTextClass
  navigationEndpoint: PromotedVideoRendererNavigationEndpoint
  impressionUrls: string[]
  clickTrackingUrls: string[]
  trackingParams: string
  menu: PromotedSparklesWebRendererMenu
  viewCountText: SubscriberCountText
  thumbnailOverlays: PromotedVideoRendererThumbnailOverlay[]
  activeView: ActiveView
  adPlaybackContextParams: string
  adBadge: BadgeElement
}

type ActiveView = {
  viewableCommands: Command[]
  endOfSessionCommands: Command[]
  regexUriMacroValidator: RegexURIMacroValidator
}

type RegexURIMacroValidator = {
  emptyMap: boolean
}

type PromotedVideoRendererNavigationEndpoint = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  urlEndpoint: CommonConfig
}

type PromotedVideoRendererThumbnail = {
  thumbnails: CommonConfig[]
}

type PromotedVideoRendererThumbnailOverlay = {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer
  thumbnailOverlayToggleButtonRenderer?: PurpleThumbnailOverlayToggleButtonRenderer
}

type ThumbnailOverlayTimeStatusRenderer = {
  text: VideoCountTextClass
  style: ThumbnailOverlayTimeStatusRendererStyle
}

type ThumbnailOverlayTimeStatusRendererStyle = 'DEFAULT'

type PurpleThumbnailOverlayToggleButtonRenderer = {
  isToggled: boolean
  untoggledIcon: Icon
  toggledIcon: Icon
  untoggledTooltip: UntoggledTooltip
  toggledTooltip: ToggledTooltip
  untoggledServiceEndpoint: UntoggledServiceEndpoint
  toggledServiceEndpoint: ToggledServiceEndpoint
  untoggledAccessibility: Accessibility
  toggledAccessibility: Accessibility
  trackingParams: string
}

type ToggledServiceEndpoint = {
  clickTrackingParams: string
  commandMetadata: ContinuationEndpointCommandMetadata
  playlistEditEndpoint: ToggledServiceEndpointPlaylistEditEndpoint
}

type ToggledServiceEndpointPlaylistEditEndpoint = {
  playlistId: PlaylistID
  actions: PurpleAction[]
}

type PurpleAction = {
  action: TentacledAction
  removedVideoId: string
}

type TentacledAction = 'ACTION_REMOVE_VIDEO_BY_VIDEO_ID'

type PlaylistID = 'WL'

type ToggledTooltip = 'Added'

type UntoggledServiceEndpoint = {
  clickTrackingParams: string
  commandMetadata: ContinuationEndpointCommandMetadata
  playlistEditEndpoint: UntoggledServiceEndpointPlaylistEditEndpoint
}

type UntoggledServiceEndpointPlaylistEditEndpoint = {
  playlistId: PlaylistID
  actions: FluffyAction[]
}

type FluffyAction = {
  addedVideoId: string
  action: StickyAction
}

type StickyAction = 'ACTION_ADD_VIDEO'

type UntoggledTooltip = 'Watch later' | 'Add to queue'

type ShelfRenderer = {
  title: SubscriberCountText
  content: ShelfRendererContent
  trackingParams: string
}

type ShelfRendererContent = {
  verticalListRenderer: VerticalListRenderer
}

type VerticalListRenderer = {
  items: VerticalListRendererItem[]
  collapsedItemCount: number
  collapsedStateButtonText: Title
  trackingParams: string
}

type Title = {
  runs: VideoCountTextRun[]
  accessibility: Accessibility
}

type VerticalListRendererItem = {
  videoRenderer: VideoRenderer
}

type ChannelThumbnailSupportedRenderers = {
  channelThumbnailWithLinkRenderer: ChannelThumbnailWithLinkRenderer
}

type ChannelThumbnailWithLinkRenderer = {
  thumbnail: CollapsedThumbnailElement
  navigationEndpoint: ChannelRendererNavigationEndpoint
  accessibility: Accessibility
}

type DetailedMetadataSnippet = {
  snippetText: DescriptionSnippet
  snippetHoverText: VideoCountText
  maxOneLine: boolean
}

type ExpandableMetadata = {
  expandableMetadataRenderer: ExpandableMetadataRenderer
}

type ExpandableMetadataRenderer = {
  header: Header
  expandedContent: ExpandedContent
  expandButton: CollapseButtonClass
  collapseButton: CollapseButtonClass
  trackingParams: string
  colorData: ColorData
  useCustomColors: boolean
  loggingDirectives: RunLoggingDirectives
}

type CollapseButtonClass = {
  buttonRenderer: CollapseButtonButtonRenderer
}

type CollapseButtonButtonRenderer = {
  style: string
  size: string
  isDisabled: boolean
  icon: Icon
  trackingParams: string
  accessibilityData?: Accessibility
}

type ColorData = {
  lightColorPalette: ColorPalette
  darkColorPalette: ColorPalette
  vibrantColorPalette: ColorPalette
}

type ColorPalette = {
  section1Color: number
  section2Color: number
  section3Color: number
  primaryTitleColor: number
  secondaryTitleColor: number
  iconActivatedColor: number
  iconInactiveColor: number
  section4Color: number
  iconDisabledColor: number
}

type ExpandedContent = {
  horizontalCardListRenderer: HorizontalCardListRenderer
}

type HorizontalCardListRenderer = {
  cards: Card[]
  trackingParams: string
  style: StyleClass
  previousButton: CollapseButtonClass
  nextButton: CollapseButtonClass
}

type Card = {
  macroMarkersListItemRenderer: MacroMarkersListItemRenderer
}

type MacroMarkersListItemRenderer = {
  title: VideoCountText
  timeDescription: VideoCountText
  thumbnail: CollapsedThumbnailElement
  onTap: OnTap
  trackingParams: string
  layout: Layout
  isHighlighted: boolean
}

type Layout = 'MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL'

type OnTap = {
  clickTrackingParams: string
  commandMetadata: ThumbnailNavigationEndpointCommandMetadata
  watchEndpoint: OnTapWatchEndpoint
}

type OnTapWatchEndpoint = {
  videoId: VideoID
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig
  startTimeSeconds?: number
}

type VideoID = 'wpHHg4QseX4'

type StyleClass = {
  type: string
}

type Header = {
  collapsedTitle: VideoCountText
  collapsedThumbnail: CollapsedThumbnailElement
  collapsedLabel: VideoCountText
  expandedTitle: VideoCountText
}

type VideoRendererMenu = {
  menuRenderer: FluffyMenuRenderer
}

type FluffyMenuRenderer = {
  items: FluffyItem[]
  trackingParams: string
  accessibility: Accessibility
}

type FluffyItem = {
  menuServiceItemRenderer: MenuServiceItemRenderer
}

type MenuServiceItemRenderer = {
  text: VideoCountText
  icon: Icon
  serviceEndpoint: ServiceEndpoint
  trackingParams: string
  hasSeparator?: boolean
}

type ServiceEndpoint = {
  clickTrackingParams: string
  commandMetadata: ContinuationEndpointCommandMetadata
  signalServiceEndpoint?: SignalServiceEndpoint
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint
  playlistEditEndpoint?: UntoggledServiceEndpointPlaylistEditEndpoint
}

type ShareEntityServiceEndpoint = {
  serializedShareEntity: string
  commands: CommandElement[]
}

type CommandElement = {
  clickTrackingParams: string
  openPopupAction: CommandOpenPopupAction
}

type CommandOpenPopupAction = {
  popup: FluffyPopup
  popupType: PopupType
  beReused: boolean
}

type FluffyPopup = {
  unifiedSharePanelRenderer: UnifiedSharePanelRenderer
}

type UnifiedSharePanelRenderer = {
  trackingParams: string
  showLoadingSpinner: boolean
}

type SignalServiceEndpoint = {
  signal: Signal
  actions: SignalServiceEndpointAction[]
}

type SignalServiceEndpointAction = {
  clickTrackingParams: string
  addToPlaylistCommand: AddToPlaylistCommand
}

type AddToPlaylistCommand = {
  openMiniplayer: boolean
  videoId: string
  listType: ListType
  onCreateListCommand: OnCreateListCommand
  videoIds: string[]
}

type ListType = 'PLAYLIST_EDIT_LIST_TYPE_QUEUE'

type OnCreateListCommand = {
  clickTrackingParams: string
  commandMetadata: ContinuationEndpointCommandMetadata
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint
}

type CreatePlaylistServiceEndpoint = {
  videoIds: string[]
  params: CreatePlaylistServiceEndpointParams
}

type CreatePlaylistServiceEndpointParams = 'CAQ%3D'

type Signal = 'CLIENT_SIGNAL'

type VideoRendererThumbnailOverlay = {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer
  thumbnailOverlayToggleButtonRenderer?: FluffyThumbnailOverlayToggleButtonRenderer
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayRenderer
  thumbnailOverlayLoadingPreviewRenderer?: ThumbnailOverlayRenderer
}

type FluffyThumbnailOverlayToggleButtonRenderer = {
  isToggled?: boolean
  untoggledIcon: Icon
  toggledIcon: Icon
  untoggledTooltip: UntoggledTooltip
  toggledTooltip: ToggledTooltip
  untoggledServiceEndpoint: ServiceEndpoint
  toggledServiceEndpoint?: ToggledServiceEndpoint
  untoggledAccessibility: Accessibility
  toggledAccessibility: Accessibility
  trackingParams: string
}
