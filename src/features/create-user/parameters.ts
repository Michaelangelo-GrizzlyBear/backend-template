import type { IUser } from '@interfaces/models'

export type IParameters = Omit<IUser, '_id' | 'created_at' | 'updated_at'>
