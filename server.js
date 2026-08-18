import express from "express";
import helmet from "helmet";
import cors from 'cors';
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import { testConnection } from "./config/db.js";
dotenv.config();

let app = express();

try {
   app.use(cors({
    origin: "https://mix-mind-game.vercel.app",
    methods:[ "GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
   }));
    app.use(helmet());
    app.use(express.json({limit: "10kb"}));

    app.use("/api", userRouter);

    let port = process.env.PORT || 8080;
   testConnection();
    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`);
    })

} catch (error) {
    console.error(error);
}