function onlyAuthed(req, res, next){
    //only allow req to proceed if there is a session
    if(req.session.user){
        next()
    }else{
        next({status:403, message:"not for you"});
    }
}

module.exports = {onlyAuthed}