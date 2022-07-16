import db from "../database/db.js"
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()

async function createCategory(req, res) {
    const { userId } = res.locals

    try {
        await db.collection(process.env.MONGO_CATEGORIES).insertOne({ ...req.body, userId })

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updateCategory(req, res) {
    const { name } = req.body
    const { categoryId } = req.params

    try {
        await db.collection(process.env.MONGO_CATEGORIES).updateOne({ _id: ObjectId(categoryId) }, { $set: { name } })

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getCategories(req, res) {
    const { userId } = res.locals

    try {
        const userCategories = await db.collection(process.env.MONGO_CATEGORIES).find({ userId }).toArray()

        res.status(200).send(userCategories)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getCategory(req, res) {
    const { userId } = res.locals
    const { categoryId } = req.params

    try {
        const userCategory = await db.collection(process.env.MONGO_CATEGORIES).findOne({ _id: ObjectId(categoryId), userId })

        res.status(200).send(userCategory)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function deleteCategory(req, res) {
    const { categoryId } = req.params

    try {
        
    } catch (err) {
        res.status(500).send(err)
    }
}

export { createCategory, updateCategory, getCategories, deleteCategory, getCategory }