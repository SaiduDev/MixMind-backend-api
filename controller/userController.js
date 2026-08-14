import pool from "../config/db.js";
import { sendWelcomeMessage } from "../util/emailMessage.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import { Resend } from "resend";
dotenv.config();


const createAccount = async (req, res) => {
    try {
        let {name, username, email, password } = req.body;

        let checkEmail = await pool.query("SELECT * FROM game_users WHERE email = $1", [email]);

        if(checkEmail.rows.length > 0){
            return res.status(404).json({message: "email already existed"})
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await pool.query("INSERT INTO game_users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [name, username, email, hashedPassword]);

        let token = jwt.sign(
            {id: newUser.rows[0].id},
            process.env.process.env.JWT_Secret,
            {expiresIn: "1d"}
        );

        res.status(201).json({
            message: "account created successfully",
            token,
            user: newUser.rows[0]
        })
        sendWelcomeMessage(email, name);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}


export const userLogin = async (req, res) => {
    try {
        let {email, password} = req.body;

        let verifyEmail = await pool.query("SELECT * FROM game_users WHERE email = $1 ", [email]);

        if(verifyEmail.rows.length === 0){
            return res.status(404).json({message: "Account Not Found"});
        }

        let user = verifyEmail.rows[0];

        let checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(401).json({message: "wrong password, please try again"});
        }

        let token = jwt.sign(
            {id: user.id},
            process.env.JWT_Secret,
            {expiresIn: "1d"}
        );

  res.status(201).json({token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}