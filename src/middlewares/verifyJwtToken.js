import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default async function verifyJwtToken(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '')
    let user;

    try {
        user = await jwt.verify(token, process.env.SECRET_KEY)
    } catch (err) {
        return res.sendStatus(401)
    }

    res.locals.userId = user._id

    next()
}