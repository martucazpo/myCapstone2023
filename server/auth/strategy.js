const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { User, Admin } = require("../db/models")

module.exports = function (passport) {

    passport.serializeUser((obj, done) => {
        if (obj instanceof Admin) {
            return done(null, { id: obj.id, type: 'Admin' })
        } else {
            return done(null, { id: obj.id, type: 'User' })
        }
    });

    passport.deserializeUser((obj, done) => {
        if (obj.type === 'Admin') {
            User.findOne({permissions: obj.id})
                .then(doc => done(null, doc))
                .catch(err => console.log(err))
        } else {
            User.findById(obj.id)
                .then(doc => done(null, doc))
                .catch(err => console.log(err));
        }
    });

    passport.use('login',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User
                .findOne({ email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: "password or email do not match database." });
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, { message: "password or email do not match database." });
                    }
                    return done(null, user);
                })
                .catch(err => console.log(err))
        })
    );

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User
            .findOne({ email })
            .then(user => {
                if (user) {
                    return done(null, false, { message: `${req.body.email} is already registered to the database` });
                } else {
                    let { firstName, lastName, email, role } = req.body
                    password = bcrypt.hashSync(password, 10)
                    let newUser = new User({ firstName, lastName, email, role, password });
                    newUser
                        .save()
                        .then(user => done(null, user))
                        .catch(err => done(err))
                }
            }).catch(err => done(err))
    }));

    passport.use('admin-login',
        new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
            let userId = req.user._id
            Admin
                .findOne({ userId })
                .then(data => {
                    if (!data) {
                        return done(null, false, { message: "Please check user permissions" })
                    }
                    if (username !== data.username || !bcrypt.compareSync(password, data.password)) {
                        return done(null, false, { message: "password or username do not match database." })
                    }
                    return done(null, data)
                })
        })
    );

    passport.use('register-admin',
        new LocalStrategy({ passReqToCallback: true }, (req, username = "admin", password = "password", done) => {
            let userId = req.user._id
            Admin
                .findOne({ userId })
                .then(data => {
                    if (data) {
                        return done(null, false, { message: "User is already registered as Admin" })
                    } else {
                        console.log("username ", username)
                        console.log("password ", password)
                        password = bcrypt.hashSync(password, 10)
                        let newAdmin = new Admin({ userId, username, password })
                        newAdmin
                            .save()
                            .then(data => done(null, data))
                            .catch(err => done(err))
                    }
                })
        })
    )
}