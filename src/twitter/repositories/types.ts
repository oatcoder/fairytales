export interface ITwitterConfig {
  url?: string
  version?: string
  tokenUrl?: string
  consumerKey?: string
  consumerSecret?: string
  accessToken?: string
  accessTokenSecret?: string
  grantType?: string
  handle?: string
  handleId?: number
}

export interface ITwitterRepository {
  handleError<T> (reason: any): Promise<T>

  get<T> (url: string, params?: any): Promise<T>
}
