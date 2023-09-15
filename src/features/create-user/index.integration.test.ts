import _ from 'lodash'
import { Factory } from 'rosie'
import type { IParameters } from './parameters'
import type { IResponse } from './response'
import type { IUserDataSource } from '@interfaces/data-sources'
import type { IExecutable } from '@interfaces/executable'
import type { IUser } from '@interfaces/models'
import container from '@src/index'
import Types from '@src/types'
import { validateUser } from '@tests/assertions'

describe('CreateUser', (): void => {
    const userDataSource: IUserDataSource = container.get(Types.UserDataSource)
    const mockUser: IUser = Factory.build('service.user_database.record.user.1')
    const mockValidCreateUserParameters = _.omit(mockUser, ['_id', 'created_at', 'updated_at'])

    afterEach(async (): Promise<void> => {
        await userDataSource.truncate()
    })

    describe('#process', (): void => {
        it('creates a user record in the database', async (): Promise<void> => {
            const subject: IExecutable<IParameters, IResponse> = container.get(Types.CreateUser)
            const createdUser = await subject.execute(mockValidCreateUserParameters)
            validateUser(createdUser)
        })

        Object.keys(mockValidCreateUserParameters).forEach((key: string): void => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mockInvalidCreateUserParameters: any = _.omit(mockValidCreateUserParameters, [key])

            it(`fails when the ${key} parameter is missing`, async (): Promise<void> => {
                const subject: IExecutable<IParameters, IResponse> = container.get(Types.CreateUser)
                try {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    await subject.execute(mockInvalidCreateUserParameters)
                } catch (error) {
                    expect(error).toHaveProperty('code', 'ValidationError')
                    expect(error).toHaveProperty('details')
                    expect(error.details[0]).toHaveProperty('message', `"${key}" is required`)
                    expect(error.details[0]).toHaveProperty('key', key)
                    return
                }
                throw new Error('fail')
            })
        })
    })

    it('fails when the email_address parameter is not a valid email_address', async (): Promise<void> => {
        const subject: IExecutable<IParameters, IResponse> = container.get(Types.CreateUser)
        const mockInvalidCreateUserParameters = {
            ...mockValidCreateUserParameters,
            email_address: 'ricardo.bishop.com',
        }
        try {
            await subject.execute(mockInvalidCreateUserParameters)
        } catch (error) {
            expect(error).toHaveProperty('code', 'ValidationError')
            expect(error).toHaveProperty('details')
            expect(error.details[0]).toHaveProperty('message', '"email_address" must be a valid email')
            expect(error.details[0]).toHaveProperty('key', 'email_address')
            return
        }
        throw new Error('fail')
    })
})
