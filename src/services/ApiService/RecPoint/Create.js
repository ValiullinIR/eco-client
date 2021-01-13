import config from "./config"

/**
 * @param {FormData | object | string} body - fd or body
 */
export default async (body) => {
    const response = await fetch(config.path, {
        method: "POST",
        body: body
    })

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}