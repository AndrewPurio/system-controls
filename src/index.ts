import express from "express"
import cors from "cors"
import { applyUpgrades, fetchUpdates } from "./utils/system"
import { listProjectDirectories } from "./utils/services"

const app = express()
const port = 3002

app.use(cors())

app.get("/", (request, response) => {
    response.json("Hello World")
})

app.get("/reset", (request, response) => {
    response.json("Hello World")
})

app.get("/update", async (request, response) => {
    await fetchUpdates()
    await applyUpgrades()

    response.json("Success")
})

app.get("/list/services", async (request, response) => {
    const files = await listProjectDirectories()
    
    response.json(files)
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})