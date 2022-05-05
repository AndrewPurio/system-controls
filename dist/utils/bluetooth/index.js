"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToBluetoothDevice = exports.serialComms = exports.discoverDevices = exports.deviceListener = exports.bluetooth = void 0;
const bluez_1 = __importDefault(require("bluez"));
exports.bluetooth = new bluez_1.default();
const deviceListener = () => {
    exports.bluetooth.on("device", async (address, props) => {
        console.log("[New] Device:", address, props.Name);
        const dev = await exports.bluetooth.getDevice(address);
        dev.on("PropertiesChanged", (props) => {
            console.log("[CHG] Device:", address, props);
        });
    });
};
exports.deviceListener = deviceListener;
const discoverDevices = async () => {
    (0, exports.deviceListener)();
    try {
        await exports.bluetooth.init();
        const adapter = await exports.bluetooth.getAdapter();
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
const serialComms = async () => {
    await exports.bluetooth.init();
};
exports.serialComms = serialComms;
const connectToBluetoothDevice = async (address) => {
    const device = await exports.bluetooth.getDevice(address);
    const paired = await device.Paired();
    const name = await device.Name();
    console.log("Name:", name);
    if (!paired) {
        try {
            await device.Pair();
        }
        catch (error) {
            throw error;
        }
    }
    try {
        await device.ConnectProfile(bluez_1.default.SerialProfile.uuid);
    }
    catch (error) {
        throw error;
    }
};
exports.connectToBluetoothDevice = connectToBluetoothDevice;
