const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    timeseries: true
})

module.exports = mongoose.model("Todo", todoSchema)

