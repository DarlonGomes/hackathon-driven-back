import { Router } from 'express'
import { signIn, signUp } from '../controllers/authController'
import { validateSignInSchema, validateSignUpSchema } from '../validations/authSchemas'

const router = Router()

router.post('/sign-up', validateSignUpSchema, signUp)
router.post('/sign-in', validateSignInSchema, signIn)

export default router