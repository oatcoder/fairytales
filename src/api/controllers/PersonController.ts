import { IPerson } from '@ahryman40k/ts-fhir-types/lib/R4'
import { Request, Response } from 'express'
import { PersonService } from '../../fhir'
import { isEmpty } from 'lodash'

export class PersonController {
  constructor (private personService: PersonService) {}

  public newPerson (req: Request, res: Response) {
    try {
      if (isEmpty(req.body)) {
        return res.status(400).json('missing body')
      }

      return this.personService.createPerson(req.body as IPerson)
        .then(data => res.status(200).json({ data }))
        .catch(reason => res.status(500).json({ reason }))
    } catch (e) {
      return res.status(500).json(JSON.parse(e.string))
    }
  }

  public personSearch (req: Request, res: Response) {
    try {
      return this.personService.allPersons()
        .then(data => res.status(200).json({ data }))
        .catch(reason => res.status(500).json({ reason }))
    } catch (e) {
      return res.status(500).json(JSON.parse(e.string))
    }
  }
}
