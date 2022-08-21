import { IFile } from './types'
import * as fs from 'fs'
import * as _ from 'lodash'
import * as t from 'io-ts'
import { either, Either, isRight, left, right, Right } from 'fp-ts/lib/Either'
import { ExcessType } from '../ExcessType'

const PdfMerge = require('pdf-merge')

const getIsCodec = <T extends t.Any> (tag: string) => (codec: t.Any): codec is T => (codec as any)._tag === tag
const isInterfaceCodec = getIsCodec<t.InterfaceType<t.Props>>('InterfaceType')
const isPartialCodec = getIsCodec<t.PartialType<t.Props>>('PartialType')

export class IoService {
  public mergeFiles (files: string[], outputName: string, outputPath: string): IFile {
    let validFiles: string[] = []

    _.forEach(files, f => {
      if (fs.existsSync(f)) {
        validFiles.push(f)
      }
    })

    return PdfMerge(validFiles, { output: `${ outputPath }/${ outputName }.pdf` })
      .then((buffer: any) => {
        return {
          name: 'test',
          data: {}
        } as IFile
      }).catch((e: any) => {
        return {
          name: 'test',
          data: {}
        } as IFile
      })
  }

  private getProps (codec: t.HasProps): t.Props {
    switch (codec._tag) {
      case 'RefinementType':
      case 'ReadonlyType':
        return this.getProps(codec.type)
      case 'InterfaceType':
      case 'StrictType':
      case 'PartialType':
        return codec.props
      case 'IntersectionType':
        return codec.types.reduce<t.Props>((props, type) => Object.assign(props, this.getProps(type)), {})
    }
  }

  private getNameFromProps = (props: t.Props): string => Object.keys(props).map((k) => `${ k }: ${ props[k].name }`).join(', ')

  private getPartialTypeName = (inner: string): string => `Partial<${ inner }>`

  private getExcessTypeName = (codec: t.Any): string => {
    if (isInterfaceCodec(codec)) {
      return `{| ${ this.getNameFromProps(codec.props) } |}`
    }
    if (isPartialCodec(codec)) {
      return this.getPartialTypeName(`{| ${ this.getNameFromProps(codec.props) } |}`)
    }
    return `Excess<${ codec.name }>`
  }

  private stripKeys = <T = any> (o: T, props: t.Props): Either<Array<string>, T> => {
    const keys = Object.getOwnPropertyNames(o)
    const propsKeys = Object.getOwnPropertyNames(props)

    propsKeys.forEach((pk) => {
      const index = keys.indexOf(pk)
      if (index !== - 1) {
        keys.splice(index, 1)
      }
    })

    return keys.length
      ? left(keys)
      : right(o)
  }

  public excess = <C extends t.HasProps> (codec: C, name: string = this.getExcessTypeName(codec)): ExcessType<C> => {
    const props: t.Props = this.getProps(codec)

    return new ExcessType<C>(
      name,
      (u): u is C => isRight(this.stripKeys(u, props)) && codec.is(u),
      (u, c) => either.chain(
        t.UnknownRecord.validate(u, c),
        () => either.chain(
          codec.validate(u, c),
          (a) => either.mapLeft(
            this.stripKeys<C>(a, props),
            (keys) => keys.map((k) => ({
              value: a[k],
              context: c,
              message: `excess key "${ k }" found`
            }))
          )
        )
      ),
      (a) => codec.encode((this.stripKeys(a, props) as Right<any>).right),
      codec
    )
  }
}
