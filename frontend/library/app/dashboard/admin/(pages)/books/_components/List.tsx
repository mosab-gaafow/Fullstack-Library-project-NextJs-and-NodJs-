"use client"

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios';
import Loading from '../loading';
import { columns } from '../Columns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { API } from '@/app/lib/config';
import { DataTable } from '@/components/data-table';

const List = () => {
    const router  = useRouter();

    const { isLoading, isError, data } = useQuery({
        queryKey: ['books'], // Update query key as necessary
        queryFn: () => axios.get(`${API}/books/get-all-books`).then(res => res.data), // Update to the correct endpoint
        staleTime: 3 * 1000,  // 3 seconds
        retry: 3 // retry fetching 3 times on failure
    });
    

    if (isLoading) {
        return <Loading />;  // Show a loading component while data is fetching
    }

    if (isError || !data || data.length === 0) {
        return <p>No Books available.</p>; // Handle errors or empty data
    }

    return (
        <div className='my-4 space-y-4 sm:p-6 lg:p-2'>
            <div className='flex justify-end'>
            <Button variant={'gafow'}
        onClick={() => router.push('/dashboard/admin/books/new')}
        >Create new Category</Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default List;
