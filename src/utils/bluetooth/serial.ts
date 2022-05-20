import Bluez from "bluez"
import { bluetooth } from "."

/**
 * Serial Profile for communicating with Bluetooth devices using serial
 * 
 * @param listener Serial profile listener
 */
export const registerSerialProfile = async (
    listener: (device: Bluez.Device, socket: Bluez.BluetoothSocket) => void
) => {
    try {
        await bluetooth.init()
        await bluetooth.registerSerialProfile(listener, "client")

    } catch (error) {
        throw error
    }
}

export {}