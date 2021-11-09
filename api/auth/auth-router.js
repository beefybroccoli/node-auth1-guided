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

        //verify that username exists

        //verify that password is legit

        //START SESSION (magic line)
    }catch(err){
        next(err);
    }
})

router.get('/logout', async (req, res, next)=>{
    res.json("reached logout endpoint");
})










module.exports=router;