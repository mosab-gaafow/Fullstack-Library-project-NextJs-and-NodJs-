"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
// import { AlertDialogBox } from "./_components/AlertDialog"
import { ArrowUpDown } from "lucide-react"
import { AlertDialogBox } from "./_components/AlertDialogBox"
export type User = {
    id: string
    fullname: string
    phone: string
    email: string,
    password: string,
    role: string
    createdAt: string
}


export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "fullname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fullname
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    // {
    //   accessorKey: "password",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Password
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     )
    //   },
    // },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    
    
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">Created At</div>,
      cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("createdAt")).toDateString();
      // const formattedtime = new Date(row.getValue("created")).toLocaleTimeString();
      
 
      return <div className="text-right font-medium">{formattedDate}</div>
    },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const userInfo = row.original
        
        const router = useRouter();

        return (
          <div className="space-x-2">
         {/* <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"> */}
         <Button className="bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 border border-gray-300 rounded shadow-sm"
         onClick={() => router.push(`/dashboard/admin/users/${userInfo.id}`)}
         >
          Update
          </Button>
          <AlertDialogBox id={userInfo.id.toString()}/>

          </div>
        )
      }
    }
  ]


