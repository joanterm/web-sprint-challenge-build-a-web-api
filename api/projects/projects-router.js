const express = require("express")
const router = express.Router()
const Projects = require("./projects-model")

router.get("/", (req, res) => {
   Projects.get()
   .then((result) => {
        res.status(200).json(result)
   }) 
   .catch(() => {
        res.status(404).json({message: "not found"})
   })
})

router.get("/:id", (req, res) => {
    Projects.get(req.params.id)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            res.status(200).json(result)
        }
    })
    .catch(() => {
        res.status(500).json({message: "The post information could not be retrieved"})
    })
})

module.exports = router