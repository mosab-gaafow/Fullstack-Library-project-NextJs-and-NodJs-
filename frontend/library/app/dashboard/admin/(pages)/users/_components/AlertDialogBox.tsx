import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { API } from '@/app/lib/config';
  
export const AlertDialogBox = async({id}: {id: string}) => {
    const queryClient = useQueryClient()
    const router = useRouter();

    const [loading, setLoading] = useState(false)

    const handleDelete = async() => {
        setLoading(true);
        try {
            await axios.delete(`${API}/users/delete-user/${id}`)
            queryClient.invalidateQueries({queryKey: ["user"]});

            toast.success("User Deleted Successful✅")
            // router.push('/dashboard/admin/category')
            setLoading(false)
        }catch(e){
            setLoading(false)
            console.log("error", e)
            toast.error("something went wrong please try again")
        }
    }

  return (
    <AlertDialog>
    <AlertDialogTrigger>
    {loading ?  <Button variant={'destructive'} className="flex justify-center items-center space-x-2 gap-x-1">
        
       <Loader2 className="animate-spin h-5 w-5 text-white"/>
      </Button> : <Button variant={'destructive'}>Delete</Button>}

    

    </AlertDialogTrigger>
    <AlertDialogContent className='bg-white text-black'>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='bg-red-600 hover:bg-red-300 text-white'
        onClick={handleDelete}
        >Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default AlertDialog
