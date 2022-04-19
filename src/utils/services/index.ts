import { execute } from "../execute"

export const updateGitRepository = async (target?: string) => {
    const command = ["git", "pull"]

    if(target)
        command.push("-C", target)

    const { stdout, stderr } = await execute(command.join(" "))

    return { stdout, stderr }
}

export const reloadProcessManager = async (processName: string) => {
    const { stdout, stderr } = await execute(`pm2 restart ${processName}`)

    return { stdout, stderr }
}