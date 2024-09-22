import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

export const port  = process.env.PORT;

export const prisma = new PrismaClient();
export const Jwt_Secret = process.env.JWT_SECRET_KEY


