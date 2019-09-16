import { Router } from 'express'

import convertionController from './convertion'
import currenciesController from './currencies'

const router = Router()

router.use('/convertion', convertionController)
router.use('/currency', currenciesController)

export default router