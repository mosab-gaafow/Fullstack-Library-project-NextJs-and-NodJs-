"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
// import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { bookValidationSchema } from "@/app/validations/bookValidationSchema";
import { Book } from "@prisma/client";
import { API } from "@/app/lib/config";



// FOR UPDATING

// interface Props{
//     category : Category
// }

const BookForm = ({book}: {book?: Book}) => {

    // 1 form aa u adeegsaneena Update iyo insert



    // cash si manually u update garee
    const queryClient = useQueryClient();
    const router = useRouter();


  const form = useForm<z.infer<typeof bookValidationSchema>>({
    
    defaultValues: {
      title: book?.title, // haduu jiro waa update-ka
      author: book?.author, 
      isbn: book?.title, 
      publisherYear: book?.publisherYear, 
      stockCount: book?.stockCount,
    },
  });

  const onSubmit = async (values: z.infer<typeof bookValidationSchema>) => {
    // setLoading(true);
    try{
        if(book) {
            await axios.patch(`${API}/admin/books/update-books${book.id}`, values)

        }else{
            await axios.post(`${API}/admin/books/register-book`, values);
        }

        
// cash si manually u update garee
        queryClient.invalidateQueries({queryKey: ["book"]})
        // toast.success("Category Registered Successful✅");
        toast.success(book ? "Successfully Updated Book" : "Successfully registered Book")
        router.push('/dashboard/admin/books')
        // setLoading(false)
    }catch(e) {
        // setLoading(false)
        console.log("error in registering category",e)
        toast.error("Failed to register Category");
    }


  };

  return (

    <> 
    <Card className="max-w-xl mx-auto my-10">
      <CardHeader>
        <CardTitle>{book ? "Update Category" : "Register Category"}</CardTitle>

      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisherYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
            <SubmitButtonWithContent loading={form.formState.isSubmitting} isUpdate={!!book}/> 

          </form>
        </Form>
      </CardContent>
    </Card>
    <Toaster />
</>
  );
};

export default BookForm;


export const SubmitButtonWithContent = ({loading, isUpdate}: {loading: boolean, isUpdate: boolean})=> {
    // wxuu soo celinaa updating..,regis..., update iyo register
    if(loading) {
      // hadu true yahy wxa la raba in laso bandhigo imaa updating.. ama registering.. oo lasocdo icon-ka loading0ka
      return (
        <Button variant={'gafow'} className="space-x-2">
          {isUpdate ? "Updating" : "Registering"}  Category
         <Loader2 className="animate-spin h-5 w-5 text-white"/>
        </Button>
      )
    }
  
    // hadusan loading ahyn
    return <Button variant={'gafow'} type="submit">
          {isUpdate ? "Update Category" : "Register Category"}
    </Button>
  
  }
  
