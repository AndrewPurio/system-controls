import express from "express"
import cors from "cors"

const app = express()
const port = 3002

app.use(cors())

app.get("/", (request, response) => {
    response.json("Hello World")
})

app.get("/reset", (request, response) => {
    response.json("Hello World")
})

app.get("/update", (request, response) => {
    response.json("Hello World")
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})