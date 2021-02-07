import config from "./config"

/**
 * @param {FormData | object | filter} admin - fd for admin
 */
export default async (filter) => {
    const response = await fetch(config.path, {
        method: "POST",
        body: filter
    })

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}