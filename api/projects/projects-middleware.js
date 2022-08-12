// add middlewares here related to projects
const Projects = require("./projects-model")

const validateId = (req, res, next) => {
    Projects.get(req.params.id)
    .then((result) => {
        if(result == null) {
            res.status(404).json({message: "project doesn't exist"})
            return
        } 
        req.validatedId = result
        next()
    })
}

const validateRequiredFields = (req, res, next) => {
    if (typeof req.body.name !== "string" || req.body.name.trim() === "" || typeof req.body.description !== "string" || req.body.description.trim() === "" || typeof req.body.completed !== "boolean") {
        res.status(400).json({message: "name and description required"})
        return
    }
    req.validatedRequiredFields = {name: req.body.name, description: req.body.description, completed: req.body.completed}
    next()
}

module.exports = {
    validateId,
    validateRequiredFields
}