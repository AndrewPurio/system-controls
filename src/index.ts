import express from "express"
import cors from "cors"
import { applyUpgrades, fetchUpdates } from "./utils/system"
import { listProjectDirectories, updateGitRepository } from "./utils/services"
import { PROJECTS_FOLDER } from "./utils/constants"
import { getValue, initializeDatabase, redisClient, setValue } from "./utils/redis"
import bluetooth from "./routes/bluetooth"
import { initBluetooth } from "./utils/bluetooth"

const app = express()
const port = 3002

initializeDatabase()

app.use(cors())
app.use("/bluetooth", bluetooth)

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

        console.log("Dir:", dir)

        if(dir === "config")
            continue

        const { stdout } = await updateGitRepository(PROJECTS_FOLDER + "/" + dir)

        console.log("Changes:", stdout)
    }

    response.json({
        fetchedUpdates, appliedUpgrades, files
    })
})

app.get("/list/services", async (request, response) => {
    const files = await listProjectDirectories()
    
    response.json(files)
})

app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port}`)

    try {
        await getValue()

        await initBluetooth()
    } catch (error) {
        console.log(error)
    }
})

process.on("exit", () => {
    redisClient.quit()
})