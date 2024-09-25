// import React from 'react'
// import UserForm from '../_components/UserForm'
// import axios from 'axios';
// import { API } from '@/app/lib/config';
// import { notFound } from 'next/navigation';

// const UpdateUserPage = async({params}: {params: {id: string}}) => {
//   // let book;
//   // try{
//   //   const response = await axios.get(`${API}/books/get-book-byId/${params.id}`);
//   //   book = response.data; // Accessing the book data from the response
//   //   if (!book) notFound();

//   // }catch(e) {
//   //   console.log("not found",e)
//   //   notFound();
//   // }

//   let user;
//   try{
//     const response = await axios.get(`${API}/users/get-userById/${params.id}`);
//     user = response.data;
//     if(!user) notFound();
//   }catch(e){
//     console.log("notfound",e);
//     notFound();
//   }
//   return (
//     <div>
//       update user UpdateUserPage
//       <UserForm  user={user}/>
//     </div>
//   )
// }

// export default UpdateUserPage

import React from 'react'
import { notFound } from 'next/navigation';

import axios from 'axios';
import { API } from '@/app/lib/config';
import UserForm from '../_components/UserForm';

const UpdateUserForm = async({params}: {params: {id: string}}) => { // object ayu so celina id aana labaxena
  let user;
  try{
    const response = await axios.get(`${API}/users/get-userById/${params.id}`);
    user = response.data; // Accessing the user data from the response
    if (!user) notFound();

  }catch(e) {
    console.log("not found",e)
    notFound();
  }
  return (
    <div>
     <UserForm user={user}/>
    </div>
  )
}

export default UpdateUserForm
