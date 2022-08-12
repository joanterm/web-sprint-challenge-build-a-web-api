const express = require("express")
const router = express.Router()
const Projects = require("./projects-model")
const {validateId} = require("./projects-middleware")

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
router.get("/:id", validateId, (req, res) => {
    res.status(200).json(req.validatedId)
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

//DELETE
router.delete("/:id", validateId, (req, res) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json(req.validatedId)
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})

//GET
router.get("/:id/actions", (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then((result) => {
        if(result == null) {
            res.status(404).json({message: "project doesn't exist"})
        } 
        res.status(200).json(result)  
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})


module.exports = router