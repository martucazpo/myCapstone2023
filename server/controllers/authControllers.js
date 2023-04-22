const passport = require("passport")

module.exports = {
    registerAUser: (req, res, next) => {
        passport.authenticate("register", (err, user, info) => {
            if (err) {
                return res.status(202).json(info)
            }
            if (user === false) {
                return res.status(202).json(info)
            } else {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.status(200).json({ _id: user._id })
                });
            }
        })(req, res, next)
    },
    loginAUser: (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err) {
                return res.status(202).json(info)
            }
            if (user === false) {
                return res.status(202).json(info)
            } else {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.status(200).json({ _id: user._id })
                });
            }
        })(req, res, next)
    },
    registerAnAdmin: (req, res, next) => {
        passport.authenticate("register-admin", (err, user, info) => {
            if (err) {
                return res.status(202).json(info)
            }
            if (user === false) {
                return res.status(202).json(info)
            } else {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.status(200).json({ _id: user._id })
                });
            }
        })(req, res, next)
    },
    loginAnAdmin: (req, res, next) => {
        passport.authenticate("login-admin", (err, user, info) => {
            if (err) {
                return res.status(202).json(info)
            }
            if (user === false) {
                return res.status(202).json(info)
            } else {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.status(200).json({ _id: user._id })
                });
            }
        })(req, res, next)
    },
    logoutAUser: (req, res) => {
        req.logout((err) => {
            if (err) {
                console.log(err)
            }
            return res.status(200).json({ message: "User is logged out."})
        }) 
    },
}