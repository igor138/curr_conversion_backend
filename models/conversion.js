import knex from '../db'
import axios from 'axios'
import { api } from '../config.json'

const { url, key } = api

const fetchRates = async (source, dest) => {
  const reqUrl = `${url}/latest.json?app_id=${key}&symbols=${source},${dest}`
  const response = await axios.get(reqUrl)
  const rates = response.data.rates
  return {
    sourceRate: rates[source],
    destRate: rates[dest]
  }
}

const validate = ({ sourceCurrency, destCurrency, amount }) => 
  /^[A-Z]{3}$/.test(sourceCurrency) 
    && /^[A-Z]{3}$/.test(destCurrency) 
    && /^\d+.\d*$/.test(amount)

export const add = async ({ sourceCurrency, destCurrency, amount }) => {
  if (!validate({ sourceCurrency, destCurrency, amount })) throw new Error('Access denied')
  
  const rates = await fetchRates(sourceCurrency, destCurrency)
  const amountUsd = amount / rates.sourceRate
  const converted = amountUsd * rates.destRate
  knex('conversions')
    .insert({
      sourceCurrency,
      destCurrency,
      amount,
      amountUsd
    })
    .then(_=>_)
    .catch(e => console.error({ 'db error': e.message }))

  return { response: converted }
}

export const getStats = async () => {
  let popularDestCurrency = null
  let totalAmount = 0
  let conversionsCount = 0

  const popularCurrencies = await knex
    .select('destCurrency')
    .count('id')
    .from('conversions')
    .groupBy('destCurrency')
    .orderBy(knex.raw('count(`id`)'), 'desc')
    .limit(1)
  
  if (popularCurrencies.length) {
    popularDestCurrency = popularCurrencies[0].destCurrency
  }  
   
  const amounts = await knex
    .count('id as count')
    .sum('amountUsd as amount')
    .from('conversions')

  if (amounts.length) {
    totalAmount = amounts[0].amount
    conversionsCount = amounts[0].count
  }

  return { popularDestCurrency, totalAmount, conversionsCount }
}