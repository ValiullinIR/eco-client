import config from "./config"

/**
 * @param {FormData | object | string} admin - fd for admin
 */
export default async (filter) => {
    const response = await fetch(config.path, {
        method: "POST",
        headers: typeof admin === "string" ? { "Content-Type": "application/json" } : null,
        body: filter
    })

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}