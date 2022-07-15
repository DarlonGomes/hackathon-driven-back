import joi from 'joi'
import db from '../database/db.js'
import { ObjectId } from 'mongodb';

async function validateNoteSchema(req, res, next) {
    const { userId } = res.locals
    const { categoryId } = req.body

    const noteSchema = joi.object({
        title: joi.string().required(),
        message: joi.string().required(),
        categoryId: joi.string()
    })

    const { error } = noteSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    }

    if(categoryId && categoryId !== '') {
        const categoryFounded = await db.collection('categories').findOne({ _id: ObjectId(categoryId), userId })
    
        if(!categoryFounded) {
            return res.status(404).send('category not found')
        }

        res.locals.categoryId = categoryFounded._id.toString()

        return next()
    }

    res.locals.categoryId = null

    next()
}

export { validateNoteSchema }