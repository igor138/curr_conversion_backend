import axios from 'axios'

import { api } from '../config.json'

const { url, key } = api

export const getCurrencies = async () => {
  const reqUrl = `${url}/currencies.json?app_id=${key}`
  const response = await axios.get(reqUrl)
  return response.data
}  