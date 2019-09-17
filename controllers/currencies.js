import { Router } from 'express'

import { getCurrencies } from '../models/currencies'

const router = Router()

router.get('/', async (_, res) => {
  const currencies = await getCurrencies()
  res.send(currencies)
})

export default router