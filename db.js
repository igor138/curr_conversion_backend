import knex from 'knex'
import { db as dbCongig } from './config.json'

const knexInstance = knex(dbCongig)

export default knexInstance