const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "No title"
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)