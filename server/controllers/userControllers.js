const User = require("../db/models").User
const bcrypt = require("bcryptjs")

module.exports = {
    updateAUserProfile: (req, res) => {
        let { firstName, lastName, email, password } = req.body
        let userId = req.user._id
        let changedUser = Object.assign({}, { firstName, lastName, email })
        if (password !== "") {
            changedUser.password = bcrypt.hashSync(password, 10)
        }
        User
            .findOne({ email })
            .then(data => {
                if (data && data.firstName !== req.user.firstName && data.lastName !== req.user.lastName) {
                    return res.status(202).json({ message: `${email} is already registered to database` })
                } else {
                    User.findByIdAndUpdate({ _id: userId }, changedUser, { new: true })
                        .then(data => res.status(200).json({ _id:  data._id}))
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
}