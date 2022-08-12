// Write your "actions" router here!
const express = require("express")
const router = express.Router()
const Actions = require("./actions-model")

router.get("/", (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
    .catch(() => {
         res.status(500).json({message: "not found"})
    })
 })

module.exports = router