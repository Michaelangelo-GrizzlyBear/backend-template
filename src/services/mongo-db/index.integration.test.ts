import config from 'config'
import mongoose from 'mongoose'
import type { IMongoDbService } from './interface'
import container from '@src/index'
import Types from '@src/types'

const DATABASE_SERVER: string = config.get('database.server')
const DATABASE_NAME: string = config.get('database.name')
const DATABASE_URI: string = config.get('database.uri')
const DATABASE_USERNAME: string = config.get('database.username')
const DATABASE_PASSWORD: string = config.get('database.password')

describe('MongoDbService', (): void => {
    const mongoDbService: IMongoDbService = container.get(Types.MongoDbService)
    const databaseCredentials = {
        database_server: DATABASE_SERVER,
        database_name: DATABASE_NAME,
        database_uri: DATABASE_URI,
        database_username: DATABASE_USERNAME,
        database_password: DATABASE_PASSWORD,
    }

    describe('#createConnection', (): void => {
        it('creates a connection instance in MongoDB', (): void => {
            const createdConnection = mongoDbService.createConnection(databaseCredentials)
            expect(createdConnection).toBeInstanceOf(mongoose.Connection)
        })

        it('reuses the same mongoose. instance in MongoDB on succeeding calls', async (): Promise<void> => {
            const createdConnectionPromises = [mongoDbService.createConnection(databaseCredentials), mongoDbService.createConnection(databaseCredentials)]
            const createdConnections = await Promise.all(createdConnectionPromises)
            createdConnections.forEach((createdConnection1: mongoose.Connection): void => {
                createdConnections.forEach((createdConnection2: mongoose.Connection): void => {
                    expect(createdConnection1).toEqual(createdConnection2)
                })
            })
        })
    })
})
