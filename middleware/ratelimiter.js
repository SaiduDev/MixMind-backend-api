import rateLimit from "express-rate-limit";

export let loginLimit = rateLimit({
    windowMs: 60 * 60 *1000,
    max: 5,
    message:{
        success: false,
        message: "Too many login attempt, please try again after fifteen minutes."
    }
});