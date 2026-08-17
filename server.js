import express from "express";
import helmet from "helmet";
import cors from 'cors';
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
dotenv.config();

let app = express();

try {
   app.use(cors({
    origin: "https://mind-mix-game.vercel.app",
    methods:[ "GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
    
   }));
    app.use(helmet());
    app.use(express.json());

    app.use("/api", userRouter);

    let port = process.env.PORT || 8080;

    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`);
    })

} catch (error) {
    console.error(error);
}