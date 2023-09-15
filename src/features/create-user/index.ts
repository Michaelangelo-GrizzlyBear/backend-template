import config from 'config'
import {
    injectable,
    inject,
} from 'inversify'
import type { IParameters } from './parameters'
import type { IResponse } from './response'
import type { IUserDataSource } from '@interfaces/data-sources'
import type { IHashService } from '@services/hash/interface'
import Types from '@src/types'
import schema from './schema'
import AbstractExecutable from '../abstract'

const BCRYPT_SALT_ROUNDS: number = config.get('app.bcrypt.salt_rounds')

@injectable()
export default class CreateUser extends AbstractExecutable<IParameters, IResponse> {
    constructor(
        @inject(Types.HashService) private readonly hashService: Pick<IHashService, 'hash'>,
        @inject(Types.UserDataSource) private readonly userDataSource: Pick<IUserDataSource, 'create'>,
    ) {
        super(schema)
    }

    async process(parameters: IParameters): IResponse {
        const {
            password,
        } = parameters
        const hashedPassword = await this.hashService.hash({
            data: password,
            salt_rounds: BCRYPT_SALT_ROUNDS,
        })
        return this.userDataSource.create({
            ...parameters,
            password: hashedPassword,
        })
    }
}
