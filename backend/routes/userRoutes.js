import express from 'express'
import { deleteUser, getAllUsers, loginUser, registerUser, updateUser } from '../controller/userController.js';
import { authentication } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register-user',  authentication, registerUser)
userRoutes.get('/get-all-users', getAllUsers)
userRoutes.put('/update-user/:id', authentication, updateUser)
userRoutes.delete('/delete-user/:id', authentication, deleteUser);

userRoutes.post('/login-user', loginUser)

export default userRoutes;
