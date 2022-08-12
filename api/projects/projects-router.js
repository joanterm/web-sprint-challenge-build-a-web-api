const express = require("express")
const router = express.Router()
const Projects = require("./projects-model")
const {validateId, validateRequiredFields} = require("./projects-middleware")

//GET
router.get("/", (req, res, next) => {
   Projects.get()
   .then((result) => {
        res.status(200).json(result)
   }) 
   .catch(next)
})

//GET BY ID
router.get("/:id", validateId, (req, res) => {
    res.status(200).json(req.validatedId)
})

//POST
router.post("/", validateRequiredFields, (req, res, next) => {
    Projects.insert(req.validatedRequiredFields)
    .then((item) => {
        return Projects.get(item.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(next)
})

//PUT
router.put("/:id", validateId, validateRequiredFields, (req, res, next) => {
    Projects.update(req.params.id, req.validatedRequiredFields)
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(next)
})

//DELETE
router.delete("/:id", validateId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json(req.validatedId)
    })
    .catch(next)
})

//GET
router.get("/:id/actions", (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then((result) => {
        if(result == null) {
            res.status(404).json({message: "project doesn't exist"})
        } 
        res.status(200).json(result)  
    })
    .catch(next)
})


module.exports = router