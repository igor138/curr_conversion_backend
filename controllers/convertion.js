import { Router } from 'express'

import { add, getStats } from '../models/convertion'

const router = Router()

router.post('/', (req, res) => {
  const convereted = add()
  res.send(convereted)
})

router.get('/', async (_, res) => {
  const stats = await getStats()
  res.send(stats)
})

export default router
