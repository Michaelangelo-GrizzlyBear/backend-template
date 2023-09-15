import { Container } from 'inversify'
import Types from '@src/types'
import CreateUser from './create-user'

const container = new Container()

container.bind(Types.CreateUser).to(CreateUser)

export default container
