import { ScheduledTask } from 'node-cron'

export interface ILoginConfig {
  username?: string
  password?: string
}

export interface INote {
  identifier?: string
  title?: string
  content?: string
}

export interface IKeepConfig {
  auth: ILoginConfig
}

export const enum NoteSelector {
  NoteSelector = 'div.IZ65Hb-n0tgWb.RNfche',
  TitleSelector = 'div.IZ65Hb-YPqjbf.r4nke-YPqjbf',
  BodySelector = '.h1U9Be-YPqjbf',
  IdentifierNext = '#identifierNext',
  PasswordNext = '#passwordNext'
}

export interface INoteScheduledTask extends ScheduledTask {
  isRunning?: boolean
}
