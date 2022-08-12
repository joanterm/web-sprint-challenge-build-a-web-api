const express = require('express');
const server = express();
server.use(express.json())

//ROUTER
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter)

//ERROR HANDLING MIDDLEWARE
server.use((err, req, res, next) => {
    res.status(500).json({message: "Server error 500"})
})

//SANITY CHECK
server.use("/", (req, res) => {
    res.send("Express working for sprint challenge!")
})


module.exports = server;
