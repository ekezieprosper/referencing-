const express = require("express")
const router = express.Router()
const { newComment, getOne, getAll, update, deletecomment } = require("../controllers/commentController")


router.post("/comments", newComment)
router.get("/getone", getOne)
router.get("/getAllComments", getAll)
router.put("/update-comment", update)
router.delete("/delete-comment", deletecomment)

module.exports = router