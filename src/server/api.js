import axios from "axios";
const baseURL = process.env.VUE_APP_BASE_URL;
const server = axios.create({
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: baseURL
})

export default server;