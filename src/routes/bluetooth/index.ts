import { Router } from "express";
import { closeBluetoothInterface, connectToDevice, disconnectDevice, getDevice } from "../../utils/bluetooth";

const router = Router()

router.get("/", async (request, response) => {
    response.json({
        message: "Successfully initialized bluetooth"
    })
})

router.get("/connect", async (request, response) => {
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
        const device = await getDevice(address as string)
        const name = await device.Name()

        await connectToDevice(device)

        response.json({
            message: "Successfully disconnected: " + name
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
        const device = await getDevice(address as string)
        const name = await device.Name()

        await disconnectDevice(device)

        response.json({
            message: "Successfully connected to: " + name
        })
    } catch (e) {
        const { message } = e as Error

        response.statusCode = 400

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