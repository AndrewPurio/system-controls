import Bluez from "bluez"

export const bluetooth = new Bluez()

export const deviceListener = () => {
    bluetooth.on("device", async (address, props) => {
        console.log("[New] Device:", address, props.Name)

        const dev = await bluetooth.getDevice(address)

        dev.on("PropertiesChanged", (props) => {
            console.log("[CHG] Device:", address, props)
        })
    })
}

export const discoverDevices = async () => {
    deviceListener()

    try {
        await bluetooth.init()

        const adapter = await bluetooth.getAdapter()
        await adapter.StartDiscovery()

        const isDiscoverable = await adapter.Discoverable()
        const isPairable = await adapter.Pairable()

        console.log("Discovering Devices...", isDiscoverable, isPairable)
    } catch (error) {
        console.log("Error:", error)
    }
}

export const serialComms = async () => {
    await bluetooth.init()
}

export const connectToBluetoothDevice = async (address: string) => {
    const device = await bluetooth.getDevice(address)
    const paired = await device.Paired()
    const name = await device.Name()

    console.log("Name:", name)

    if(!paired) {
        try {
            await device.Pair()
        } catch (error) {
            throw error
        }
    }

    try {
        await device.ConnectProfile(Bluez.SerialProfile.uuid)
    } catch (error) {
        throw error
    }
}