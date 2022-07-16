import joi from 'joi'
import db from './../database/db.js';
import dotenv from 'dotenv';

dotenv.config()

async function validateSignUpSchema(req, res, next) {
    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
    })

    const { error } = signUpSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    } 

    const emailRegistered = await db.collection(process.env.MONGO_USERS).findOne({ email: req.body.email })

    if(emailRegistered) {
        return res.status(409).send('email already registered')
    }

    next()
}

async function validateSignInSchema(req, res, next) {
    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    
    const { error } = signInSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    } 

    const emailFounded = await db.collection(process.env.MONGO_USERS).findOne({ email: req.body.email })
    console.log(emailFounded)
    if(!emailFounded) {
        return res.status(404).send('email not founded')
    }

    res.locals.user = emailFounded

    next()
}

export { validateSignInSchema, validateSignUpSchema }