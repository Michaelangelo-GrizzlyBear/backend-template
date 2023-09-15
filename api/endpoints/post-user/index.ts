import { StatusCodes } from 'http-status-codes'
import type { IParameters } from '@features/create-user/parameters'
import type { IResponse } from '@features/create-user/response'
import type { IExecutable } from '@interfaces/executable'
import type {
    Request,
    Response,
} from 'express'
import container from '@src/index'
import Types from '@src/types'

const createUser: IExecutable<IParameters, IResponse> = container.get(Types.CreateUser)

export default async (req: Request, res: Response): Promise<Response> => {
    const parameters: IParameters = req.body
    try {
        const createdUser = await createUser.execute(parameters)
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: createdUser,
        })
    } catch (error) {
        return res.status(StatusCodes.OK).json({
            status: 'failed',
            data: error,
        })
    }
}
