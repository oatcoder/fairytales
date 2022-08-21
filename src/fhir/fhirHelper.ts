import { isRight } from 'fp-ts/Either'
import { Type } from 'io-ts'

export const isFhirValid = (objectType: Type<any>, data: any) => {
  return isRight(objectType.decode(data))
}
