import { AuthContext } from "./AuthContext"
import { useState, useEffect } from 'react';
import { User } from "../../types/User";
import { useApi } from '../../hooks/useApi';
import { Link } from "react-router-dom";


export const AuthProvider = ({ children }: { children: JSX.Element }) => {


    const [user, setUser] = useState<User | null>(null)
    const api = useApi()
    const storageData = localStorage.getItem('authToken')

    useEffect(() => {
        const validateToken = async () => {

            if (storageData) {
                const data = await api.validateToken(storageData)

                if (data.data) {
                    setUser(data.data)
                }
            }else{
                setUser(null)
                
            }


        }

        validateToken()
    }, [])

    // window.addEventListener('storage', () => {
    //     localStorage.removeItem('authToken')
    //     window.location.href = '/'
    // })

    const signin = async (email: string, password: string) => {


        const data = await api.signin(email, password)

        console.log(data.access_token);
        if (data) {
            setUser(data)
            setToken(data.access_token)
            return true
        }
        return false
    }

    const signout = async () => {
        await api.logout()
        setUser(null)
    }


    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}