import { Router } from "express";
import { closeBluetoothInterface, connectToDevice, disconnectDevice, findBluetoothDevice, getAdapterInfo, getDevice } from "../../utils/bluetooth";

const router = Router()

router.get("/", async (request, response) => {
    response.json({
        message: "Successfully initialized bluetooth"
    })
})

router.get("/connect", async (request, response) => {
    const { query } = request
    const { name } = query

    if(!name) {
        response.statusCode = 400

        response.json({
            message: "Missing name query"
        })

        return
    }

    try {
        const device = await findBluetoothDevice(name as string)

        console.log("Device:", device)

        if(!device)
            throw Error("Device is not available")

        await connectToDevice(device)

        response.json({
            message: "Successfully connected: " + name
        })
    } catch (e) {
        const { message } = e as Error

        response.statusCode = 400

        response.json({
            message
        })
    }
})

router.get("/disconnect", async (request, response) => {
    const { query } = request
    const { address } = query

    if(!address) {
        response.statusCode = 400

        response.json({
            message: "Missing address query"
        })

        return
    }

    try {
        console.log(address)

        const device = await getDevice(address as string)
        const name = await device.Name()

        if(!device)
            throw Error("Device is not available")
            
        await disconnectDevice(device)

        response.json({
            message: "Successfully disconnected to: " + name
        })
    } catch (e) {
        const { message } = e as Error

        response.statusCode = 400

        response.json({
            message
        })
    }
})

router.get("/info", async (request, response) => {
    try {
        const info = await getAdapterInfo()

        response.json(info)
    } catch (e) {
        const { message } = e as Error
        response.statusCode = 500

        response.json({
            message
        })
    }
})

router.get("/close", async (request, response) => {
    try {
        await closeBluetoothInterface()

        response.json({
            message: "Successfully closed bluetooth interface"
        })
    } catch (e) {
        const { message } = e as Error
        response.statusCode = 500

        response.json({
            message
        })
    }
})

export default router