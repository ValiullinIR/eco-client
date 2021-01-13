export default async () => {
    const response = await fetch('/api/admin/auth/me')

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}