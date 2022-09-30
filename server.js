import express from "express";
import jwt from "jsonwebtoken";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Carto-go backend",
            version: "1.0.0",
            description: "Carto-go backend API",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["server.js"],
};

const specs = swaggerJSDoc(options);

app.get("/", (req, res) => {
    res.redirect("/api/");
});

app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));

/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              description: Enter token
 */

/**
 * @swagger
 *  /name:
 *      post:
 *          summary: Returns the list of all the orders
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          properties:
 *                              name:
 *                                  type: string
 *                          example:
 *                              name: string
 *          responses:
 *              "200":
 *                  description: The list of the orders
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              properties:
 *                                  name:
 *                                      type: string
 */

app.post("/name", (req, res) => {
    console.log(req.headers);
    res.send(req.body);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
