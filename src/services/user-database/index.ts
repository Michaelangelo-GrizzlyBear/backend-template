import config from 'config'
import {
    injectable,
    inject,
} from 'inversify'
import { snakeCase } from 'lodash'
import type schema from './schema'
import type { IUserDataSource } from '@interfaces/data-sources'
import type { IDeletedDocument } from '@interfaces/data-sources/interface'
import type { IUser } from '@interfaces/models'
import type { IDatabaseCredentials } from '@services/mongo-db/interface'
import type mongoose from 'mongoose'
import Types from '@src/types'
import ObjectUtility from '@utils/object'
import SystemError from '@utils/system-error'

const DATABASE_SERVER: string = config.get('database.server')
const DATABASE_NAME: string = config.get('database.name')
const DATABASE_URI: string = config.get('database.uri')
const DATABASE_USERNAME: string = config.get('database.username')
const DATABASE_PASSWORD: string = config.get('database.password')

@injectable()
export default class UserDatabase implements IUserDataSource {
    @inject(Types.UserCollection) private readonly userCollection!: (databaseCredentials: IDatabaseCredentials) => Promise<mongoose.Model<IUser, typeof schema>>

    async create(parameters: Partial<IUser>): Promise<IUser> {
        try {
            const userCollection = await this.userCollection({
                database_server: DATABASE_SERVER,
                database_name: DATABASE_NAME,
                database_uri: DATABASE_URI,
                database_username: DATABASE_USERNAME,
                database_password: DATABASE_PASSWORD,
            })
            return userCollection.create(parameters)
        } catch (error) {
            const {
                name,
            } = error
            throw new SystemError({
                code: 'SystemError',
                message: name,
                details: error,
            })
        }
    }

    async truncate(): Promise<IDeletedDocument> {
        try {
            const userCollection = await this.userCollection({
                database_server: DATABASE_SERVER,
                database_name: DATABASE_NAME,
                database_uri: DATABASE_URI,
                database_username: DATABASE_USERNAME,
                database_password: DATABASE_PASSWORD,
            })
            const users = userCollection.deleteMany()
            const deletedDocuments: IDeletedDocument = ObjectUtility.changeCaseStyle(users, (key: string): string => snakeCase(key))
            return deletedDocuments
        } catch (error) {
            const {
                name,
            } = error
            throw new SystemError({
                code: 'SystemError',
                message: name,
                details: error,
            })
        }
    }
}
