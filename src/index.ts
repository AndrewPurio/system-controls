import express from "express"
import cors from "cors"
import { applyUpgrades, fetchUpdates } from "./utils/system"
import { listProjectDirectories, updateGitRepository } from "./utils/services"
import { bluetooth, discoverDevices } from "./utils/bluetooth"
import { PROJECTS_FOLDER } from "./utils/constants"

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
    const { stdout: fetchedUpdates } = await fetchUpdates()
    const { stdout: appliedUpgrades } = await applyUpgrades()

    const files = await listProjectDirectories()
    
    for(let index = 0; index < files.length; index++) {
        const dir = files[index]
        const { stdout } = await updateGitRepository(PROJECTS_FOLDER + "/" + dir)

        console.log("Changes:", stdout)
    }

    response.json({
        fetchedUpdates, appliedUpgrades
    })
})

app.get("/list/services", async (request, response) => {
    const files = await listProjectDirectories()
    
    response.json(files)
})

app.get("/scan/devices", async (request, response) => {
    await discoverDevices(bluetooth)

    response.json("Scanning for Devices...")
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})