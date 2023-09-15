/* eslint-disable @typescript-eslint/naming-convention */
export default {
    // Features
    CreateUser: Symbol.for('CreateUser'),

    // Databases
    UserCollection: Symbol.for('UserCollection'),
    UserDataSource: Symbol.for('UserDataSource'),

    // Services
    EncryptionService: Symbol.for('EncryptionService'),
    HashService: Symbol.for('HashService'),
    MongoDbService: Symbol.for('MongoDbService'),
}
