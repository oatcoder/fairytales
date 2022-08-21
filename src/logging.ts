import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'API' },
  transports: [ new transports.Console() ]
})
