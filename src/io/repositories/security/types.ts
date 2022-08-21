export interface IToken {
  token_type?: string
  access_token?: string
}

export interface ITokenResponse {
  token?: IToken
}

export interface ISecurityRepository {
  getToken<T> (): Promise<T>
}
