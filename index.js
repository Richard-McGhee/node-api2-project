const express = require('express')
const db = require('./data/db')
const commentRouter = require('./routers/comment-router')

const server = express()
server.use(express.json())
server.use("/api/posts", commentRouter)



const port = 666
server.listen(port, () => console.log(`Server is up listening on Satan's port: ${port}`))