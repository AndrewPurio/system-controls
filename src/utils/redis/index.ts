import { createClient } from "@node-redis/client"


export const redisClient = createClient()

export const initializeDatabase = async () => {
    redisClient.on("error", (error) => {
        console.log("Redis Client Error:", error)
    })

    await redisClient.connect()
}

export const setValue = async () => {
    await redisClient.hSet("RestNode", "testField", 1)
    await redisClient.hSet("RestNode", "next", "someString")
}

export const getValue = async () => {
    const testField = await redisClient.hGet("RestNode", "testField")
    const next = await redisClient.hGet("RestNode", "next")

    console.log("Text Field:", testField)
    console.log("Next:", next)
}