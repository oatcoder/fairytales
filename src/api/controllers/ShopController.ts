import { Request, Response } from 'express'

export class ShopController {
  public getStats (req: Request, res: Response): void {
    try {
      res.json({ name: 'shop', description: 'Shopping' })
    } catch (e) {
      res.json(e)
    }
  }
}
