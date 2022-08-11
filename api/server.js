const express = require('express');
const server = express();
server.use(express.json())

//ROUTER
// const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter)


//SANITY CHECK
server.use("/", (req, res) => {
    res.send("Express working for sprint challenge!")
})


module.exports = server;
