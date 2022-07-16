import db from "../database/db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

async function signUp(req, res) {
    const { name, email, password } = req.body

    try {

        const hashPassword = bcrypt.hashSync(password, 10)

        await db.collection(process.env.MONGO_USERS).insertOne({ name, email, password: hashPassword })

        res.sendStatus(201)
    } catch(err) {
        res.status(500).send(err)
    }
}

async function signIn(req, res) {
    const { user } = res.locals

    try {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '7d' })

            res.status(200).send({ name: user.name, token })
        } else {
            res.status(403).send('wrong password')
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

export { signUp, signIn }