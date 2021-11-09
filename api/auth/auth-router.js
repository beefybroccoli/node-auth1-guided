const router = require("express").Router();



router.post('/register', async (req, res, next)=>{
    res.json("reached register endpoint");
})

router.post('/login', async (req, res, next)=>{
    res.json("reached login endpoint");
})

router.get('/logout', async (req, res, next)=>{
    res.json("reached logout endpoint");
})










module.exports=router;