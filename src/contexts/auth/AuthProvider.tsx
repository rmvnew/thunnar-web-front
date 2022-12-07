import { AuthContext } from "./AuthContext"
import { useState, useEffect } from 'react';
import { User } from "../../types/User";
import { useApi } from '../../hooks/useApi';



export const AuthProvider = ({ children }: { children: JSX.Element }) => {


    const [user, setUser] = useState<User | null>(null)
    const api = useApi()
    const storageData = localStorage.getItem('authToken')

    useEffect(() => {
        const validateToken = async () => {

            if (storageData) {
                const data = await api.validateToken()

                if (data.data) {
                    setUser(data.data)
                }
            } else {
                setUser(null)

            }


        }

        validateToken()
    }, [])



    const signin = async (email: string, password: string) => {




        const data = await api.signin(email, password)



        if (data) {





            if (data.name == "AxiosError") {

                return {
                    message: data.response.data.message,
                    code: data.response.data.statusCode,
                    status: false
                }
            } else {

               
                setUser(data)
                setToken(data.access_token)

                return {
                    message: 'pass',
                    code: 200,
                    status: true
                }
            }
        }
        return {
            message: 'fail',
            code: 0,
            status: false
        }
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