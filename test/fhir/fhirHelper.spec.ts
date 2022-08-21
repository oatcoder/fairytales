import { ok } from 'assert'
import { isFhirValid } from '../../src/fhir'
import { R4 } from '@ahryman40k/ts-fhir-types'

describe('fhirHelper', () => {
  describe('isFhirInvalid function', () => {
    it('should return false', () => {
      ok(isFhirValid(R4.RTTI_Person, {
        'active': true,
        'resourceType': 'Person',
        'fakeField': 'mockdata'
      }))
    })
  })
})
