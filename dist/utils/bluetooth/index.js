"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDevice = exports.connectToDevice = exports.getDevice = exports.getAdapter = exports.closeBluetoothInterface = exports.initBluetooth = void 0;
// Reference: https://github.com/WaeCo/node-bluez
const bluez_1 = __importStar(require("bluez"));
const bluetooth = new bluez_1.default();
/**
 * Initialize bluetooth device discovery to enable connecting to discovered devices
 */
const initBluetooth = async () => {
    try {
        await bluetooth.init();
        const agent = new bluez_1.Agent(bluetooth, bluetooth.getUserServiceObject());
        await bluetooth.registerAgent(agent, "NoInputNoOutput");
        const adapter = await (0, exports.getAdapter)();
        await adapter.StartDiscovery();
    }
    catch (error) {
        throw error;
    }
};
exports.initBluetooth = initBluetooth;
/**
 * Ends bluetooth device discovery
 */
const closeBluetoothInterface = async () => {
    try {
        await bluetooth.init();
        const adapter = await (0, exports.getAdapter)();
        await adapter.StopDiscovery();
    }
    catch (error) {
        throw error;
    }
};
exports.closeBluetoothInterface = closeBluetoothInterface;
/**
 * Get the bluetooth(bluez) device adapter
 */
const getAdapter = async () => {
    try {
        await bluetooth.init();
        const adapter = await bluetooth.getAdapter();
        return adapter;
    }
    catch (error) {
        throw error;
    }
};
exports.getAdapter = getAdapter;
/**
 * Filters the discovered bluetooth devices by address
 *
 * @param address Target bluetooth address of the device
 * @returns The device with the target address
 */
const getDevice = async (address) => {
    try {
        await bluetooth.init();
        const device = bluetooth.getDevice(address);
        return device;
    }
    catch (error) {
        throw error;
    }
};
exports.getDevice = getDevice;
/**
 * Pair and Connect to the target bluetooth device
 *
 * @param device The bluetooth device to connect to
 */
const connectToDevice = async (device) => {
    try {
        const paired = await device.Paired();
        const name = await device.Name();
        if (paired)
            return;
        await device.Pair();
        await device.ConnectProfile(bluez_1.default.SerialProfile.uuid);
        console.log("Connected to:", name);
    }
    catch (error) {
        throw error;
    }
};
exports.connectToDevice = connectToDevice;
/**
 * Removes the bluetooth device to the list of paired devices
 *
 * @param device The bluetooth device to be disconnected
 */
const disconnectDevice = async (device) => {
    try {
        const adapter = await (0, exports.getAdapter)();
        await adapter.RemoveDevice(device);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.disconnectDevice = disconnectDevice;
