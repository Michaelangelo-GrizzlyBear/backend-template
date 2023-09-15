import { Container } from 'inversify'
import EncryptionService from '@services/encryption'
import HashService from '@services/hash'
import MongoDbService from '@services/mongo-db'
import UserDataSource from '@services/user-database/module'
import Types from '@src/types'

const container = new Container()

container.load(UserDataSource)

container.bind(Types.HashService).to(HashService)
container.bind(Types.EncryptionService).to(EncryptionService)
container.bind(Types.MongoDbService).to(MongoDbService)
    .inSingletonScope()

export default container
