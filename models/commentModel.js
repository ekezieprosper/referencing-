const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: {type: String},

    post: {type: mongoose.SchemaTypes.ObjectId,
    ref: "blog"},
},{timestamps: true})


const commentDatabase = mongoose.model("comments", commentSchema)

module.exports = commentDatabase