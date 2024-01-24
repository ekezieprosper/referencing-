const express = require("express")
const router = express.Router()
const { createPost, getOnePost, getAll, update, deletePost } = require("../controllers/blogController")

router.post("/new-post", createPost)
router.get("/getone", getOnePost)
router.get("/getAllPost", getAll)
router.put("/update-comment", update)
router.delete("/delete-comment", deletePost)

module.exports = router