import * as http from 'https'
import * as qs from 'querystring'

import { ITokenResponse } from './types'

export class SecurityRepository {
  // private twitterConfig: ITwitterConfig;

  constructor () {
    // this.twitterConfig = appConfig.twitter;
  }

  public getToken (): Promise<ITokenResponse> {
    // var deferred = defer();
    //
    // var options = {
    //     method: "POST",
    //     url: "https://" + this.twitterConfig.url + this.twitterConfig.tokenUrl,
    //     headers:
    //     {
    //         "cache-control": "no-cache",
    //         "content-type": "application/x-www-form-urlencoded"
    //     },
    //     form:
    //     {
    //         grant_type: this.twitterConfig.grantType,
    //         client_id: this.twitterConfig.consumerKey,
    //         client_secret: this.twitterConfig.consumerSecret
    //     }
    // };
    //
    // request(options, function (error: any, response: any, body: any) {
    //     if (error) {
    //         deferred.reject(error);
    //     }
    //
    //     var bodyJson = JSON.parse(body);
    //
    //     var tokenResponse: ITokenResponse = {
    //         token: {
    //             access_token: bodyJson.access_token,
    //             token_type: bodyJson.token_type
    //         }
    //     };
    //
    //     deferred.resolve(tokenResponse);
    // });
    //
    // return deferred.promise;

    return new Promise<ITokenResponse>(resolve => {
      resolve({})
    })
  }
}
