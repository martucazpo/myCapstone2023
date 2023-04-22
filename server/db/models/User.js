const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "Associate"
    },
    permissions: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Admin",
        default:null
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        rel: "Todo"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        rel: "Post"
    }],
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        rel: "Contact"
    }]
},{
    timestamps: true
})


module.exports = mongoose.model("User", userSchema)