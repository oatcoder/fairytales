export interface ICoordinates {
  coordinates: number[]
  type: string
}

export interface IHashtag {
  text: string
  indices: number[]
}

export interface IUserMention {
  name: string
  id_str: string
  id: number
  indices: number[]
  screen_name: string
}

export interface IMedia {
  display_url: string
  expanded_url: string
  id: number
  id_str: string
  indices: any[]
  media_url: string
  media_url_https: string
  sizes: any[]
  type: string
  url: string
}

export interface IEntities {
  urls: any[]
  hashtags: IHashtag[]
  user_mentions: IUserMention[]
  media: IMedia[]
}

export interface IGeo {
  coordinates: number[]
  type: string
}

export interface IUrl2 {
  expanded_url?: any
  url: string
  indices: number[]
}

export interface Url {
  urls: IUrl2[]
}

export interface IDescription {
  urls: any[]
}

export interface IEntities2 {
  url: Url
  description: IDescription
}

export interface ItUser {
  profile_sidebar_fill_color: string
  profile_sidebar_border_color: string
  profile_background_tile: boolean
  name: string
  profile_image_url: string
  created_at: string
  location: string
  follow_request_sent: boolean
  profile_link_color: string
  is_translator: boolean
  id_str: string
  entities: IEntities2
  default_profile: boolean
  contributors_enabled: boolean
  favourites_count: number
  url: string
  profile_image_url_https: string
  utc_offset: number
  id: number
  profile_use_background_image: boolean
  listed_count: number
  profile_text_color: string
  lang: string
  followers_count: number
  protected: boolean
  notifications?: any
  profile_background_image_url_https: string
  profile_background_color: string
  verified: boolean
  geo_enabled: boolean
  time_zone: string
  description: string
  default_profile_image: boolean
  profile_background_image_url: string
  statuses_count: number
  friends_count: number
  following?: any
  show_all_inline_media: boolean
  screen_name: string
}

export interface IUser {
  name?: string
  avatarUrl?: string
  screenName?: string
}

export interface ItTweet {
  coordinates?: ICoordinates

  favorited?: boolean
  truncated?: boolean
  retweeted?: boolean
  hasMedia?: boolean

  created_at?: string
  id_str?: string
  in_reply_to_user_id_str?: string
  text?: string
  in_reply_to_screen_name?: string
  source?: string

  entities?: IEntities
  geo?: IGeo
  user?: IUser

  contributors?: any
  in_reply_to_status_id_str?: any
  id?: any
  place?: any
  in_reply_to_status_id?: any

  retweet_count?: number
  in_reply_to_user_id?: number
}

export interface ITweet extends ItTweet {
  coordinates?: ICoordinates

  favorited?: boolean
  truncated?: boolean
  retweeted?: boolean
  hasMedia?: boolean
  hasImage?: boolean

  createdAt?: string
  idStr?: string
  inReplyToUserIdStr?: string
  text?: string
  inReplyToScreenName?: string
  source?: string

  entities?: IEntities
  geo?: IGeo
  user?: IUser

  contributors?: any
  inReplyToStatusIdStr?: any
  id?: any
  place?: any
  inReplyToStatusId?: any

  retweetCount?: number
  inReplyToUserId?: number
  viewedCount?: number

  type?: any
}

export interface IUserTimelineResponse {
  tweets?: ITweet[]
}

export interface ITimelineResponse {
  tweets?: ITweet[]
}

export interface IHomeTimeResponse {
  tweets?: ITweet[]
}

export interface IMentionsTimelineResponse {
  tweets?: ITweet[]
}

export interface IPlaceType {
  code: number
  name: string
}

export interface ITrendLocation {
  country?: string
  countryCode?: string
  name?: string
  parentid?: number
  placeType: IPlaceType
  url?: string
  woeid?: number
}

export interface ITrend {
  tweet_volume: number
  events: any
  name: string
  promoted_content: any
  query: string
  url: string
}

export interface IPlace {
  asOf: Date
  createdAt: Date
  locations: ITrendLocation[],
  trends: ITrend[]
}

export interface ItPlace {
  as_of: Date
  created_at: Date
  locations: ITrendLocation[],
  trends: ITrend[]
}

export interface IUserSuggestionCategory {
  name: string
  slug: string
  size: number
}

export interface IFollower extends ItFollower {
  name: string
  screenName: string
  description: string
  profileImageUrl: string

  followersCount: number
}

export interface IFollwersReqParams {
  cursor?: number
  screenName?: string
  skipStatus?: boolean
  includeUserEntities?: boolean
}

export interface ItFollower {
  id: number

  id_str: string
  name: string
  screen_name: string

  location: string
  profile_location?: any
  url?: any
  description: string
  protected: boolean

  followers_count: number
  friends_count: number
  listed_count: number
  created_at: string
  favourites_count: number
  utc_offset?: any
  time_zone?: any
  geo_enabled: boolean
  verified: boolean
  statuses_count: number
  lang: string
  contributors_enabled: boolean
  is_translator: boolean
  is_translation_enabled: boolean
  profile_background_color: string
  profile_background_image_url: string
  profile_background_image_url_https: string
  profile_background_tile: boolean
  profile_image_url: string
  profile_image_url_https: string
  profile_link_color: string
  profile_sidebar_border_color: string
  profile_sidebar_fill_color: string
  profile_text_color: string
  profile_use_background_image: boolean
  default_profile: boolean
  default_profile_image: boolean
  following: boolean
  follow_request_sent: boolean
  notifications: boolean
  muting: boolean
}
