import db from "../database/db.js"
import { ObjectId } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

async function createNote(req, res) {
    const { userId, categoryId } = res.locals
    const { message, title } = req.body

    try {
        await db
            .collection(process.env.MONGO_NOTES)
            .insertOne({ title, message, userId, categoryId })

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updateNote(req, res) {
    const userId = res.locals.userId
    const { _id, message, title, categoryId  } = req.body
    try {
        const checkData = await db
        .collection(process.env.MONGO_NOTES)
        .findOne({
            _id: ObjectId(_id),
            userId: userId
        });
        if(checkData){
            await db
                .collection(process.env.MONGO_NOTES)
                .updateOne(
                    {_id: ObjectId(id)},
                    {
                    $set:{message, title, categoryId}
                });
            return res.sendStatus(201);
        }else{
            return res.sendStatus(422); 
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

async function getNotes(req, res) {
    const { userId } = res.locals
    const { categoryId } = req.query
    let notes;

    try {
        if(categoryId) {
            const categoryFounded = await db
                .collection(process.env.MONGO_NOTES)
                .findOne({ categoryId, userId })

            if(!categoryFounded) {
                return res.status(404).send('category not found')
            }

            notes = await db
                .collection(process.env.MONGO_NOTES)
                .find({ categoryId, userId })
                .toArray()
        } else {
            notes = await db
                .collection(process.env.MONGO_NOTES)
                .find({ userId })
                .toArray()
        }
        
        res.status(200).send(notes)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getNote(req, res) {
    const { noteId } = req.params

    try {
        const note = await db
            .collection(process.env.MONGO_NOTES)
            .findOne({ _id: ObjectId(noteId) })

        res.status(200).send(note)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function deleteNote(req, res) {
    const { noteId } = req.params;

    try {
        await db
            .collection(process.env.MONGO_NOTES)
            .deleteMany({categoryId: ObjectId(noteId)})
        await db
            .collection(process.env.MONGO_CATEGORIES)
            .deleteOne({_id: ObjectId(noteId)})

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

export { createNote, updateNote, getNotes, getNote, deleteNote }