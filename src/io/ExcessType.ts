import { Type, Any } from 'io-ts'

export class ExcessType<C extends Any, A = C['_A'], O = A, I = unknown> extends Type<A, O, I> {
  public readonly _tag: 'ExcessType' = 'ExcessType'

  public constructor (
    name: string,
    is: ExcessType<C, A, O, I>['is'],
    validate: ExcessType<C, A, O, I>['validate'],
    encode: ExcessType<C, A, O, I>['encode'],
    public readonly type: C
  ) {
    super(name, is, validate, encode)
  }
}
