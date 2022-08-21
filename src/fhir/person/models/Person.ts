import * as t from 'io-ts'
import { RTTI_code, RTTI_date, RTTI_id, RTTI_uri } from '@ahryman40k/ts-fhir-types/lib/R4'
import {
  PersonGenderKind,
  RTTI_Address, RTTI_Attachment,
  RTTI_ContactPoint,
  RTTI_Element,
  RTTI_Extension,
  RTTI_HumanName,
  RTTI_Meta,
  RTTI_Narrative, RTTI_Person_Link, RTTI_Reference
} from '@ahryman40k/ts-fhir-types/lib/R4/Resource'
import { RTTI_ResourceList } from '@ahryman40k/ts-fhir-types/lib/R4/Union'
import { createEnumType } from '@ahryman40k/ts-fhir-types/lib/EnumType'
import { Identifier } from '../../dataTypes'
import { excess } from '../../combinators'
import { IPerson } from '../../interfaces'

export const Person: t.Type<IPerson> = t.recursion('IPerson', () =>
  excess(
    t.intersection([
      t.type({
        resourceType: t.literal('Person')
      }),
      t.partial({
        id: RTTI_id,
        meta: RTTI_Meta,
        implicitRules: RTTI_uri,
        _implicitRules: RTTI_Element,
        language: RTTI_code,
        _language: RTTI_Element,
        text: RTTI_Narrative,
        contained: t.array(RTTI_ResourceList),
        extension: t.array(RTTI_Extension),
        modifierExtension: t.array(RTTI_Extension),
        identifier: t.array(Identifier),
        name: t.array(RTTI_HumanName),
        telecom: t.array(RTTI_ContactPoint),
        gender: createEnumType<PersonGenderKind>(
          PersonGenderKind,
          'PersonGenderKind'
        ),
        _gender: RTTI_Element,
        birthDate: RTTI_date,
        _birthDate: RTTI_Element,
        address: t.array(RTTI_Address),
        photo: RTTI_Attachment,
        managingOrganization: RTTI_Reference,
        active: t.boolean,
        _active: RTTI_Element,
        link: t.array(RTTI_Person_Link)
      })
    ])
  )
)
