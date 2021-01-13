import config from "./config"

export default async (id) => {
    const res = await fetch(`${config.path}?id=${id}`, {
        method: "DELETE"
    })
    if (!res.ok)
        throw new Error(res.statusText);
    return
}