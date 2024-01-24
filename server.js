const express = require("express")
const blogRouter = require("./routers/blogRouter")
const commentRouter = require("./routers/commentRouter")
const app = express()
app.use(express.json())
app.use("/api/v1", blogRouter)
app.use("/api/v1", commentRouter)

const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.port
const dblink = process.env.dblink

mongoose.connect(dblink).then(()=>{
    console.log("database is successfully connected to database")

    app.listen(port, ()=>{
        console.log(`server is active on port: ${port}`);
    })
}).catch((error)=>{
    console.log("Bad internet connection");
})