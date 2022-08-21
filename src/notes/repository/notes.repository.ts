import { first, fromPairs, map, isArray } from 'lodash'
import { MongoClient, Db, ObjectId } from 'mongodb'
import { ICollectionFilter, IConfig, Identifier } from './types'

const config: IConfig = require('../../config.json')

export class NotesRepository {
  constructor (private mongoDbClient: MongoClient, private db: Db) {
  }

  private async connect () {
    try {
      await this.setMongoDbClient()
      await this.setDb()

      return
    } catch (error) {
      console.log(error.stack)

      throw error
    }
  }

  private async setMongoDbClient () {
    try {
      this.mongoDbClient = await MongoClient.connect(config.dataStore.mongodb.fairytales.url + ':' + config.dataStore.mongodb.fairytales.port)

      return
    } catch (error) {
      console.log(error.stack)

      throw error
    }
  }

  private setDb () {
    try {
      this.db = this.mongoDbClient.db(config.dataStore.mongodb.fairytales.name)

      return
    } catch (error) {
      console.log(error.stack)

      throw error
    }
  }

  async save<T> (store: string, data: any): Promise<T> {
    await this.connect()

    return this.db.collection(store)
      .insertOne(data)
      .then(value => {
        this.mongoDbClient.close()

        const newItem = first(value.ops)

        const identifier = newItem._id

        delete newItem._id

        newItem.identifier = identifier

        return newItem
      })
      .catch(reason => {
        throw reason
      })
  }

  async saveMany<T> (store: string, data: any[]): Promise<T[]> {
    await this.connect()

    return this.db.collection(store)
      .insertMany(data)
      .then(value => {
        this.mongoDbClient.close()

        for (let newItem of value.ops) {
          const identifier = newItem._id

          delete newItem._id

          newItem.identifier = identifier
        }

        return value.ops
      })
  }

  async get<T> (store: string, filterBy: ICollectionFilter[] | Identifier): Promise<T> {
    await this.connect()

    let filterOption

    if (isArray(filterBy)) {
      filterOption = fromPairs(map(filterBy, (filter: ICollectionFilter) => [ filter.key, filter.value ]))
    } else {
      filterOption = filterBy
    }

    return this.db.collection<T>(store)
      .findOne(filterOption)
      .then((value: any) => {
        this.mongoDbClient.close()

        const identifier = value._id

        delete value._id

        value.identifier = identifier

        return value
      })
  }

  async getMany<T> (store: string): Promise<T[]> {
    await this.connect()

    return this.db.collection<any>(store)
      .find({})
      .toArray()
      .then(items => {
        this.mongoDbClient.close()

        for (let item of items) {
          const identifier = item._id

          delete item._id

          item.identifier = identifier
        }

        return items
      })
  }

  async update<T> (store: string, identifier: string, data: any): Promise<T> {
    await this.connect()

    if (data.identifier) {
      delete data.identifier
    }

    return this.db.collection(store)
      .updateOne({ _id: new ObjectId(identifier) }, { $set: data })
      .then(value => {
        if (value.modifiedCount === 0) {
          return null
        }

        return data
      })
  }

  async updateMany<T> (store: string, data: any[]): Promise<T[]> {
    await this.connect()

    let updatedItems: any[] = []

    const collection = this.db.collection(store)

    for (let item of data) {
      const identifier = item.identifier

      delete item.identifier

      await collection
        .updateOne({ _id: new ObjectId(identifier) }, { $set: item })
        .then(value => {
          if (value.modifiedCount === 1) {
            item.identifier = identifier

            updatedItems.push(item)
          }

          return value
        })
    }

    return updatedItems.length === data.length ? data : updatedItems
  }

  async delete<T> (store: string, identifier: string): Promise<boolean> {
    await this.connect()

    return this.db.collection(store)
      .deleteOne({ _id: new ObjectId(identifier) })
      .then(value => {
        return value.deletedCount !== 0
      })
  }

  async deleteMany<T> (store: string, identifiers: string[]): Promise<boolean> {
    await this.connect()

    const idObjects = map(identifiers, value => {
      return new ObjectId(value)
    })

    return this.db.collection(store)
      .deleteMany({ _id: { $in: idObjects } })
      .then(value => {
        return value.deletedCount !== 0
      })
  }
}
