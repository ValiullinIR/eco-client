import config from "./config"
/**
 * 
 * @param {string} id - Admin Id
 * @param {object} updates - Admin Object updates
 */ 
export default async (id, updates) => {
    const response = await fetch(`${config.path}id=${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({updates})
        })
}