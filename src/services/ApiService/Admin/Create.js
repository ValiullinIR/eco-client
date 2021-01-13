
/**
 * @param {FormData | object | string} admin - fd for admin
 */
export default async (admin) => {
    const response = await fetch('/api/admin', {
        method: "POST",
        headers: typeof admin === "string" ? { "Content-Type": "application/json" } : null,
        body: admin
    })

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}