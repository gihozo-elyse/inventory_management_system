import { Router} from 'express'
import productRoute from './productRoute'

const router = Router()

router.use('/product', productRoute)

export default router