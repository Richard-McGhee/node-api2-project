const express = require('express')
const db = require('../data/db')
const router = express.Router()

router.get("/:id/comments", (req, res) => {
    const id = Number(req.params.id)

    db.findPostComments(id)
    .then(comments => {
        if(comments.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist or has no comments. Try creating a comment and try again." })
        } else{
            res.status(200).json({ data: comments })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

router.post("/:id/comments", (req, res) => {
    const id = Number(req.params.id)
    const { text } = req.body

    if(!text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else if(text){
        db.insertComment(req.body)
        .then(comment => {
            db.findCommentById(comment.id)
            .then(newComment => {
                res.status(201).json({ data: newComment})
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
        })
        .catch(err => {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
    } else{
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }
})

module.exports = router