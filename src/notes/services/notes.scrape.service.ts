import { ElementHandle, launch, Page } from 'puppeteer'
import { IConfig } from '../../io'
import { NotesClearQueueService } from './notes.clear.queue.service'
import { ILoginConfig, INote, NoteSelector } from './types'
import { NotesService } from './NotesService'
import { logger } from '../../logging'

const config = require('../../config.json') as IConfig

export class NotesScrapeService {
  private keepUrl = 'https://keep.google.com'

  constructor (private loginConfig: ILoginConfig, private notesService: NotesService, private notesClearQueueService: NotesClearQueueService) {
  }

  public async getTitle (page: Page, elementHandle: ElementHandle | null): Promise<string> {
    if (elementHandle) {
      const titleValue = await page.evaluateHandle(h => {
        return h.innerHTML
      }, elementHandle)

      const titleJson = await titleValue.jsonValue()

      return titleJson || titleValue
    } else {
      // TODO: REMOVE
      logger.warn('missing title handle')

      return ''
    }
  }

  public async getBody (page: Page, elementHandle: ElementHandle | null): Promise<string> {
    if (elementHandle) {
      const bodyValue = await page.evaluateHandle(h => {
        return h.innerHTML
      }, elementHandle)

      const bodyJson = await bodyValue.jsonValue()

      return bodyJson || bodyValue
    } else {
      logger.warn('missing content')

      return ''
    }
  }

  async scrapeNotes (): Promise<INote[]> {
    const notes: INote[] = []

    try {
      const browser = await launch({ headless: false })

      const page = await browser.newPage()

      await page.goto(this.keepUrl, { waitUntil: 'networkidle0' })

      await this.login(page)

      await page.evaluate(args => {
        // window.scrollTo(0, document.body.scrollHeight)
        //
        // window.scrollTo(0, document.body.scrollHeight)

        return
      })

      await page.waitFor(3000)

      const elementHandles = await page.$$(NoteSelector.NoteSelector)

      if (!elementHandles) {
        return notes
      }

      for (const elementHandle of elementHandles) {
        const note = {
          title: '',
          content: ''
        } as INote

        const titleHandle = await elementHandle.$(NoteSelector.TitleSelector)

        note.title = await this.getTitle(page, titleHandle)

        const bodyHandle = await elementHandle.$(NoteSelector.BodySelector)

        note.content = await this.getBody(page, bodyHandle)

        notes.push(note)
      }

      await browser.close()

      await this.saveNotes(notes)
    } catch (err) {
      return Promise.reject(err)
    }

    return notes
  }

  private async login (page: Page): Promise<boolean> {
    if (!this.loginConfig) {
      return false
    }

    if (!this.loginConfig.username || !this.loginConfig.password) {
      return false
    }

    await page.focus('#identifierId')

    await page.waitFor(1000)

    await page.type('#identifierId', this.loginConfig.username, { delay: 150 })

    await page.click(NoteSelector.IdentifierNext)

    await page.waitForSelector('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')

    await page.focus('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')

    await page.waitFor(1000)

    await page.type('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', this.loginConfig.password, { delay: 150 })

    await page.click(NoteSelector.PasswordNext)

    await page.waitForSelector(NoteSelector.NoteSelector)

    return true
  }

  private async saveNotes (notes: INote[]) {
    for (const note of notes) {
      const existingByTitle = await this.notesService.getNote([ { title: note.title } ])

      if (existingByTitle?.identifier) {
        await this.notesService.updateNote(existingByTitle.identifier, note)

        continue
      }

      const existingByContent = this.notesService.getNote([ { content: note.content } ])

      if (existingByContent) {
        this.notesClearQueueService.add(note)
      } else {
        await this.notesService.saveNote(note)
      }
    }
  }
}
