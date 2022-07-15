import joi from 'joi'
import db from './../database/db.js';

async function validateSignUpSchema(req, res, next) {
    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
    })

    const { error } = signUpSchema.validate(req.body)

    if(error) {
        return res.status(422).send(error)
    } 

    const emailRegistered = await db.collection('users').findOne({ email: req.body.email })

    if(emailRegistered) {
        return res.sendStatus(409)
    }

    next()
}

async function validateSignInSchema(req, res, next) {
    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const { error } = signInSchema.validate(req.body)

    if(error) {
        return res.status(422).send(error)
    } 

    const userFounded = await db.collection('users').findOne({ email: req.body.email })

    if(!userFounded) {
        return res.status(404).send('email not founded')
    }

    res.locals.user = userFounded

    next()
}

export { validateSignInSchema, validateSignUpSchema }