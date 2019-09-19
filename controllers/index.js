import { Router } from 'express'
import conversionController from './conversion'
import currenciesController from './currencies'

const router = Router()

router.use('/conversion', conversionController)
router.use('/currency', currenciesController)

export default router