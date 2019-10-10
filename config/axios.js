const axios = require('axios')
const token = process.env.COLORIZE_TOKEN

const instance = axios.create({
    baseURL: "https://api.deepai.org/api/colorizer",
    headers: {
        Authorization: `Bearer token`
    }
})

module.exports = instance