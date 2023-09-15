import express from 'express'
import getHealth from './endpoints/get-health'
import createUser from './endpoints/post-user'

const app = express()

app.use(express.json())

app.get('/', getHealth)
app.post('/user', createUser)

export default app
