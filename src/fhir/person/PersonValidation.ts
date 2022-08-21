import { NextFunction, Request, Response } from 'express'
import { logger } from '../../logging'
import { isEmpty, some, get } from 'lodash'
import { isFhirValid } from '../fhirHelper'
import { Person } from './models'

export class PersonValidation {
  public ValidateBody (req: Request, res: Response, next: NextFunction) {
    if (isEmpty(req.body)) return next()

    logger.info('Validating Fhir Schema on Request Body', { data: req.body })

    if (!isFhirValid(Person, req.body)) {
      return res.status(400).json({ error: 'Schema Error' })
    }

    next()
  }

  public CheckRequiredFieldsForNew (req: Request, res: Response, next: NextFunction) {
    if (isEmpty(req.body)) return next()

    const errorResponse = { error: 'missing required fields' }

    logger.info('Checking Required Fields', { data: req.body })

    if (!this.hasRequiredTelecomFields(req.body)) {
      return res.status(400).json(errorResponse)
    }

    next()
  }

  public hasRequiredTelecomFields (data: any): boolean {
    const telecomList: any[] = get(data, 'telecom', [])

    if (isEmpty(telecomList)) return false

    return some(telecomList, (item) => {
      if (isEmpty(item.system) || isEmpty(item.value)) return false

      return item.system === 'email' && !isEmpty(item.value)
    })
  }

  public hasRequiredTzCodeExtension (data: any): boolean {
    const extensions: any[] = get(data, 'extension', [])

    if (isEmpty(extensions)) return false

    return some(extensions, item => {
      if (isEmpty(item.url) || isEmpty(item.valueCode)) return false

      return item.url.includes('tz-code') && !isEmpty(item.valueCode)
    })
  }

  public hasHealthPlanExtension (data: any): boolean {
    const extensions: any[] = get(data, 'extension', [])

    if (isEmpty(extensions)) return false

    return some(extensions, (item) => {
      if (isEmpty(item.url) || isEmpty(item.valueCodeableConcept)) return false

      if (!item.url.includes('person-healthPlan')) return false

      if (isEmpty(item.valueCodeableConcept.coding)) return false

      const codingList: any[] = item.valueCodeableConcept.coding

      return some(codingList, coding => {
        return !isEmpty(coding.system) && !isEmpty(coding.code) && !isEmpty(coding.display)
      })
    })
  }
}
