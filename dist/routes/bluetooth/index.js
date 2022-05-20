"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bluetooth_1 = require("../../utils/bluetooth");
const router = (0, express_1.Router)();
router.get("/", async (request, response) => {
    response.json({
        message: "Successfully initialized bluetooth"
    });
});
router.get("/connect", async (request, response) => {
    const { query } = request;
    const { name } = query;
    if (!name) {
        response.statusCode = 400;
        response.json({
            message: "Missing name query"
        });
        return;
    }
    try {
        const device = await (0, bluetooth_1.findBluetoothDevice)(name);
        console.log("Device:", device);
        if (!device)
            throw Error("Device is not available");
        await (0, bluetooth_1.connectToDevice)(device);
        response.json({
            message: "Successfully connected: " + name
        });
    }
    catch (e) {
        const { message } = e;
        response.statusCode = 400;
        response.json({
            message
        });
    }
});
router.get("/disconnect", async (request, response) => {
    const { query } = request;
    const { address } = query;
    if (!address) {
        response.statusCode = 400;
        response.json({
            message: "Missing address query"
        });
        return;
    }
    try {
        console.log(address);
        const device = await (0, bluetooth_1.getDevice)(address);
        const name = await device.Name();
        if (!device)
            throw Error("Device is not available");
        await (0, bluetooth_1.disconnectDevice)(device);
        response.json({
            message: "Successfully disconnected to: " + name
        });
    }
    catch (e) {
        const { message } = e;
        response.statusCode = 400;
        response.json({
            message
        });
    }
});
router.get("/info", async (request, response) => {
    try {
        const info = await (0, bluetooth_1.getAdapterInfo)();
        response.json(info);
    }
    catch (e) {
        const { message } = e;
        response.statusCode = 500;
        response.json({
            message
        });
    }
});
router.get("/close", async (request, response) => {
    try {
        await (0, bluetooth_1.closeBluetoothInterface)();
        response.json({
            message: "Successfully closed bluetooth interface"
        });
    }
    catch (e) {
        const { message } = e;
        response.statusCode = 500;
        response.json({
            message
        });
    }
});
exports.default = router;
