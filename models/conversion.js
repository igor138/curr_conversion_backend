import knex from '../db'
import axios from 'axios'
import { apiKey } from '../config.json'

const fetchRates = async (source, dest) => {
  const reqUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&symbols=${source},${dest}`
  const response = await axios.get(reqUrl)
  const rates = response.data.rates
  return {
    sourceRate: rates[source],
    destRate: rates[dest]
  }
}

export const add = async ({ sourceCurrency, destCurrency, amount }) => {
  const rates = await fetchRates(sourceCurrency, destCurrency)
  const amountUsd = amount / rates.sourceRate
  const converted = amountUsd * rates.destRate
  knex('conversions').insert({
    sourceCurrency,
    destCurrency,
    amount,
    amountUsd
  })
  .then(_=>_)

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