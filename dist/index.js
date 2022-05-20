"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const system_1 = require("./utils/system");
const services_1 = require("./utils/services");
const constants_1 = require("./utils/constants");
const redis_1 = require("./utils/redis");
const bluetooth_1 = __importDefault(require("./routes/bluetooth"));
const bluetooth_2 = require("./utils/bluetooth");
const app = (0, express_1.default)();
const port = 3002;
(0, redis_1.initializeDatabase)();
app.use((0, cors_1.default)());
app.use("/bluetooth", bluetooth_1.default);
app.get("/", (request, response) => {
    response.json("Hello World");
});
app.get("/reset", (request, response) => {
    response.json("Hello World");
});
app.get("/update", async (request, response) => {
    const { stdout: fetchedUpdates } = await (0, system_1.fetchUpdates)();
    const { stdout: appliedUpgrades } = await (0, system_1.applyUpgrades)();
    const files = await (0, services_1.listProjectDirectories)();
    for (let index = 0; index < files.length; index++) {
        const dir = files[index];
        console.log("Dir:", dir);
        if (dir === "config")
            continue;
        const { stdout } = await (0, services_1.updateGitRepository)(constants_1.PROJECTS_FOLDER + "/" + dir);
        console.log("Changes:", stdout);
    }
    response.json({
        fetchedUpdates, appliedUpgrades, files
    });
});
app.get("/list/services", async (request, response) => {
    const files = await (0, services_1.listProjectDirectories)();
    response.json(files);
});
app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port}`);
    try {
        await (0, redis_1.getValue)();
        await (0, bluetooth_2.initBluetooth)();
    }
    catch (error) {
        console.log(error);
    }
});
process.on("exit", () => {
    redis_1.redisClient.quit();
});
