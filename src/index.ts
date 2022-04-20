import express from "express"
import cors from "cors"
import { fetchUpdates } from "./utils/system"
import { scanBLEDevices } from "./utils/bluetooth"

const app = express()
const port = 3002

app.use(cors())

app.get("/", (request, response) => {
    scanBLEDevices()

    response.json("Hello World")
})

app.get("/reset", (request, response) => {
    response.json("Hello World")
})

app.get("/update", async (request, response) => {
    const { stdout } = await fetchUpdates()

    response.json( stdout.split("\n") )
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})