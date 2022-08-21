import { IParam } from './types'

export class Helper {
  public buildParamString (params: IParam[]): string {
    const flatParams = params.join('&')

    return !flatParams ? '' : flatParams
  }

  transformObjToArray (object: any): any[] {
    return Object.keys(object).map(key => {
      return { [key]: object[key] }
    })
  }
}
