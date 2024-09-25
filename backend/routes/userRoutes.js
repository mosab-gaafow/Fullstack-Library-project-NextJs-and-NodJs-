import express from 'express'
import { deleteUser, getAllUsers, getUserById, loginUser, registerUser, updateUser } from '../controller/userController.js';
import { authentication } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register-user',  registerUser)
userRoutes.get('/get-all-users', getAllUsers)
userRoutes.get('/get-userById/:id', getUserById)
userRoutes.patch('/update-user/:id',  updateUser)
userRoutes.delete('/delete-user/:id',  deleteUser);

userRoutes.post('/login-user', loginUser)

export default userRoutes;
