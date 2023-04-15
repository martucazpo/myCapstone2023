if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const mongoose = require("mongoose")


module.exports = (app) => mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log("Tiny ears are listening...."))
        console.log("The mongoose is on the loose!")
    }).catch(err => console.log(err))