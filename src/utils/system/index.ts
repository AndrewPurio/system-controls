import { execute } from "../execute"

export const fetchUpdates = async () => {
    const { stdout, stderr } = await execute("sudo apt update")

    return { stdout, stderr }
}

export const applyUpgrades = async () => {
    const { stdout, stderr } = await execute("sudo apt upgrade -y")

    return { stdout, stderr }
}