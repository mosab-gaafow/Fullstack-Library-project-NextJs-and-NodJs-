import express from 'express';

import chalk from 'chalk';
import userRoutes from './src/routes/userRoutes.js';
import { port } from './config.js';
import bookRoutes from './src/routes/bookRoute.js';
import loanRoutes from './src/routes/loanRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = port || 6500;

// routes
app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/loans', loanRoutes)


app.listen(PORT, () => {
    console.log(`${chalk.cyan.bold('Server is listening on Port :')} ${chalk.yellow.bold.italic(PORT)}`)
})