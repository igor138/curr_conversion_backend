import express from 'express'
import bodyParser from 'body-parser'

import controller from './controllers'
import { port } from './config.json'

const app = express()

app.use(bodyParser.json())

const allowCrossDomain = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Headers', "*")
  next()
}

app.use(allowCrossDomain)
app.use(controller)
app.listen(port)