import { StatusCodes } from 'http-status-codes'
import _ from 'lodash'
import { Factory } from 'rosie'
import request from 'supertest'
import type { IUserDataSource } from '@interfaces/data-sources'
import type { IUser } from '@interfaces/models'
import container from '@src/index'
import Types from '@src/types'
import { validateUser } from '@tests/assertions'
import app from '../..'

const URL = '/user'

describe('POST /user', (): void => {
    const userDataSource: IUserDataSource = container.get(Types.UserDataSource)
    const mockUser: IUser = Factory.build('service.user_database.record.user.1')
    const mockValidCreateUserParameters = _.omit(mockUser, ['_id', 'created_at', 'updated_at'])

    afterEach(async (): Promise<void> => {
        await userDataSource.truncate()
    })

    it('returns a success response if the parameters are valid', async (): Promise<void> => {
        const {
            body,
        } = await request(app)
            .post(URL)
            .send(mockValidCreateUserParameters)
            .expect(StatusCodes.OK)
        const {
            data,
        }: { data: IUser } = body
        expect(body).toHaveProperty('status', 'success')
        expect(body).toHaveProperty('data')
        validateUser(data)
    })

    it('returns a failed response if the parameters are invalid', (): void => {
        Object.keys(mockValidCreateUserParameters).forEach((key: string): void => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mockInvalidCreateUserParameters: any = _.omit(mockValidCreateUserParameters, [key])
            it(`fails when the ${key} parameter is missing`, async (): Promise<void> => {
                const {
                    body,
                } = await request(app)
                    .post(URL)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    .send(mockInvalidCreateUserParameters)
                    .expect(StatusCodes.OK)
                const {
                    data,
                } = body
                expect(body).toHaveProperty('status', 'failed')
                expect(body).toHaveProperty('data')
                expect(data).toHaveProperty('code', 'ValidationError')
            })
        })
    })
})
