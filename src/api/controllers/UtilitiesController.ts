import { Response, Request } from 'express'
import { IoService } from '../../io'

export class UtilitiesController {
  constructor (private ioService: IoService) {
  }

  postMergeFiles (req: Request, res: Response) {
    try {
      const r = this.ioService.mergeFiles([
        '/home/noelmelendez/Downloads/lt jan.pdf',
        '/home/noelmelendez/Downloads/lt feb.pdf',
        '/home/noelmelendez/Downloads/lt mar.pdf',
        '/home/noelmelendez/Downloads/lt apr.pdf',
        '/home/noelmelendez/Downloads/lt may.pdf',
        '/home/noelmelendez/Downloads/lt jun.pdf',
        '/home/noelmelendez/Downloads/lt jul.pdf',
        '/home/noelmelendez/Downloads/lt aug.pdf',
        '/home/noelmelendez/Downloads/lt sept.pdf',
        '/home/noelmelendez/Downloads/lt oct.pdf',
        '/home/noelmelendez/Downloads/lt nov.pdf',
        '/home/noelmelendez/Downloads/lt dec.pdf'
      ], 'mergedfiles', 'temp')

      res.json(r)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}
