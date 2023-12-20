const express = require("express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const mongoose = require("mongoose")
const createServer = require("./server")

// const routes = require("./routes/routes")
    
mongoose.connect("mongodb://localhost:27017/blog-app")
    .then(() => {
        // const app = express()
        const app = createServer()
        // app.use(express.json())
        // app.use("/api", routes)
        const options = {
            definition: {
              openapi: "3.1.0",
              info: {
                title: "LogRocket Express API with Swagger",
                version: "0.1.0",
                description:
                  "This is a simple CRUD API application made with Express and documented with Swagger",
                license: {
                  name: "MIT",
                  url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                  name: "LogRocket",
                  url: "https://logrocket.com",
                  email: "info@email.com",
                },
              },
              servers: [
                {
                  url: "http://localhost:5000/api",
                },
              ],
            },
            apis: ["./routes/*.js"],
          };
          
          const specs = swaggerJsdoc(options);
          app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs),
            swaggerUi.setup(specs, { explorer: true })
          );

        app.listen(5000, () => {
            console.log("Server has started!")
        })
    })

