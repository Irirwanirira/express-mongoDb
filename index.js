const express = require("express")
const mongoose = require("mongoose")
const createServer = require("./server")

const routes = require("./routes")
    
mongoose.connect("mongodb://localhost:27017/blog-app")
    .then(() => {
        // const app = express()
        const app = createServer()
        // app.use(express.json())
        // app.use("/api", routes)

        app.listen(5000, () => {
            console.log("Server has started!")
        })
    })

