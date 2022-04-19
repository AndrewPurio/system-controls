"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyUpgrades = exports.fetchUpdates = void 0;
const execute_1 = require("../execute");
const fetchUpdates = async () => {
    const { stdout, stderr } = await (0, execute_1.execute)("sudo apt update");
    return { stdout, stderr };
};
exports.fetchUpdates = fetchUpdates;
const applyUpgrades = async () => {
    const { stdout, stderr } = await (0, execute_1.execute)("sudo apt upgrade -y");
    return { stdout, stderr };
};
exports.applyUpgrades = applyUpgrades;
