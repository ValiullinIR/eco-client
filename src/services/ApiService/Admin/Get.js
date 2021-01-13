
/**
 * 
 */
export default async () => {
    const response = await fetch('/api/admin')

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}