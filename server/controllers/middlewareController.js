

module.exports = {
    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        else res.status(202).json({ message: "Please log in."})
    }
}