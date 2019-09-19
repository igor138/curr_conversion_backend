import { Router } from 'express'

import { getCurrencies } from '../models/currencies'

const router = Router()

router.get('/', async (_, res) => {
  try {
    const currencies = await getCurrencies()
    res.send(currencies)
  } catch(error) {
    console.error({'Getting currencies error': error})
    res.status(500).send({ error: error.message })  
  }
})

export default router