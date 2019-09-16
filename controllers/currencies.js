import { Router } from 'express'

import { getCurrencies } from '../models/currencies'

const router = Router()

router.get('/', (req, res) => {
  const currencies = getCurrencies()
  res.send(currencies)
})

export default router