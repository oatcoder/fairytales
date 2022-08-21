import { ok } from 'assert'
import { PersonValidation } from '../../../src/fhir/person'

describe('PersonValidation', () => {
  describe('hasRequiredTelecomFields function', () => {
    let service: PersonValidation

    before(() => {
      service = new PersonValidation()
    })

    it('should return false when fields are missing', () => {
      const dataStub = {
        'active': true,
        'resourceType': 'Person',
        'language': 'en',
        'telecom': [
          {
            'use': 'home'
          },
          {
            'system': 'phone',
            'value': '(03) 5555 6473',
            'use': 'work',
            'rank': 1
          }
        ]
      }

      ok(!service.hasRequiredTelecomFields(dataStub))
    })

    it('should return true when fields are missing', () => {
      const dataStub = {
        'active': true,
        'resourceType': 'Person',
        'language': 'en',
        'telecom': [
          {
            'use': 'home'
          },
          {
            'system': 'phone',
            'value': '(03) 5555 6473',
            'use': 'work',
            'rank': 1
          },
          {
            'system': 'email',
            'value': 'p.heuvel@gmail.com',
            'use': 'home'
          }
        ]
      }

      ok(service.hasRequiredTelecomFields(dataStub))
    })
  })

  describe('hasRequiredTzCodeExtension function', () => {
    let service: PersonValidation

    before(() => {
      service = new PersonValidation()
    })

    it('should false', () => {
      const dataStub = {
        'extension': [
          {
            'url': 'http://hl7.org/fhir/StructureDefinition/person-hasFriends',
            'valueBoolean': false
          }
        ]
      }

      ok(!service.hasRequiredTzCodeExtension(dataStub))
    })

    it('should true', () => {
      const dataStub = {
        'extension': [
          {
            'url': 'http://hl7.org/fhir/StructureDefinition/tz-code',
            'valueCode': 'America/Chicago'
          },
          {
            'url': 'http://hl7.org/fhir/StructureDefinition/person-hasFriends',
            'valueBoolean': false
          }
        ]
      }

      ok(service.hasRequiredTzCodeExtension(dataStub))
    })
  })

  describe('hasHealthPlanExtension function', () => {
    let service: PersonValidation

    before(() => {
      service = new PersonValidation()
    })

    it('should return false when the extension is missing', () => {
      const dataStub = {
        'extension': [
          {
            'url': 'http://hl7.org/fhir/StructureDefinition/person-hasFriends',
            'valueBoolean': false
          }
        ]
      }

      ok(!service.hasHealthPlanExtension(dataStub))
    })

    it('should return false when the extension is missing coding', () => {
      const dataStub = {
        'extension': [
          {
            'url': 'http://hl7.org/fhir/StructureDefinition/person-healthPlan',
            'valueCodeableConcept': {}
          }
        ]
      }

      ok(!service.hasHealthPlanExtension(dataStub))
    })

    it('should return false when the extension is invalid', () => {
      const dataStub = {
        'extension': [
          {
            'url': 'http://hl7.org/fhir/StructureDefinition/person-healthPlan',
            'valueCodeableConcept': {
              'coding': [
                {
                  'system': 'http://hl7.org/fhir/health-plan',
                  'display': 'mock name'
                }
              ]
            }
          }
        ]
      }

      ok(!service.hasHealthPlanExtension(dataStub))
    })

    it('should return true when the extension is valid', () => {
      const dataStub = {
        'extension': [
          {
            'url': 'http://hl7.org/fhir/StructureDefinition/person-healthPlan',
            'valueCodeableConcept': {
              'coding': [
                {
                  'system': 'http://hl7.org/fhir/health-plan',
                  'code': 'mockcode',
                  'display': 'mock name'
                }
              ]
            }
          }
        ]
      }

      ok(service.hasHealthPlanExtension(dataStub))
    })
  })
})
