import config from "./config"
/**
 * 
 */
export default async () => {
    const response = await fetch(config.path)

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}