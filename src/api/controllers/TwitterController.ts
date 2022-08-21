import * as http from 'http'
import * as url from 'url'
import * as express from 'express'

export class TwitterController {
  // public getUserTimeline(req: express.Request, res: express.Response) {
  //     try {
  //         var twitterService = new ts.TwitterService();
  //
  //         twitterService.getUserTimeline()
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((error: any) => {
  //             res.json(error);
  //         });
  //
  //     } catch (error) {
  //         res.json(error);
  //     }
  // }
  //
  // public getImages(req: express.Request, res: express.Response) {
  //     let req2 = http.get(url.parse(req.query["url"]), urlMessage => {
  //         let text = "";
  //
  //         urlMessage.on("data", (chunk: string) => {
  //             text += chunk;
  //         });
  //
  //         urlMessage.on("end", () => {
  //             const imageTagRegEx = /<img[^>]+src=[\"\']([^\'\"]+)[\"\']/g;
  //
  //             let match: RegExpMatchArray;
  //             let matches: string[] = [];
  //             while (match = imageTagRegEx.exec(text)) {
  //                 matches.push(match[1]);
  //             }
  //
  //             res.write(JSON.stringify(matches));
  //             res.end();
  //         });
  //
  //     }).on("error", function (a, e) {
  //         console.log(e);
  //     });
  // }
  //
  // public getMentionsTimeline(req: express.Request, res: express.Response): void {
  //     try {
  //         var twitterService = new ts.TwitterService();
  //
  //         twitterService.getMentionsTimeline()
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((e: any) => {
  //             res.json(e);
  //         });
  //
  //     } catch (error) {
  //         res.json(error);
  //     }
  // }
  //
  // public getHomeTimeline(req: express.Request, res: express.Response) {
  //     try {
  //         var twitterService = new ts.TwitterService();
  //
  //         twitterService.getHomeTimeline()
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((e: any) => {
  //             res.json(e);
  //         });
  //
  //     } catch (error) {
  //         res.json(error);
  //     }
  // }
  //
  // public getTrending(req: express.Request, res: express.Response) {
  //     try {
  //         var twitterService = new ts.TwitterService();
  //
  //         twitterService.getCurrentTrends(parseInt(req.query["placeId"]), parseInt(req.query["qty"]))
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((e: any) => {
  //             res.json(e);
  //         });
  //
  //     } catch (error) {
  //         res.json(error.message);
  //     }
  // }
  //
  // public getUserSuggestions(req: express.Request, res: express.Response) {
  //     try {
  //         var twitterService = new ts.TwitterService();
  //
  //         twitterService.getUserSuggestionCategories(parseInt(req.query["qty"]))
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((e: any) => {
  //             res.json(e);
  //         });
  //
  //     } catch (error) {
  //         res.json(error.message);
  //     }
  // }
  //
  // public getFollowers(req: express.Request, res: express.Response) {
  //     try {
  //         var twitterService = new ts.TwitterService();
  //
  //         twitterService.getFollowers()
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((e: any) => {
  //             res.json(e);
  //         });
  //
  //     } catch (error) {
  //         res.json(error.message);
  //     }
  // }
  //
  // public getUser(req: express.Request, res: express.Response) {
  //     try {
  //         var twitterService = new ts.TwitterService();
  //
  //         /**todo: check if its not the bif effort user */
  //
  //         twitterService.getBigEffortUser()
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((e: any) => {
  //             res.json(e);
  //         });
  //
  //     } catch (error) {
  //         res.json(error.message);
  //     }
  // }
  //
  // public putViewedCount(req: express.Request, res: express.Response) {
  //     try {
  //         var service = new ts.TwitterService();
  //
  //         var params = <Controllers.Twitter.Models.IParams>req.params;
  //
  //         service.saveViewCount(params.tweetId)
  //             .then((response: any) => {
  //                 res.json(response);
  //
  //             }).catch((e: any) => {
  //             res.json(e);
  //         })
  //
  //     } catch (error) {
  //         res.json(error.message);
  //     }
  // }
  //
  // public getViewedCount(req: express.Request, res: express.Response) {
  //     try {
  //         var params = <ITwitterParams>req.params;
  //
  //         if (params && (params.tweetId && params.tweetId != 0)) {
  //             var service = new ts.TwitterService();
  //
  //             service.getViewCount(params.tweetId)
  //                 .then((response: any) => {
  //                     res.json(response);
  //                 });
  //
  //         } else {
  //             res.status(400).send("tweetId missing!");
  //         }
  //
  //     } catch (error) {
  //         res.json(error.message);
  //     }
  // }
}
