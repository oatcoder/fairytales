import * as cron from 'node-cron'
import { NotesScrapeService } from './notes.scrape.service'
import { NotesService } from './NotesService'

import { INote, INoteScheduledTask } from './types'

export class NotesSchedulerService {
  constructor (private scraperTask: INoteScheduledTask, private clearDuplicateNotesTask: INoteScheduledTask, private notesService: NotesService, private notesScrapeService: NotesScrapeService) {
  }

  startNoteScrapeSchedule (): void {
    if (this.scraperTask && this.scraperTask.isRunning) {
      return
    }

    this.scraperTask = cron.schedule('*/2 * * * *', () => {
      this.scraperTask.isRunning = true

      console.log('notes scrape task started')

      this.notesScrapeService.scrapeNotes()
        .then(this.handleScrapeResult.bind(this))
        .catch(this.handleScrapeError.bind(this))
    })

    this.scraperTask.start()
    this.scraperTask.isRunning = true
  }

  private handleScrapeResult (notes: INote[]) {
    console.log(`notes scrape ran: ${ notes.length }`)

    this.scraperTask.isRunning = false
  }

  private handleScrapeError () {
    this.scraperTask.stop()
    this.scraperTask.isRunning = false

    this.scraperTask.start()
  }

  startClearDuplicateNotesTask () {
    if (this.clearDuplicateNotesTask && this.clearDuplicateNotesTask.isRunning) {
      return
    }

    this.clearDuplicateNotesTask = cron.schedule('*/3 * * * *', () => {
      this.clearDuplicateNotesTask.isRunning = true

      console.log('clear duplicate notes task started')

      this.notesService.clearDuplicateNotes()
        .then(this.handleClearDuplicateNotesResult.bind(this))
        .catch(this.handleClearDuplicateNotesError.bind(this))
    })
  }

  private handleClearDuplicateNotesResult (notes: INote[]) {
    console.log(`notes scrape ran: ${ notes.length }`)

    this.clearDuplicateNotesTask.isRunning = false
  }

  private handleClearDuplicateNotesError () {
    this.clearDuplicateNotesTask.stop()
    this.scraperTask.isRunning = false

    this.scraperTask.start()
  }
}
