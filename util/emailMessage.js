import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeMessage = async () => {
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "saidumkoroma99@gmail.com",
        subject: `Hello Saidu, A new user on MixMind Game`,
        html: `
            <h1>New Game user created!</h1>

            <p>
                There's is a new user on the MixMind Game
            </p>

           
        `
    });

    if (error) {
        console.log("Email failed:", error);
        return;
    }

    console.log("Email sent successfully:", data);
};