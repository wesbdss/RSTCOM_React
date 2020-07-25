const requestUrl = process.env.REACT_APP_REQUEST_URL || 'http://localhost:3333'

const api = async (method, path, body) => {

    const response = await fetch(requestUrl + path, {
        method,
        body: body,
        // headers: {'Content-Type': 'multipart/form-data'},
        headers: {},
    })

    if (!response.ok) {
        throw Error(response.statusText)
    }
    const jsonResponse = await response.json()
    return jsonResponse
}

export default api