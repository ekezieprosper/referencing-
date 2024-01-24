const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    tittle: {type: String, 
        required: true},

    desc:{type: String, 
        required: true},

    comment:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "comments"
    }]
}, {timestamps: true})

const blogDatabase = mongoose.model("blog", blogSchema)

module.exports = blogDatabase