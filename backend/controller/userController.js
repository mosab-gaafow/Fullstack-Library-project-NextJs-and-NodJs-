import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Jwt_Secret, prisma } from '../config/config.js';


export const registerUser = async (req,res) => {

    try{
        
        const {fullname, phone, email, password, role, bookLoan} = req.body;

        const isUserExists = await prisma.user.findFirst({where: {
            fullname: fullname.toLowerCase(),
            phone,
            email: email.toLowerCase()
        }});

        if(isUserExists) {
            return res.status(400).send("Already Exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                fullname,
                phone,
                email,
                password : hashedPassword,
                role,
                bookLoan 
            }
        });

        return res.status(200).send(newUser);


    }catch(e) {
        console.log("error on registering user", e)
        return res.status(400).send(e.message)
    }

}

export const loginUser = async (req, res) => {

    try{

        const {email, password} = req.body;

        const isUserExists = await prisma.user.findUnique({where: {email: email.toLowerCase()}});
        if(!isUserExists) {
            return res.status(400).send("No Username found with this..");
        }

        const validPass = await bcrypt.compare(password, isUserExists.password);

        if(!validPass) {
            return res.status(400).send("Incorrect Password");
        }

        const token = jwt.sign({_id: isUserExists._id}, Jwt_Secret)  ;

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).send({
            message: {
                _id: isUserExists._id,
                email: isUserExists.email,
                password: isUserExists.password
            }
        });

    }catch(e) {
        console.log("error on login user", e)
        return res.status(400).send(e.message)
    }

}

export const getAllUsers = async(req, res) => {

    try{

        const users = await prisma.user.findMany();
        if(!users){
            return res.status(400).send("No Users Found");
        }

        return res.status(201).send(users);

    }catch(e) {
        console.log("error", e);
        return res.status(400).send(e.message)
    } 

}


export const updateUser = async (req, res) => {

    try{

        const {fullname, phone, email, password, role, bookLoan} = req.body;

        const users = await prisma.user.findUnique({where: {id: parseInt(req.params.id)}});
        if(!users) {
            return res.status(400).send("No User found with this Id..");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.update({where: {id: parseInt(req.params.id)}, data: {
            fullname: fullname.toLowerCase(),
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
            role,
            bookLoan,
        }});

        return res.status(201).send(newUser);

    }catch(e) {
        console.log("error at updating", e);
        return res.status(400).send(e.message)
    }

}


export const deleteUser = async (req, res) => {

    try{

        const user = await prisma.user.findUnique({where: {id: parseInt(req.params.id)}});
        if(!user) {
            return res.status(400).send("No User found with this Id..");
        }

        const delUser = await prisma.user.delete({where: {id: parseInt(req.params.id)}});

        return res.status(400).send("User Deleted Successfully.");

    }catch(e) {

    }

}