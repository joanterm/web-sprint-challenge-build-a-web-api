// Pull your server into this file and start it

// Bring the port number from the process.env variable, 
// falling back to 9000 if process.env.PORT is undefined !!!
const server = require("./api/server")
const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})