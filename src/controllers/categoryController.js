import db from "../database/db.js"
import { ObjectId } from 'mongodb';

async function createCategory(req, res) {
    const { userId } = res.locals

    try {
        await db.collection('categories').insertOne({ ...req.body, userId })

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updateCategory(req, res) {
    const { name } = req.body
    const { categoryId } = req.params

    try {
        await db.collection('categories').updateOne({ _id: ObjectId(categoryId) }, { $set: { name } })

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getCategories(req, res) {
    const { userId } = res.locals

    try {
        const userCategories = await db.collection('categories').find({ userId }).toArray()

        res.status(200).send(userCategories)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getCategory(req, res) {
    const { userId } = res.locals
    const { categoryId } = req.params

    try {
        const userCategory = await db.collection('categories').findOne({ _id: ObjectId(categoryId), userId })

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

async function createBaseCategory(userId) {
    await db.collection('categories').insertOne({ name: 'all', userId })
}

export { createCategory, updateCategory, getCategories, createBaseCategory, deleteCategory, getCategory }