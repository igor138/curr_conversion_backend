import express from 'express'

import controller from './controllers'

const app = express()

app.use(controller)

app.listen(3000)