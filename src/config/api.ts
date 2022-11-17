import axios from 'axios'


const apiUrl = 'http://localhost:3800/'

const api = axios.create({
    baseURL: apiUrl
})

export default api