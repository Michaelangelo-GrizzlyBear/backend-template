import { ContainerModule } from 'inversify'
import type {
    IDatabaseCredentials,
    IMongoDbService,
} from '@services/mongo-db/interface'
import type { interfaces } from 'inversify'
import type { Model } from 'mongoose'
import Types from '@src/types'
import UserDatabase from '.'
import schema from './schema'

export default new ContainerModule((bind: interfaces.Bind): void => {
    bind(Types.UserDataSource).to(UserDatabase)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bind(Types.UserCollection).toFactory((context: interfaces.Context): (databaseCredentials: IDatabaseCredentials) => Model<any, any> => (databaseCredentials: IDatabaseCredentials): Model<any, any> => {
        const mongoDbService: IMongoDbService = context.container.get(Types.MongoDbService)
        const createdConnection = mongoDbService.createConnection(databaseCredentials)
        return createdConnection.model('User', schema)
    })
})
