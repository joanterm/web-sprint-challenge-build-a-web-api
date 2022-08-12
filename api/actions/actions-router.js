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


module.exports = router