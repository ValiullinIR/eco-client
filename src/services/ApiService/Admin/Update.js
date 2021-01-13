/**
 * @param {string} id - Admin Id
 * @param {object} updates - Admin Object updates
 */ 
export default async (id, updates) => {
    const response = await fetch(`/api/admin?id=${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({updates})
        })
}