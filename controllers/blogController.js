const blogDatabase = require("../models/blogmodel")
const commentDatabase = require("../models/commentModel")

exports.createPost = async(req, res)=>{
    try {
        const {tittle, desc} = req.body 

        const newPost = await blogDatabase.create({
            tittle,
            desc
        })

        res.status(201).json({
            message: "successfully uploaded blog post",
            data: newPost
        })
    } catch (error) {
        error.message
    }
}

exports.getAll = async(req, res)=>{
    try {
        const getAll = await blogDatabase.find()
        res.status(200).json({
            message: `there are ${getAll.length} in our database, and ther are listed below :`,
            data: getAll
        })
    } catch (error) {
        error.message
    }
}


exports.getOnePost = async(req, res)=>{
    try {
        const id = req.body.id
        const blog = await blogDatabase.findById(id)
        if (!blog) {
            res.status(400).json({
                message: "unable to get blog posted"
            })
        } else {
            res.status(201).json({
                data: blog
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.update = async(req, res)=>{
    try {
        const id = req.body.id
        const {tittle, desc} = req.body
        const updatePost = await blogDatabase.findByIdAndUpdate(id, {tittle, desc}, {new: true})

        if (!updatePost) {
         return   res.status(400).json({
                message:"Unable to update post"
            })
        } else {
            return res.status(200).json({
                message: "post updated successfully",
                data: updatePost
            })
        }
    } catch (error) {
        res.json({
        error: error.message

        })
    }
}

exports.deletePost = async(req, res)=>{
    try {
        const id = req.params.id

        const deletePost = await blogDatabase.findByIdAndDelete(id)
         await commentDatabase.deleteMany({
            post: id
         })
        
        if (!deletePost) {
            return res.status(400).json({
                message: "Unable to delete post"
            })
        } else {
            return res.status(200).json({
                message: "post deleted successfully",
               newData: {
                deletePost}
            })
        }
    } catch (error) {
        res.json({
            error: error.message
    
            })
    }
}