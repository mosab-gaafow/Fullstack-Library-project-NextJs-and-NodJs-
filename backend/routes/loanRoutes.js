import express from 'express'
// import { getAllUsers, registerUser } from '../controller/userController.js';
import { getAllLoans, registerLoan, updateLoans } from '../controller/loanController.js';

const loanRoutes = express.Router();

loanRoutes.post('/register-loan', registerLoan)
loanRoutes.get('/get-all-loans', getAllLoans)
loanRoutes.put('/update-loans/:id', updateLoans)
export default loanRoutes;
