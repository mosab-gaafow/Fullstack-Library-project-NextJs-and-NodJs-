import express from 'express';

import chalk from 'chalk';
import userRoutes from './routes/userRoutes.js';

import bookRoutes from './routes/bookRoute.js';
import loanRoutes from './routes/loanRoutes.js';
import cookieParser from 'cookie-parser';
import { port } from './config/config.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = port || 5000;

// routes
app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/loans', loanRoutes)


app.listen(PORT, () => {
    console.log(`${chalk.cyan.bold('Server is listening on Port :')} ${chalk.yellow.bold.italic(PORT)}`)
})