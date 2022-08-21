import { map, forEach } from 'lodash'
import { ICollectionFilter, Identifier, NotesRepository, Store } from '../repository'
import { INote } from './types'

export class NotesService {
  public constructor (private notesRepository: NotesRepository) {
  }

  async getNotesQuantity (): Promise<number> {
    return this.getNotes().then(notes => {
      return notes.length
    })
  }

  async saveNote (note: INote): Promise<INote> {
    return this.notesRepository.save(Store.notes, note)
  }

  async saveNotes (notes: INote[]): Promise<INote[]> {
    return this.notesRepository.saveMany(Store.notes, notes)
  }

  async getNote (noteQueryOptions: any[]): Promise<INote> {
    const filters = map(noteQueryOptions, option => {
      const out: ICollectionFilter = {}

      forEach(option, (value, key) => {
        out.key = key
        out.value = value
      })

      return out
    })

    return this.notesRepository.get(Store.notes, filters)
  }

  async getNoteForID (id: string): Promise<INote> {
    return this.notesRepository.get(Store.notes, new Identifier(id))
  }

  async getNotes (): Promise<INote[]> {
    return this.notesRepository.getMany(Store.notes)
  }

  async updateNote (identifier: string, note: INote): Promise<INote> {
    return this.notesRepository.update(Store.notes, identifier, note)
  }

  async updateNotes (notes: INote[]): Promise<INote[]> {
    return this.notesRepository.updateMany(Store.notes, notes)
  }

  async deleteNote (identifier: string): Promise<boolean> {
    return this.notesRepository.delete(Store.notes, identifier)
  }

  async deleteNotes (identifiers: string[]): Promise<boolean> {
    return this.notesRepository.deleteMany(Store.notes, identifiers)
  }

  async clearDuplicateNotes (): Promise<INote[]> {
    // TODO: BUILD SERVICE
    return []
  }
}
