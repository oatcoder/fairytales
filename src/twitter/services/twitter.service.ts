import { IFirebaseRepository } from '../../io/repositories/firebase/types'
import { ISecurityRepository } from '../../io/repositories/security/types'
import { ITwitterConfig, ITwitterRepository } from '../repositories/types'

const appConfig = require('../../config.json')

enum TweetType {
  Simple = 1,
  Image = 2,
  Media = 3
}

export class TwitterService {
  private twitterConfig: ITwitterConfig

  constructor (private securityRepo?: ISecurityRepository, private firebaseRepo?: IFirebaseRepository, private twitterRepository?: ITwitterRepository) {
    this.twitterConfig = appConfig.twitter
    // this.securityRepo = new sr.SecurityRepository();
    // this.twitterRepo = new tr.TwitterRepository();
    // this.firebaseRepo = new firebaseRepository.FirebaseRepository();
  }

  // public getUserTimeline(): Promise<ITweet[]> {
  //     return this.twitterRepo.get("statuses/user_timeline")
  //         .then((response: ITweet[]) => {
  //             this.getTweetViewsCount(response);
  //             return this.mapTweets(response);
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getHomeTimeline(): Promise<ITweet[]> {
  //     return this.twitterRepo.get("statuses/home_timeline")
  //         .then((response: ITweet[]) => {
  //             this.getTweetViewsCount(response);
  //             return this.mapTweets(response);
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getMentionsTimeline(): Promise<ITweet[]> {
  //     return this.twitterRepo.get("statuses/mentions_timeline")
  //         .then((response: ITweet[]) => {
  //             this.getTweetViewsCount(response);
  //             return this.mapTweets(response);
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getAvailableTrendingLocations(): Promise<ITrendLocation[]> {
  //     return this.twitterRepo.get("trends/available")
  //         .then((response: any) => {
  //             return response;
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getTrendsByLocation(locationId: number): Promise<IPlace[]> {
  //     return this.twitterRepo.get("trends/place", { id: locationId })
  //         .then((response: any) => {
  //             return response;
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getTrendsByLocationLatLong(lat: number, long: number): Promise<ITrendLocation[]> {
  //     return this.twitterRepo.get("trends/closest", [{}])
  //         .then((response: any) => {
  //             return response;
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getCurrentTrends(placeId?: number, qty?: number): Promise<ITrend[]> {
  //     return this.getAvailableTrendingLocations()
  //         .then((trendLocationResponse: ITrendLocation[]) => {
  //             var usPlace = _(trendLocationResponse).find((location: ITrendLocation) => {
  //                 return location.country.toUpperCase() === "UNITED STATES";
  //             });
  //
  //             return usPlace;
  //
  //         }).then((usLocation: ITrendLocation) => {
  //             return this.getTrendsByLocation(usLocation.woeid)
  //                 .then((response: IPlace[]) => {
  //                     var result: ITrend[] = [];
  //
  //                     if (qty) {
  //                         result = _(response[0].trends).take(qty);
  //
  //                     } else {
  //                         result = response[0].trends;
  //                     }
  //
  //                     return result;
  //                 });
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getUserSuggestionCategories(qty?: number): Promise<IUserSuggestionCategory[]> {
  //     return this.twitterRepo.get("users/suggestions")
  //         .then((response: IUserSuggestionCategory[]) => {
  //             var result: any;
  //
  //             if (qty) {
  //                 result = _(response).take(qty);
  //
  //             } else {
  //                 result = response;
  //             }
  //
  //             return result;
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getFollowers(followersReqParams?: IFollowersReqParams, qty?: number): Promise<IFollower[]> {
  //     if (!followersReqParams) {
  //         followersReqParams = {};
  //     }
  //
  //     if (!followersReqParams.screenName) {
  //         followersReqParams.screenName = this.twitterConfig.handle;
  //     }
  //
  //     if (!followersReqParams.cursor) {
  //         followersReqParams.cursor = -1;
  //     }
  //
  //     if (!followersReqParams.includeUserEntities) {
  //         followersReqParams.includeUserEntities = false;
  //     }
  //
  //     if (!followersReqParams.skipStatus) {
  //         followersReqParams.skipStatus = false;
  //     }
  //
  //     return this.twitterRepo.get("followers/list", followersReqParams)
  //         .then((response: any) => {
  //             var result: IFollower[];
  //
  //             if (qty) {
  //                 result = _(response.users).take(qty);
  //
  //             } else {
  //                 result = response.users;
  //             }
  //
  //             const mappedFollowers = _(result).map((f: IFollower) => {
  //                 return <IFollower>{
  //                     name: f.name,
  //                     followersCount: f.followers_count,
  //                     screenName: f.screen_name,
  //                     description: f.description,
  //                     profileImageUrl: f.profile_image_url
  //                 }
  //             });
  //
  //             return mappedFollowers;
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public getBigEffortUser(): Promise<IUser> {
  //     return this.twitterRepo.get("users/show")
  //         .then((response: ItUser) => {
  //             return <IUser>{
  //                 name: response.name,
  //                 screenName: response.screen_name,
  //                 avatarUrl: response.profile_image_url
  //             };
  //
  //         }).catch(this.twitterRepo.handleError.bind(this));
  // }
  //
  // public saveViewCount(tweetId: number): Promise<ITweet> {
  //     return this.firebaseRepo.get(`tweets/${tweetId}`)
  //         .then((reason: ITweet) => {
  //             var count = reason ? reason.viewedCount + 1 : 1;
  //
  //             return this.firebaseRepo.put(`tweets/${tweetId}`, { viewedCount: count })
  //
  //                 .then((reason: any) => {
  //                     return reason;
  //
  //                 }).catch((reason: any) => {
  //                     return reason;
  //                 })
  //
  //         }).catch(this.firebaseRepo.handleError.bind(this));
  // }
  //
  // public getViewCount(tweetId: number): Promise<number> {
  //     return this.firebaseRepo.get(`tweets/${tweetId}`)
  //         .then((reason: ITweet) => {
  //             return reason ? reason.viewedCount : 0;
  //
  //         }).catch(this.firebaseRepo.handleError.bind(this));
  // }
  //
  // private hasPhoto(tweet: ITweet): boolean {
  //     var media = _(tweet.entities.media).find((media: IMedia) => {
  //         return media.type.toUpperCase() === "PHOTO";
  //     });
  //
  //     return media === undefined ? false : true;
  // }
  //
  // private mapTweets(tweets: ITweet[]): ITweet[] {
  //     const mappedResults = _(tweets).map((tweet: ITweet) => {
  //         var hasImage = this.hasPhoto(tweet);
  //         var type: TweetType;
  //
  //         if (hasImage) {
  //             type = TweetType.Image;
  //         }
  //
  //         return <ITweet>{
  //             coordinates: tweet.coordinates,
  //
  //             favorited: tweet.favorited,
  //             truncated: tweet.truncated,
  //             retweeted: tweet.retweeted,
  //             hasImage: hasImage,
  //
  //             createdAt: tweet.created_at,
  //             idStr: tweet.id_str,
  //             inReplyToUserIdStr: tweet.in_reply_to_user_id_str,
  //             text: tweet.text,
  //             inReplyToScreenName: tweet.in_reply_to_screen_name,
  //             source: tweet.source,
  //
  //             entities: tweet.entities,
  //             geo: tweet.geo,
  //             user: tweet.user,
  //
  //             contributors: tweet.contributors,
  //             inReplyToStatusIdStr: tweet.in_reply_to_status_id_str,
  //             id: tweet.id,
  //             place: tweet.place,
  //             inReplyToStatusId: tweet.in_reply_to_status_id,
  //
  //             retweetCount: tweet.retweet_count,
  //             inReplyToUserId: tweet.in_reply_to_user_id,
  //
  //             type: type
  //         }
  //     });
  //
  //     return mappedResults ? mappedResults : [];
  // }
  //
  // private getTweetViewsCount(tweets: ITweet) {
  //     _(tweets).each((tweet: ITweet) => {
  //         this.getViewCount(tweet.id)
  //             .then((val: number) => {
  //                 tweet.viewedCount = val;
  //             });
  //     });
  // }
}
