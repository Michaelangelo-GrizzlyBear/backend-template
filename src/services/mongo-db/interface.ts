import type { Connection } from 'mongoose'

export interface IDatabaseCredentials {
    database_server: string,
    database_name: string,
    database_uri?: string,
    database_username: string,
    database_password: string,
}

export interface IMongoDbService {
    createConnection: (databaseCredentials: IDatabaseCredentials) => Connection,
}
