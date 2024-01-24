const commentDatabase = require("../models/commentModel")
const blogDatabase = require("../models/blogmodel")

exports.newComment = async(req, res)=>{
    try {
        const id = req.body.id
        const blog = await blogDatabase.findById(id)
        if (!blog) {
          return  res.status(404).json({
            message: "Blog not found"
          })
        }

        const comment = new commentDatabase(req.body)

        // post the comment into the comment feild in the blog model
        blog.comment.push(comment._id)
        comment.post = blog._id

        // save the changes into the database
        await blog.save()
        await comment.save()

        // send a suucess code/message
        res.status(201).json({
            message: "successfull posted a comment",
            data: comment
        })
    } catch (error) {
        error.message
    }
}

exports.getOne = async(req, res)=>{
    try {
        const id = req.body.id
        const comment = await commentDatabase.findById(id)
        if (!blog) {
            res.status(400).json({
                message: "unable to get comment posted"
            })
        } else {
            res.status(201).json({
                data: comment
            })
        }
    } catch (error) {
        error.message
    }
}

exports.getAll = async(req, res)=>{
    try {
        const getAll = await commentDatabase.find()
        res.status(200).json({
            message: `there are ${getAll.length} in our database, and ther are listed below :`,
            data: getAll
        })
    } catch (error) {
        error.message
    }
}

exports.update = async(req, res)=>{
    try {
        const id = req.body.id
        const {tittle, desc} = req.body
        const updatecomment = await commentDatabase.findByIdAndUpdate(id, {tittle, desc}, {new: true})

        if (!updatecomment) {
         return   res.status(400).json({
                message:"Unable to update comment"
            })
        } else {
            return res.status(200).json({
                message: "comment updated successfully",
                data: updatecomment
            })
        }
    } catch (error) {
        res.json({
        error: error.message

        })
    }
}

exports.deletecomment = async(req, res)=>{
    try {
        const id = req.params.id
        const deletecomment = await commentDatabase.findByIdAndDelete(id)
        
        if (!deletecomment) {
            return res.status(400).json({
                message: "Unable to delete comment"
            })
        } else {
            return res.status(200).json({
                message: "comment deleted successfully",
               newData: deletecomment
            })
        }
    } catch (error) {
        res.json({
            error: error.message
    
            })
    }
}