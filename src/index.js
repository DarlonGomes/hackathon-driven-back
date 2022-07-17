import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import notesRouter from './routes/notesRouter.js'

dotenv.config();
const PORT_IN_USE = process.env.PORT || 5000
const server = express();

server.use(cors());
server.use(express.json());

server.use(authRouter)
server.use(categoryRouter)
server.use(notesRouter)
server.get('/', ()=>{console.log("I'M WORKING")})
server.listen(PORT_IN_USE,()=>{
    console.log(`Running on port ` + PORT_IN_USE )
});