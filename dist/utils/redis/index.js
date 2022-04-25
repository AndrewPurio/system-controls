"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.setValue = exports.initializeDatabase = exports.redisClient = void 0;
const client_1 = require("@node-redis/client");
exports.redisClient = (0, client_1.createClient)();
const initializeDatabase = async () => {
    exports.redisClient.on("error", (error) => {
        console.log("Redis Client Error:", error);
    });
    await exports.redisClient.connect();
};
exports.initializeDatabase = initializeDatabase;
const setValue = async () => {
    await exports.redisClient.hSet("RestNode", "testField", 1);
    await exports.redisClient.hSet("RestNode", "next", "someString");
};
exports.setValue = setValue;
const getValue = async () => {
    const testField = await exports.redisClient.hGet("RestNode", "testField");
    const next = await exports.redisClient.hGet("RestNode", "next");
    console.log("Text Field:", testField);
    console.log("Next:", next);
};
exports.getValue = getValue;
