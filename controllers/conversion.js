import { Router } from 'express'

import { add, getStats } from '../models/conversion'

const router = Router()

router.post('/', async (req, res) => {
  const conversionResponse = await add(req.body)
  res.send(conversionResponse)
})

router.get('/', async (_, res) => {
  const stats = await getStats()
  res.send(stats)
})

export default router
