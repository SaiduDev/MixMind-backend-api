
export const validateCreateAccount = (req, res, next)=>{
    try {
         let {name, username, email, password } = req.body;
         if(!name || name.trim().length > 2 || typeof name !== "string"){
            return res.status(403).json({message: "enter a valid name"});
         }

         if(!username || username.trim().length < 5 || typeof username !== "string"){
            return res.status(403).json({message: "Enter a valid a username"});
         }

          if(!email || email.trim().length < 5 || typeof email !== "string" || !email.includes("@") || !email.includes(".")){
            return res.status(403).json({message: "Enter a valid a email address"});
         }

          if(!password || password.trim().length < 5 || typeof password !== "string" ){
            return res.status(403).json({message: "create a valid password"});
         }
         next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "failed to validate input field"});
    }
}