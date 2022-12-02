import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

const api = axios.create({
  baseURL: apiUrl,
  
});


export const useApi = () => ({
  validateToken: async (token: string) => {

    const res = await api.post('/auth/validate', {}, { headers: { Authorization: `Bearer ${token}` } })

    return res
  },
  signin: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })

    return response.data
  },
  logout: async () => {

  },
});
