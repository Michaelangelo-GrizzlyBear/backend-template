import config from 'config'
import { Factory } from 'rosie'
import type schema from './schema'
import type { IUserDataSource } from '@interfaces/data-sources'
import type { IUser } from '@interfaces/models'
import type { IDatabaseCredentials } from '@services/mongo-db/interface'
import type mongoose from 'mongoose'
import container from '@src/index'
import Types from '@src/types'
import { validateUser } from '@tests/assertions'

const DATABASE_SERVER: string = config.get('database.server')
const DATABASE_NAME: string = config.get('database.name')
const DATABASE_URI: string = config.get('database.uri')
const DATABASE_USERNAME: string = config.get('database.username')
const DATABASE_PASSWORD: string = config.get('database.password')

describe('UserDatabase', (): void => {
    const mockUserCollection: (databaseCredentials: IDatabaseCredentials) => Promise<mongoose.Model<IUser, typeof schema>> = container.get(Types.UserCollection)
    const mockUserDataSource: IUserDataSource = container.get(Types.UserDataSource)
    const mockUser: IUser = Factory.build('service.user_database.record.user.1')

    afterEach(async (): Promise<void> => {
        await mockUserDataSource.truncate()
    })

    describe('#create', (): void => {
        it('creates a user record in the database', async (): Promise<void> => {
            await mockUserDataSource.create(mockUser)
            const userCollection = await mockUserCollection({
                database_server: DATABASE_SERVER,
                database_name: DATABASE_NAME,
                database_uri: DATABASE_URI,
                database_username: DATABASE_USERNAME,
                database_password: DATABASE_PASSWORD,
            })
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const createdUser = await userCollection.findById(mockUser._id).exec() as IUser
            validateUser(createdUser)
        })

        it('returns the correct properties of the created user record in the database', async (): Promise<void> => {
            const createdUser = await mockUserDataSource.create(mockUser)
            validateUser(createdUser)
        })
    })
})
