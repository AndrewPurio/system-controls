"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSerialProfile = void 0;
const _1 = require(".");
/**
 * Serial Profile for communicating with Bluetooth devices using serial
 *
 * @param listener Serial profile listener
 */
const registerSerialProfile = async (listener) => {
    try {
        await _1.bluetooth.init();
        await _1.bluetooth.registerSerialProfile(listener, "client");
    }
    catch (error) {
        throw error;
    }
};
exports.registerSerialProfile = registerSerialProfile;
