"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
// import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { bookValidationSchema } from "@/app/validations/bookValidationSchema";
import { API } from "@/app/lib/config";
import { userValidationSchema } from "@/app/validations/userValidationSchema";
import { User } from "../Columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// FOR UPDATING

// interface Props{
//     category : Category
// }

const UserForm = ({ user }: { user?: User }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof userValidationSchema>>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      fullname: user?.fullname,
      phone: user?.phone,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    },
  });

  const onSubmit = async (values: z.infer<typeof userValidationSchema>) => {
    // setLoading(true);
    try {
      if (user) {
        await axios.patch(`${API}/users/update-user/${user.id}`, values);
      } else {
        await axios.post(`${API}/users/register-user`, values);
      }

      // cash si manually u update garee
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // toast.success("Category Registered Successful✅");
      toast.success(
        user ? "Successfully Updated User" : "Successfully registered User"
      );
      router.push("/dashboard/admin/users");
      // setLoading(false)
    } catch (e) {
      // setLoading(false)
      console.log("error in registering user", e);
      toast.error("Failed to register user");
    }
  };

  return (
    <>
      <Card className="max-w-xl mx-auto my-10">
        <CardHeader>
          <CardTitle>{user ? "Update user" : "Register user"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Fullname" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone Number</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter phone number"
          {...field}
          onChange={(e) => field.onChange(e.target.value.toString())}  // Convert input to string
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EMAIL</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email "
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MEMBER">MEMBER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="STAFF">STAFF</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <Button type="submit">Submit</Button> */}
              <SubmitButtonWithContent
                loading={form.formState.isSubmitting}
                isUpdate={!!user}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
};

export default UserForm;

export const SubmitButtonWithContent = ({
  loading,
  isUpdate,
}: {
  loading: boolean;
  isUpdate: boolean;
}) => {
  if (loading) {
    return (
      <Button variant={"gafow"} className="space-x-2">
        {isUpdate ? "Updating" : "Registering"} User
        <Loader2 className="animate-spin h-5 w-5 text-white" />
      </Button>
    );
  }

  return (
    <Button variant={"gafow"} type="submit">
      {isUpdate ? "Update User" : "Register User"}
    </Button>
  );
};
