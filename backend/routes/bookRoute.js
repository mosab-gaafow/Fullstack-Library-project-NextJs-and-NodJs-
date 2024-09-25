import express from 'express';
import { deleteBook, getAllBooks, getBookById, registerBook, updateBooks } from '../controller/bookController.js';

const bookRoutes = express.Router();

bookRoutes.post('/register-book',registerBook)
bookRoutes.get('/get-all-books',getAllBooks)
bookRoutes.get('/get-book-byId/:id',getBookById)
bookRoutes.patch('/update-books/:id',updateBooks)
bookRoutes.delete('/delete-books/:id',deleteBook)

export default bookRoutes;


