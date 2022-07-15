import { Router } from "express"
import { createNote, deleteNote, getNote, getNotes } from "../controllers/notesController.js"
import verifyJwtToken from "../middlewares/verifyJwtToken.js"
import { validateNoteSchema } from "../validations/noteSchema.js"

const router = Router()

router.post('/notes', verifyJwtToken, validateNoteSchema, createNote)
router.patch('/notes/:noteId', verifyJwtToken)
router.get('/notes', verifyJwtToken, getNotes)
router.get('/notes/:noteId', verifyJwtToken, getNote)
router.delete('/notes/:noteId', verifyJwtToken, deleteNote)

export default router