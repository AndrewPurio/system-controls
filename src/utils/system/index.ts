import { execute } from "../execute"

export const fetchUpdates = async () => {
    const { stdout, stderr } = await execute("sudo apt-get update")

    return { stdout, stderr }
}

export const applyUpgrades = async () => {
    const { stdout, stderr } = await execute("sudo apt-get upgrade -y")

    return { stdout, stderr }
}

export const pullChanges = async (targetDirectory?: string) => {
    let command = "git pull"

    if(targetDirectory)
        command = `git -C ${targetDirectory} pull`

    const { stdout, stderr } = await execute(command)

    return { stdout, stderr }
}

export const resetProcess = async () => {
    
}