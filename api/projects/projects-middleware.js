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

module.exports = {
    validateId
}