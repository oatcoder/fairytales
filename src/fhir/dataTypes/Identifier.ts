import * as t from 'io-ts'
import {
  IdentifierUseKind,
  IIdentifier,
  RTTI_CodeableConcept,
  RTTI_Element,
  RTTI_Extension,
  RTTI_Period,
  RTTI_Reference
} from '@ahryman40k/ts-fhir-types/lib/R4/Resource'
import { createEnumType } from '@ahryman40k/ts-fhir-types/lib/EnumType'
import { RTTI_uri } from '@ahryman40k/ts-fhir-types/lib/R4/Scalar'
import { excess } from '../combinators'

export const Identifier: t.Type<IIdentifier> = t.recursion('IIdentifier', () =>
  excess(
    t.partial({
      id: t.string,
      extension: t.array(RTTI_Extension),
      use: createEnumType<IdentifierUseKind>(
        IdentifierUseKind,
        'IdentifierUseKind'
      ),
      _use: RTTI_Element,
      type: RTTI_CodeableConcept,
      system: RTTI_uri,
      _system: RTTI_Element,
      value: t.string,
      _value: RTTI_Element,
      period: RTTI_Period,
      assigner: RTTI_Reference
    })
  )
)
