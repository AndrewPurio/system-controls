import noble from "noble"

export const scanBLEDevices = async () => {
    noble.startScanning()

    noble.on("discover", (state: any) => {
        console.log("State", state)
    })

    setTimeout(() => {
        noble.stopScanning()
    }, 10000)
}