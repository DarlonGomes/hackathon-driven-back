import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const client = new MongoClient(process.env.MONGO_URI);
let db;

try {
    await client.connect();
    db = client.db(process.env.MONGO_DB)
} catch (error) {
    console.log(error);
}

export default db;