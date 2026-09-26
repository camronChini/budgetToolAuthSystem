import express from 'express';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js'
import {protect} from '../middleware/auth.js'

const router = express.Router();

const cookieOptions = {
    //httpOnly means frontend js can't grab the JWT cookie
    httpOnly: true,
    //in production only https
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
}

//signs tokens

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
}

//registering a user

router.post('/register', async(req,res) => {
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: 'Please provide all fields.' });
    }

    const matchingRecord = await pool.query('SELECT * FROM users WHERE email = $1',[email]);

    if(matchingRecord.rowCount > 0){
        return res.status(400).json({message: 'Email address already in use.' });
    }


    //create a hashed password and go onto create new user as entered ata is present and valid
    const hashedPassword = await bcrypt.hash(password,10);
    
    const newUser = await pool.query(
        `INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING user_id, username, email`,
        [username, email, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].user_id);

    res.cookie('token',token,cookieOptions);

    return res.status(201).json({user: newUser.rows[0]});
})

//login route

router.post('/login',async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Provide all required fields.' });
    }

    const matchingRecord = await pool.query('SELECT * FROM users WHERE email = $1',[email]);

    if(matchingRecord.rowCount === 0){
        return res.status(400).json({message: 'Invalid credentials.' });
    }

    const userData = matchingRecord.rows[0];

    const isMatch = await bcrypt.compare(password,userData.password_hash);

    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials.'});
    }

    const token = generateToken(userData.user_id);

    res.cookie('token',token,cookieOptions);

    res.json({user: {id:userData.user_id, username: userData.username, email:userData.email}});

})


//return info of logged in user from protect middleware
router.get('/me', protect , async(req,res) => {
    res.json({useer : req.user})
})

//logout
router.post('/logout',(req,res) => {
    res.cookie('token','',{...cookieOptions,maxAge: 1});
    res.json({message: 'Logged out successfully.'});
})

export default router;