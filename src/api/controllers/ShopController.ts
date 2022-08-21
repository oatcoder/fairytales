import { Request, Response } from 'express'
import { IStats } from '../models'

export class ShopController {
  public getStats (req: Request, res: Response) {
    try {
      res.json({ name: 'shop', description: 'Shopping' } as IStats)
    } catch (e) {
      res.json(e)
    }
  }
}
