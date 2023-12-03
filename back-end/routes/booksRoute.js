import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();



//POSTING BOOK DATA TO SERVER

router.post('/',async (request,response)=>{
    try{
        if(!request.body.title || 
            !request.body.author || 
            !request.body.publishYear)
        {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log('error posting book data to server: '+error.message);
        response.status(500).send({message:error.message});
    }
})

//GETTING ALL BOOKS DATA FROM SERVER

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).send({count: books.length, books:books});
    }
    catch (error) {
        console.log("Unable to get books: "+ error.message);
        response.status(500).send({message: error.message});
    }
})

//GETTING BOOK BY ID

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).send(book);
    }
    catch (error) {
        console.log("Unable to get the book: "+ error.message);
        response.status(500).send({message: error.message});
    }
})

//UPDATING A BOOK

router.put('/:id', async (request, response) => {
    try {
        if(!request.body.title || 
            !request.body.author || 
            !request.body.publishYear)
        {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const { id } = request.params;
        
        const result= await Book.findByIdAndUpdate(id,request.body);

        if (!result) {
            response.status(404).send({message: "Book not found!"});
        }

        return response.status(200).send({message: 'Book updated successfully!'});


    }
    catch (error) {
        console.log("Unable to update the book: "+ error.message);
        response.status(500).send({message: error.message});
    }
})

//DELETE A BOOK

router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);
         if(!result) {
            return response.status(404).send({message: "Book not found!"});
            
         }

         return response.status(200).send({message: "Book deleted succesfully!"});

    } catch (error) {
        console.log("Unable to delete the book: "+ error.message);
        response.status(500).send({message: error.message});
    } 
});

export default router;