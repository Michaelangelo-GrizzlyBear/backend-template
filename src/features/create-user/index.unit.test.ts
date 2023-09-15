import _ from 'lodash'
import 'reflect-metadata'
import { Factory } from 'rosie'
import type { IParameters } from './parameters'
import type { IResponse } from './response'
import type { IExecutable } from '@interfaces/executable'
import type { IUser } from '@interfaces/models'
import CreateUser from '.'

describe('CreateUser', (): void => {
    const mockHashService = {
        hash: jest.fn(),
    }
    const mockUserDataSource = {
        create: jest.fn(),
    }
    const mockUser: IUser = Factory.build('service.user_database.record.user.1')
    const mockHashServiceHashResponse = 'hashedPassword'
    const mockCreateUserParameterParameters = _.omit(mockUser, ['_id', 'created_at', 'updated_at'])
    const mockCreateUserResponse = mockUser
    const getInstance: () => IExecutable<IParameters, IResponse> = (): IExecutable<IParameters, IResponse> => new CreateUser(mockHashService, mockUserDataSource)

    beforeEach((): void => {
        mockHashService.hash.mockResolvedValue(mockHashServiceHashResponse)
        mockUserDataSource.create.mockResolvedValue(mockUser)
    })

    afterEach((): void => {
        jest.resetAllMocks()
    })

    describe('#process', (): void => {
        it('returns the correct response of the CreateUser function', async (): Promise<void> => {
            const subject: IExecutable<IParameters, IResponse> = getInstance()
            const createdUser = await subject.execute(mockCreateUserParameterParameters)
            expect(createdUser).toEqual(mockCreateUserResponse)
        })

        describe('when HashService is called', (): void => {
            it('calls the HashService#hash function', async (): Promise<void> => {
                const subject: IExecutable<IParameters, IResponse> = getInstance()
                await subject.execute(mockCreateUserParameterParameters)
                expect(mockHashService.hash).toHaveBeenCalled()
            })

            it('passes the correct parameters to the HashService#hash function', async (): Promise<void> => {
                const subject: IExecutable<IParameters, IResponse> = getInstance()
                await subject.execute(mockCreateUserParameterParameters)
                const hashParameterParameters = mockHashService.hash.mock.calls[0][0]
                expect(hashParameterParameters).toHaveProperty('data')
                expect(hashParameterParameters).toHaveProperty('salt_rounds')
            })
        })

        describe('when UserDataSource is called', (): void => {
            it('calls the UserDataSource#create function', async (): Promise<void> => {
                const subject: IExecutable<IParameters, IResponse> = getInstance()
                await subject.execute(mockCreateUserParameterParameters)
                expect(mockUserDataSource.create).toHaveBeenCalled()
            })

            it('passes the correct parameters to the UserDataSource#create function', async (): Promise<void> => {
                const subject: IExecutable<IParameters, IResponse> = getInstance()
                await subject.execute(mockCreateUserParameterParameters)
                const createParameterParameters = mockUserDataSource.create.mock.calls[0][0]
                expect(createParameterParameters).toHaveProperty('first_name')
                expect(createParameterParameters).toHaveProperty('last_name')
                expect(createParameterParameters).toHaveProperty('email_address')
                expect(createParameterParameters).toHaveProperty('password')
            })
        })
    })
})
