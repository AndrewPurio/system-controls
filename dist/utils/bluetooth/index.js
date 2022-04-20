"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanBLEDevices = void 0;
const noble_1 = __importDefault(require("noble"));
const scanBLEDevices = async () => {
    noble_1.default.startScanning();
    noble_1.default.on("discover", (state) => {
        console.log("State", state);
    });
    setTimeout(() => {
        noble_1.default.stopScanning();
    }, 10000);
};
exports.scanBLEDevices = scanBLEDevices;
