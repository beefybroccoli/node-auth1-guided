const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require("../users/users-model");

router.post('/register', async (req, res, next)=>{
    // res.json("reached register endpoint");
    try{
        const {username, password} = req.body;
        //hash the password 2^6 times
        const hashedPassword = bcrypt.hashSync(password, 6)
        //store username and hashedPassword in newuser
        const newUser = {username, password:hashedPassword};
        const result = await userModel.add(newUser);
        res.status(201).json(result);
    }catch(err){ 
        next(err)
    }
})

router.post('/login', async (req, res, next)=>{
    // res.json("reached login endpoint");
    try{
        //pull username and password from req.body
        const {username, password} = req.body;
        //verify that username exists
        const collection = await userModel.findBy({username, })
        const [user] = collection;
        if(!user){
            return next({status:403, message:'invalid username'});
        }
        //verify that password is legit
        const verifyPassword = bcrypt.compareSync(password, user.password);
        if (!verifyPassword){
            
            return next({status:403, message:"invalid password"});
        }else{
            //START SESSION (magic line)
            //create a session for the user
            //add a key to req.session to trigger the session into being stored, cookie sent...
            req.session.user = user;
            res.json({message:`welcome, ${user.username}`});
        }     

    }catch(err){
        next(err);
    }
})

router.get('/logout', async (req, res, next)=>{
    res.json("reached logout endpoint");
})










module.exports=router;