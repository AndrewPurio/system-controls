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
    const { address } = query;
    if (!address) {
        response.statusCode = 400;
        response.json({
            message: "Missing address query"
        });
        return;
    }
    try {
        const device = await (0, bluetooth_1.getDevice)(address);
        const name = await device.Name();
        await (0, bluetooth_1.connectToDevice)(device);
        response.json({
            message: "Successfully disconnected: " + name
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
        const device = await (0, bluetooth_1.getDevice)(address);
        const name = await device.Name();
        await (0, bluetooth_1.disconnectDevice)(device);
        response.json({
            message: "Successfully connected to: " + name
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
