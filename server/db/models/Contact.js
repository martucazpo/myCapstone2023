const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    rel: String,
    email1label: String,
    email1: String,
    email2label: String,
    email2: String,
    labelfortel1: String,
    tel1: Number,
    labelfortel2: String,
    tel2: Number,
    labelforaddress: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    notes: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Contact", contactSchema)