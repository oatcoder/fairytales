import { MongoClient, ObjectID } from 'mongodb'

export interface IFairytales {
  name: string
  url: string
  port: string
}

export interface IMongodb {
  fairytales: IFairytales
}

export interface IDataStore {
  mongodb: IMongodb
}

export interface IConfig {
  dataStore: IDataStore
}

export interface INotesRepository {
  save<T> (store: string, data: any): Promise<T>

  saveMany<T> (store: string, data: any[]): Promise<T[]>

  get<T> (store: string, filterBy: ICollectionFilter[] | Identifier): Promise<T>

  getMany<T> (store: string): Promise<T[]>

  update<T> (store: string, identifier: string, data: any): Promise<T>

  updateMany<T> (store: string, data: any[]): Promise<T[]>

  delete<T> (store: string, identifier: string): Promise<boolean>

  deleteMany<T> (store: string, identifiers: string[]): Promise<boolean>
}

export enum Store {
  notes = 'notes'
}

export interface ICollectionFilter {
  key?: string
  value?: string
}

export class Identifier extends ObjectID {
}
