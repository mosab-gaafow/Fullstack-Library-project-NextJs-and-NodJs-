import express from 'express';
import { deleteBook, getAllBooks, registerBook, updateBooks } from '../controller/bookController.js';

const bookRoutes = express.Router();

bookRoutes.post('/register-book',registerBook)
bookRoutes.get('/get-all-books',getAllBooks)
bookRoutes.put('/update-books/:id',updateBooks)
bookRoutes.delete('/delete-books/:id',deleteBook)

export default bookRoutes;


