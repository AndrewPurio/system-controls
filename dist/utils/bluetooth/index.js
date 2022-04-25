"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialComms = exports.discoverDevices = exports.deviceListener = exports.bluetooth = void 0;
const bluez_1 = __importDefault(require("bluez"));
exports.bluetooth = new bluez_1.default();
const deviceListener = (bluetooth) => {
    bluetooth.on("device", async (address, props) => {
        console.log("[New] Device:", address, props.Name);
        const dev = await bluetooth.getDevice(address);
        dev.on("PropertiesChanged", (props) => {
            console.log("[CHG] Device:", address, props);
        });
    });
};
exports.deviceListener = deviceListener;
const discoverDevices = async (bluetooth) => {
    (0, exports.deviceListener)(bluetooth);
    try {
        await bluetooth.init();
        const adapter = await bluetooth.getAdapter();
        await adapter.StartDiscovery();
        const isDiscoverable = await adapter.Discoverable();
        const isPairable = await adapter.Pairable();
        console.log("Discovering Devices...", isDiscoverable, isPairable);
    }
    catch (error) {
        console.log("Error:", error);
    }
};
exports.discoverDevices = discoverDevices;
const serialComms = () => {
};
exports.serialComms = serialComms;
