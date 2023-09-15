import type { IDataSource } from './interface'
import type { IUser } from '@interfaces/models'

export interface IUserDataSource extends IDataSource {
    create: (parameters: Partial<IUser>) => Promise<IUser>,
}
