import axios from "axios";

const apiUrl = process.env.REACT_APP_API;
const token = localStorage.getItem('authToken')

export const api = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${token}` }
});


export const useApi = () => ({
  validateToken: async () => {


    const res = await api.post('/auth/validate')

    return res
  },
  signin: async (email: string, password: string) => {


    try {

      const response = await api.post('/auth/login', { email, password })

      return response.data
    } catch (error) {
      return error
    }
  },
  logout: async () => {

  },
});
