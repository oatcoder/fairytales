import { isEmpty, isNull, isUndefined, isArray, get } from 'lodash'
import { Request, Response } from 'express'
import { Helper } from '../io/common/helper'
import { INote, NotesSchedulerService, NotesScrapeService, NotesService } from './services'

export class NotesController {
  constructor (private notesService: NotesService, private notesSchedulerService: NotesSchedulerService, private notesScrapeService: NotesScrapeService) {
    // TODO: ENABLE
    // NotesController.startTasks();
  }

  postNote (req: Request, res: Response) {
    try {
      if (isEmpty(req.body)) {
        res.status(500).json('Missing Body Content!')

        return
      }

      const note: INote = {
        title: req.body.title ? req.body.title : '',
        content: req.body.content ? req.body.content : ''
      }

      this.notesService.saveNote(note)
        .then(value => {
          res.status(201).json(value)
        })
        .catch(reason => {
          res.status(500).json(reason.message)
        })
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  getNotesQuantity (req: Request, res: Response) {
    try {
      this.notesService.getNotesQuantity().then(v => {
        res.json(v)
      }).catch(e => {
        res.status(500).json(e)
      })
    } catch (e) {
      res.status(500).json(e)
    }
  }

  getNote (req: Request, res: Response) {
    try {
      const id = NotesController.getIdFromRequest(req)

      this.notesService.getNoteForID(id)
        .then(value => {
          res.status(404).json(value)
        })
        .catch(reason => {
          res.json(reason)
        })
    } catch (e) {
      res.status(500).json(e)
    }
  }

  getNotes (req: Request, res: Response) {
    try {
      if (isEmpty(req.query)) {
        res.status(500).json('missing query!')

        return
      }
      const helper = new Helper()

      const params = helper.transformObjToArray(req.query)

      this.notesService.getNote(params)
        .then(value => {
          if (isNull(value)) {
            res.status(404).json(value)
          } else {
            res.json(value)
          }
        })
        .catch(error => {
          res.status(500).json(error.message)
        })
    } catch (e) {
      res.status(500).json(e)
    }
  }

  getAllNotes (req: Request, res: Response) {
    try {
      this.notesService.getNotes()
        .then(value => {
          if (isNull(value)) {
            res.status(404).json(value)
          } else {
            res.json(value)
          }
        })
        .catch(error => {
          res.status(500).json(error.message)
        })
    } catch (e) {
      res.status(500).json(e)
    }
  }

  putNote (req: Request, res: Response) {
    try {
      const id = NotesController.getIdFromRequest(req)

      if (isUndefined(id)) {
        res.status(500).json('Missing id')
        return
      }

      const note: INote = NotesController.mapToNote(req.body)

      if (isEmpty(note)) {
        res.status(500).json('Note object is empty!')
        return
      }

      this.notesService.updateNote(id, note)
        .then(value => {
          res.status(202).json(value)
        })
        .catch(reason => {
          res.status(500).json(reason.message)
        })
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  putNotes (req: Request, res: Response) {
    try {
      if (!isArray(req.body)) {
        res.status(500).json('Missing array of objects')
        return
      }

      const notes = []

      for (const data of req.body) {
        const note = NotesController.mapToNote(data)

        if (!isEmpty(note)) {
          notes.push(note)
        }
      }

      if (isEmpty(notes)) {
        res.status(500).json('Missing array of objects')

        return
      }

      this.notesService.updateNotes(notes)
        .then(value => {
          res.status(202).json(value)
        })
        .catch(reason => {
          res.status(500).json(reason.message)
        })
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  deleteNote (req: Request, res: Response) {
    try {
      const noteId = get(req.body, 'id')

      this.notesService.deleteNote(noteId)
        .then(value => {
          if (value) {
            res.status(200).json('Note Deleted.')
          } else {
            res.status(417).json('Note not Deleted.')
          }
        })
        .catch(reason => {
          res.status(500).json(reason.message)
        })
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  scrape (req: Request, res: Response) {
    try {
      this.notesScrapeService.scrapeNotes()
        .then((value: any) => {
          res.status(200).json(value)
        })
        .catch((reason: any) => {
          res.status(500).json(`scrape failed! ${ reason.message }`)
        })
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  private startTasks () {
    this.notesSchedulerService.startNoteScrapeSchedule()
    this.notesSchedulerService.startClearDuplicateNotesTask()
  }

  private static getIdFromRequest (req: Request): string {
    if (!isEmpty(req.params)) {
      return get(req.params, 'id')
    }

    return ''
  }

  private static mapToNote (value: any): INote {
    const note: INote = {}

    if (!isUndefined(value.title)) {
      note.title = value.title
    }

    if (!isUndefined(value.content)) {
      note.content = value.content
    }

    return note
  }
}
