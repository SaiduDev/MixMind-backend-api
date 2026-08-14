import dotenv from 'dotenv';
import { Resend } from "resend";
dotenv.config();

let resend = new Resend(process.env.resend_api_Key);

export let sendWelcomeMessage = async (email, name) => {

    const {data, error }= await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Hello ${name} Welcome to MixMind Game `,
        html: `h1>Welcome to MixMind Game ${name}</h1>
        <p>We are excited to have you on board! Get ready to embark on an incredible journey of fun and excitement with MixMind Game. </p>
        <p>To get started, simply log in to your account and explore the amazing features we have in store for you. </p>`
    });
    if (error) {
        console.log("email failed", error);
        return
    }

    console.log("email sent successfully", data);
}