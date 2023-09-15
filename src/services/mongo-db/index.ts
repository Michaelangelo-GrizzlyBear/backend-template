import { injectable } from 'inversify'
import { snakeCase } from 'lodash'
import mongoose from 'mongoose'
import type {
    IDatabaseCredentials,
    IMongoDbService,
} from './interface'
import ObjectUtility from '@utils/object'

@injectable()
export default class MongoDbService implements IMongoDbService {
    private connection?: mongoose.Connection

    createConnection(databaseCredentials: IDatabaseCredentials): mongoose.Connection {
        const {
            database_server,
            database_name,
            database_uri,
            database_username,
            database_password,
        } = databaseCredentials
        const databaseUri = database_uri ?? `mongodb://${database_server}/${database_name}`
        const createConnectionOptions = {
            db_name: database_name,
            user: database_username,
            pass: database_password,
        }
        const formattedCreateConnectionOptions: mongoose.ConnectOptions = ObjectUtility.changeCaseStyle(createConnectionOptions, (key: string): string => snakeCase(key))
        this.connection ||= mongoose.createConnection(databaseUri, formattedCreateConnectionOptions)
        return this.connection
    }
}
