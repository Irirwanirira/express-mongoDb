const express = require("express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const mongoose = require("mongoose")
const createServer = require("./server")
    
mongoose.connect("mongodb://localhost:27017/blog-app")
    .then(() => {
        const app = createServer()

        const options = {
            definition: {
              openapi: "3.1.0",
              info: {
                title: " Express API with Swagger",
                version: "0.1.0",
                description:
                  "This is a simple CRUD API application made with Express and documented with Swagger",
                license: {
                  name: "MIT",
                  url: "https://spdx.org/licenses/MIT.html",
                }
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
            swaggerUi.setup(specs, {
              explorer: true,
              customCssUrl:
                "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
            }),
            swaggerUi.setup(specs, { explorer: true })
          );

        app.listen(5000, () => {
            console.log("Server has started!")
        })
    })

