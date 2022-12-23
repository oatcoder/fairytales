import { json, urlencoded } from 'body-parser'
import express, { Application, NextFunction, Request, Response } from 'express'
import { logger } from '../logging'
import { Routing } from './Routing'
import cors from 'cors'

export class Api {
  public instance: Application

  constructor () {
    this.instance = express()

    this.setMisc()
    this.setRouting()
  }

  private setRouting (): void {
    this.instance.all('/*', (req: Request, res: Response, next: NextFunction) => {
      if (req.method === 'OPTIONS') {
        res.status(200).end()
      } else {
        next()
      }

      logger.info('Request', { data: req.header('User-Agent') })
    })

    this.instance.use('/', new Routing().router)

    // route not found
    this.instance.use((req: Request, res: Response) => {
      res.status(404).send('route not found!')
    })

    this.instance.use((err: Error, req: Request, res: Response) => {
      res.status(400).json(err.message)
    })
  }

  private setMisc (): void {
    this.instance.set('view options', { layout: false })
    this.instance.use(urlencoded({ extended: true }))
    this.instance.use(json())
    this.instance.use(cors())
  }
}
