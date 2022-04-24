import { execute } from "../execute"

export const updateGitRepository = async (target?: string) => {
    let command = "git pull"

    if (target)
        command = `git -C ${target} pull`

    const { stdout, stderr } = await execute(command)

    return { stdout, stderr }
}

export const reloadProcessManager = async (processName: string) => {
    const { stdout, stderr } = await execute(`pm2 restart ${processName}`)

    return { stdout, stderr }
}