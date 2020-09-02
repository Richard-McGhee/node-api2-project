const express = require('express')
const db = require('./data/db')
const commentRouter = require('./routers/comment-router')

const server = express()
server.use(express.json())
server.use("/api/posts", commentRouter)

server.get("/", (req, res) => {
    if(req){
        res.status(200).json({ greeting: "We're Live"})
    } else{
        res.status(500).json({ errorMessage: "Something Broke"})
    }
})

server.get("/api/posts", (req, res) => {
    db.find()
    .then(posts => res.status(200).json({ data: posts }))
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.get("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id)

    db.findById(id)
    .then(post => {
        if(post.length === 1){
            res.status(200).json({ data: post })
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.post("/api/posts", (req, res) => {
    const { title, contents } = req.body

    if(title && contents){
        db.insert(req.body)
        .then(post => res.status(201).json({ data: post }))
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    } else if(!title || !contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else{
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

server.delete("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id)

    db.remove(id)
    .then(post => {
        if(post){
            res.status(204).end()
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})

const port = 666
server.listen(port, () => console.log(`Server is up listening on Satan's port: ${port}`))