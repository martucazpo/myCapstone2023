const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../db/models").User

module.exports = function (passport) {

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
        User.findOne({ email })
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

    passport.use('admin',
        new LocalStrategy((username, password, done) => {
            let adminPassword = bcrypt.hashSync("password", 10)
            if (username !== "admin") {
                return done(null, false, { message: "password or username do not match database." });
            }
            if (!bcrypt.compareSync(password, adminPassword)) {
                return done(null, false, { message: "password or username do not match database." });
            }
            return done(null, true);
        })
    );

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(doc => {
            return done(null, doc)
        }).catch(err => console.log(err));
    });
}