import { IKeepConfig } from '../../notes/services'
import { ITwitterConfig } from '../../twitter/repositories/types'
import { IFirebaseConfig } from '../repositories/firebase/types'

export interface IParam {
  id: string
  val: string
}

export interface IHelper {
  buildParamString: (params: IParam[]) => string
  buildRandomNonce: () => string

  transformObjToArray (object: any): any[]
}

export interface IConfig {
  twitter?: ITwitterConfig
  firebase?: IFirebaseConfig
  keep?: IKeepConfig
}

export interface IAddress {
  address1?: string
  address2?: string
  city?: string
  state?: string

  zip?: number
}

export interface IBase {
  id?: number

  token?: string
  createdBy?: string
  modfiedBy?: string

  isDeleted?: boolean
  isEnabled?: boolean

  createdDate?: Date
  modifiedDate?: Date
}
