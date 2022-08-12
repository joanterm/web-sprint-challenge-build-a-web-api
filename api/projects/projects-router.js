const express = require("express")
const router = express.Router()
const Projects = require("./projects-model")

//GET
router.get("/", (req, res) => {
   Projects.get()
   .then((result) => {
        res.status(200).json(result)
   }) 
   .catch(() => {
        res.status(500).json({message: "not found"})
   })
})

//GET BY ID
router.get("/:id", (req, res) => {
    Projects.get(req.params.id)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "project doesn't exist"})
        } else {
            res.status(200).json(result)
        }
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})

//POST
router.post("/", (req, res) => {
    if (typeof req.body.name !== "string" || req.body.name.trim() === "" || typeof req.body.description !== "string" || req.body.description.trim() === "") {
        res.status(400).json({message: "name and description required"})
        return
    }
    Projects.insert(req.body)
    .then((item) => {
        return Projects.get(item.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})

//PUT
router.put("/:id", (req, res) => {
    if (typeof req.body.name !== "string" || req.body.name.trim() === "" || typeof req.body.description !== "string" || req.body.description.trim() === "" || typeof req.body.completed !== "boolean") {
        res.status(400).json({message: "name and description required"})
        return
    }
    Projects.update(req.params.id, req.body)
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})


module.exports = router