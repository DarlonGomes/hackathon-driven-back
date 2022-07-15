import { Router } from "express"
import { createCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController.js"
import verifyJwtToken from '../middlewares/verifyJwtToken.js'
import { validateCategorySchema } from "../validations/categorySchema.js"

const router = Router()

router.post('/categories', verifyJwtToken, validateCategorySchema, createCategory)
router.patch('/categories/:categoryId', verifyJwtToken, validateCategorySchema, updateCategory)
router.get('/categories', verifyJwtToken, getCategories)
router.get('/categories/:categoryId', verifyJwtToken, getCategory)
router.delete('/categories/:categoryId', verifyJwtToken)

export default router