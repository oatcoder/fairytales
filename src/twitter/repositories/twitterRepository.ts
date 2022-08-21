import { Helper } from '../../io/common/helper'
import { ISecurityRepository } from '../../io/repositories/security/types'
import { ITwitterConfig } from './types'

const twitter = require('twitter')
const appConfig = require('../config.json')

export class TwitterRepository {
  private helpter: Helper
  private twtr: any
  private twitterConfig: ITwitterConfig

  constructor (private securityRepo?: ISecurityRepository) {
    this.twitterConfig = appConfig.twitter

    this.helpter = new Helper()
    // this.securityRepo = new sr.SecurityRepository();

    this.twtr = new twitter({
      consumer_key: this.twitterConfig.consumerKey,
      consumer_secret: this.twitterConfig.consumerSecret,
      access_token_key: this.twitterConfig.accessToken,
      access_token_secret: this.twitterConfig.accessTokenSecret
    })
  }

  public handleError<T> (reason: any): Promise<T> {
    // todo: add error handling
    return Promise.reject(reason)
  }

  public get<T> (url: string, params?: any): Promise<T> {
    return new Promise<T>((resolve: any, reject: any) => {
      if (!params) {
        this.twtr.get(url, { screen_name: this.twitterConfig.handle }, (e: any, t: any, r: any) => {
          if (!e) {
            resolve(t)
          }

          reject(e)
        })

      } else {
        this.twtr.get(url, params, (e: any, t: any, r: any) => {
          if (!e) {
            resolve(t)
          }

          reject(e)
        })
      }
    })
  }
}
