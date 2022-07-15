import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import notesRouter from './routes/notesRouter.js'

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(authRouter)
server.use(categoryRouter)
server.use(notesRouter)

server.listen(process.env.PORT,()=>{
    console.log(`Running on port ` + process.env.PORT + ` vocês são picas`)
});