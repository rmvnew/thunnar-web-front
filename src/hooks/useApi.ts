import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

const api = axios.create({
  baseURL: apiUrl,
});

export const useApi = () => ({
  validateToken: async (token: string) => {},
  signin: async (email: string, password: string) => {
    const response = await api.post('/auth/login',{email,password})

    return response.data
  },
  logout: async () => {
    
  },
});
