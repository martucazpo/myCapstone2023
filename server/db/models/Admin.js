const mongoose =require("mongoose")

const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
},{
    timestamps: true
})


module.exports = mongoose.model("Admin", adminSchema)