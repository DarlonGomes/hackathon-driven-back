import joi from 'joi'
import db from '../database/db.js'
import dotenv from 'dotenv'

dotenv.config();

async function validateCategorySchema(req, res, next) {
    const { userId } = res.locals

    const categorySchema = joi.object({
        name: joi.string().required(),
    })

    const { error } = categorySchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    }

    const nameFounded = await db.collection(process.env.MONGO_CATEGORIES).findOne({ userId, name: req.body.name })

    if(nameFounded) {
        return res.status(409).send('category exists')
    }

    next()
}

export { validateCategorySchema }