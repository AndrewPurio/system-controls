"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadProcessManager = exports.updateGitRepository = void 0;
const execute_1 = require("../execute");
const updateGitRepository = async (target) => {
    const command = ["git", "pull"];
    if (target)
        command.push("-C", target);
    const { stdout, stderr } = await (0, execute_1.execute)(command.join(" "));
    return { stdout, stderr };
};
exports.updateGitRepository = updateGitRepository;
const reloadProcessManager = async (processName) => {
    const { stdout, stderr } = await (0, execute_1.execute)(`pm2 restart ${processName}`);
    return { stdout, stderr };
};
exports.reloadProcessManager = reloadProcessManager;