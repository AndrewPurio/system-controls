"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const system_1 = require("./utils/system");
const bluetooth_1 = require("./utils/bluetooth");
const services_1 = require("./utils/services");
const app = (0, express_1.default)();
const port = 3002;
app.use((0, cors_1.default)());
app.get("/", (request, response) => {
    (0, bluetooth_1.scanBLEDevices)();
    response.json("Hello World");
});
app.get("/reset", (request, response) => {
    response.json("Hello World");
});
app.get("/update", async (request, response) => {
    await (0, system_1.fetchUpdates)();
    await (0, system_1.applyUpgrades)();
    response.json("Success");
});
app.get("/list/services", async (request, response) => {
    const files = await (0, services_1.listProjectDirectories)();
    response.json(files);
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
