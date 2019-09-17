import axios from 'axios'

import { apiKey } from '../config.json'

export const getCurrencies = async () => {
  const reqUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`
  const response = await axios.get(reqUrl)
  return response.data
}  