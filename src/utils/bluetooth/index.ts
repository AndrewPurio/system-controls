// Reference: https://github.com/WaeCo/node-bluez
import Bluez, { Agent } from "bluez";

const bluetooth = new Bluez()

/**
 * Initialize bluetooth device discovery to enable connecting to discovered devices
 */
export const initBluetooth = async () => {
    try {        
        await bluetooth.init()
        const agent = new Agent(bluetooth, bluetooth.getUserServiceObject())
    
        await bluetooth.registerAgent(agent, "NoInputNoOutput")

        const adapter = await getAdapter()

        await adapter.StartDiscovery()
    } catch (error) {
        throw error
    }
}

/**
 * Ends bluetooth device discovery
 */
export const closeBluetoothInterface = async () => {
    try {
        await bluetooth.init()
        const adapter = await getAdapter()

        await adapter.StopDiscovery()
    } catch (error) {
        throw error
    }
}

/**
 * Get the bluetooth(bluez) device adapter
 */
export const getAdapter = async () => {
    try {
        await bluetooth.init()

        const adapter = await bluetooth.getAdapter()

        return adapter
    } catch (error) {
        throw error
    }
    
}

/**
 * Filters the discovered bluetooth devices by address
 * 
 * @param address Target bluetooth address of the device
 * @returns The device with the target address
 */
export const getDevice = async (address: string) => {
    try {
        await bluetooth.init()
   
        const device = bluetooth.getDevice(address)

        return device
    } catch (error) {
        throw error
    }
}

/**
 * Pair and Connect to the target bluetooth device
 * 
 * @param device The bluetooth device to connect to
 */
export const connectToDevice = async (device: Bluez.Device) => {
    try {
        const paired = await device.Paired()
        const name = await device.Name()

        if(paired)
            return

        await device.Pair()
        await device.ConnectProfile(Bluez.SerialProfile.uuid)

        console.log("Connected to:", name)
    } catch (error) {
        throw error
    }
}

/**
 * Removes the bluetooth device to the list of paired devices
 * 
 * @param device The bluetooth device to be disconnected
 */
export const disconnectDevice = async (device: Bluez.Device) => {
    try {
        const adapter = await getAdapter()

        await adapter.RemoveDevice(device)
    } catch (error) {
        console.log(error)
        throw error
    }
}