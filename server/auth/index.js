const passport = require("passport")
const session = require("express-session")
const config = require("../config")

module.exports = (app)=>{
    app.use(session(config.session))
    app.use(passport.initialize())
    app.use(passport.session())
    require("./strategy")(passport)
}