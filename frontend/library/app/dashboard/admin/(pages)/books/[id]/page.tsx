import React from 'react'
import { notFound } from 'next/navigation';
import BookForm from '../_components/BookForm';

import prisma from '../../../../../../../../prisma/client';
import axios from 'axios';
import { API } from '@/app/lib/config';

const UpdateBookForm = async({params}: {params: {id: string}}) => { // object ayu so celina id aana labaxena
  let book;
  try{
    const response = await axios.get(`${API}/books/get-book-byId/${params.id}`);
    book = response.data; // Accessing the book data from the response
    if (!book) notFound();

  }catch(e) {
    console.log("not found",e)
    notFound();
  }
  return (
    <div>
     <BookForm book={book}/>
    </div>
  )
}

export default UpdateBookForm
