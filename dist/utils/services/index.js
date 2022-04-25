"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadProcessManager = exports.updateGitRepository = exports.listProjectDirectories = void 0;
const promises_1 = require("fs/promises");
const constants_1 = require("../constants");
const execute_1 = require("../execute");
const listProjectDirectories = async () => {
    const files = await (0, promises_1.readdir)(constants_1.PROJECTS_FOLDER);
    return files;
};
exports.listProjectDirectories = listProjectDirectories;
const updateGitRepository = async (target) => {
    let command = "git pull";
    if (target)
        command = `git -C ${target} pull`;
    const { stdout, stderr } = await (0, execute_1.execute)(command);
    return { stdout, stderr };
};
exports.updateGitRepository = updateGitRepository;
const reloadProcessManager = async (processName) => {
    const { stdout, stderr } = await (0, execute_1.execute)(`pm2 restart ${processName}`);
    return { stdout, stderr };
};
exports.reloadProcessManager = reloadProcessManager;
