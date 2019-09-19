import { Router } from 'express'
import { add, getStats } from '../models/conversion'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const conversionResponse = await add(req.body)
    res.send(conversionResponse)
  } catch(error) {
    console.error({'Convertion error': error})
    res.status(500).send({ error: error.message })  
  }
})

router.get('/', async (_, res) => {
  try {
    const stats = await getStats()
    res.send(stats)
  } catch(error) {
    console.error({'Getting stats error': error})
    res.status(500).send({ error: error.message })  
  }
})

export default router
