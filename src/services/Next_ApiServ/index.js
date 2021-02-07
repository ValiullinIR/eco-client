import axios from "axios"

const ApiService = {

}

const append_service = (service_name, path) => {
    ApiService[service_name] = {}
}

const append_endpoint = (service_name, name) => (url, method = "GET", headers = null, body = null) => {
    ApiService[service_name][name] = create_endpoint_fetch(url, method, headers, body)
}

const create_endpoint_fetch = (url, method = "GET", headers = null, body = null) => {
    return async (data) => {
        let res = await fetch(url, {
            method,
            headers,
            body
        })

        if(res.ok)
            return res.json()
        throw new Error(`Ошибка при ${method}${url}`)
    }
}

const create_endpoint_axios = (url, method = "GET", headers = null, body = null) => {
    return async (data) => {
        let res = await axios(url, {
            method,
            headers,
            data: body
        })

        if(res.ok)
            return res.json()
        throw new Error(`Ошибка при ${method}${url}`)
    }
}