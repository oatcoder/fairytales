import { Router } from 'express'
import { ShopController, UtilitiesController } from './controllers'
import { IoService } from '../io'

export class Routing {
  public router: Router

  constructor () {
    this.router = Router()

    this.createInfoRoute()
    this.addUtilitiesRoutes()
    this.addShopRoutes()
  }

  private createInfoRoute (): void {
    this.router.get('/info', (req, res) => {
      res.json({ name: 'info', description: 'dev api' })
    })
  }

  private addUtilitiesRoutes (): void {
    const controller = new UtilitiesController(new IoService())

    this.router.post('/utilities/io/merge', (req, res) => controller.postMergeFiles(req, res))
  }

  private addShopRoutes (): void {
    const controller = new ShopController()

    this.router.get('/shop/stats', controller.getStats)
  }
}
