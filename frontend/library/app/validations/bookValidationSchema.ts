import {z} from 'zod';

export const bookValidationSchema = z.object({
    title: z.string().min(6, "title should be at least 3 characters..").max(100, "title should be less than 100 characters"),
    author: z.string().min(6, "author should be at least 3 characters..").max(100, "author should be less than 100 characters"),
    isbn: z.string().min(4, "name should be at least 3 characters..").max(100, "name should be less than 100 characters"),
    publisherYear: z.number(),
    stockCount: z.number().min(4, "name should be at least 3 characters..").max(100, "name should be less than 100 characters"),
})

