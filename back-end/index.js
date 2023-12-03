import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
//import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();


 app.use(cors());
/*app.use(
    cors({
        origin: 'http://localhost/3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)*/

app.use(express.json());


app.use('/books',booksRoute);

mongoose
.connect(mongoDBURL, )
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log(`Listening to PORT:${PORT}`);
    })
    
})
.catch((error)=>{
    console.log("error connecting to database: "+error);
})