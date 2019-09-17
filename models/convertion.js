import knex from '../db'

export const add = (currency, destCurrency, amount) => {
  return 10
}

export const getStats = async () => {
  let popularDestCurrency = null
  let totalAmount = 0
  let conversionsCount = 0

  const popularCurrencies = await knex
    .select('destCurrency')
    .count('id')
    .from('convertions')
    .groupBy('destCurrency')
    .orderBy(knex.raw('count(`id`)'), 'desc')
    .limit(1)
  
  if (popularCurrencies.length) {
    popularDestCurrency = popularCurrencies[0].destCurrency
  }  
   
  const amounts = await knex
    .count('id as count')
    .sum('amountUsd as amount')
    .from('convertions')
  if (amounts.length) {
    totalAmount = amounts[0].amount
    conversionsCount = amounts[0].count
  }

  return { popularDestCurrency, totalAmount, conversionsCount }
}