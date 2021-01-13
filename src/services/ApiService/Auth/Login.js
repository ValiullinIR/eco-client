export default async (login, password) => {
    const response = await fetch('/api/admin/auth/login', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            login,
            password
        })
    })

    if (response.ok)
        return await response.json()
    throw new Error("Ошибка")
}