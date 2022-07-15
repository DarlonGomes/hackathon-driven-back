import db from "../database/db.js"
import { ObjectId } from 'mongodb'

async function createNote(req, res) {
    const { userId, categoryId } = res.locals
    const { message, title } = req.body

    try {
        await db.collection('notes').insertOne({ title, message, userId, categoryId })

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updateNote(req, res) {
    
}

async function getNotes(req, res) {
    const { userId } = res.locals
    const { categoryId } = req.query
    let notes;

    try {
        if(categoryId) {
            const categoryFounded = await db.collection('notes').findOne({ categoryId, userId })

            if(!categoryFounded) {
                return res.status(404).send('category not found')
            }

            notes = await db.collection('notes').find({ categoryId, userId }).toArray()
        } else {
            notes = await db.collection('notes').find({ userId }).toArray()
        }
        
        res.status(200).send(notes)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getNote(req, res) {
    const { noteId } = req.params

    try {
        const note = await db.collection('notes').findOne({ _id: ObjectId(noteId) })

        res.status(200).send(note)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function deleteNote(req, res) {

}

export { createNote, updateNote, getNotes, getNote, deleteNote }