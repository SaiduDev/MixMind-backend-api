import dotenv from "dotenv";
import { Resend } from "resend";
import pool from "../config/db.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeMessage = async (name, total_user, time) => {



    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "saidumkoroma99@gmail.com",
        subject: `Hello Saidu, A new user on MixMind Game`,
        html: `
            <h1>New user account created on Mix Mind Game</h1>

    
            <p>User Name: ${name}</p>
            <p>Total Users: <strong>${total_user.rows[0].total_user}</strong></p>
            <p>Date: <strong>${time}</strong></p>

           
        `
    });

    if (error) {
        console.log("Email failed:", error);
        return;
    }

    console.log("Email sent successfully:", data);
};