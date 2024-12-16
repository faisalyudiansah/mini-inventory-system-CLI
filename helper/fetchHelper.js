async function fetchData(endpoint, options) {
    try {
        const res = await fetch(`http://localhost:8080${endpoint}`, options)
        if (res.ok) {
            return await res.json()
        }
    } catch (error) {
        throw new Error("Failed to fetch data")
    }
}

module.exports = fetchData
