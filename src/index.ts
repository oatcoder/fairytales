import { Api } from './api'
import { logger } from './logging'

const port = process.env.PORT || '3001'

new Api().instance.listen(port, () => {
  logger.info(`api listening on ${ port }`)
  return true
})
