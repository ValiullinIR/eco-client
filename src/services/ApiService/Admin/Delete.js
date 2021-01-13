export default async (id) => {
    const res = await fetch(`/api/admin?id=${id}`, {
        method: "DELETE"
    })
    if(!res.ok)
        throw new Error(res.statusText);
    return
}