import axios from 'axios'


const apiUrl = 'http://192.168.0.121:3000/v1/'

const api = axios.create({
    baseURL: apiUrl
})

export default api