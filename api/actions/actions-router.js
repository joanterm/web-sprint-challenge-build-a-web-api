// Write your "actions" router here!
const express = require("express")
const router = express.Router()
const Actions = require("./actions-model")

//GET
router.get("/", (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(() => {
         res.status(500).json({message: "not found"})
    })
 })

 //GET BY ID
router.get("/:id", (req, res) => {
    Actions.get(req.params.id)
    .then((result) => {
        if(result == null) {
            res.status(404).json({message: "doesn't exist"})
            return
        }
        res.status(200).json(result)
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})

//POST
router.post("/", (req, res) => {
    if(typeof req.body.project_id !== "number" || typeof req.body.description !== "string" || req.body.description.trim() === "" || typeof req.body.notes !=="string" || req.body.notes.trim() === "" || typeof req.body.completed !== "boolean") {
        res.status(400).json({message: "all fields required"})
        return
    }
    Actions.insert(req.body)
    .then((item) => {
        return Actions.get(item.id)
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
    if(typeof req.body.project_id !== "number" || typeof req.body.description !== "string" || req.body.description.trim() === "" || typeof req.body.notes !=="string" || req.body.notes.trim() === "" || typeof req.body.completed !== "boolean") {
        res.status(400).json({message: "all fields required"})
        return
    }
    Actions.update(req.params.id, req.body)
    .then(() => {
        return Actions.get(req.params.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})

//DELETE
router.delete("/:id", (req, res) => {
    Actions.get(req.params.id)
    .then((result) => {
        if(result == null) {
            res.status(404).json({message: "action doesn't exist"})
            return
        }
        Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(result)
        })
    })
    .catch(() => {
        res.status(500).json({message: "not found"})
    })
})

module.exports = router