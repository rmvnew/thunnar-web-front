import { AuthContext } from "./AuthContext"
import { useState } from 'react';
import { User } from "../../types/User";
import { useApi } from '../../hooks/useApi';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {


    const [user, setUser] = useState<User | null>(null)
    const api = useApi()

    const signin = async (email: string, password: string) => {

       
        
        const data = await api.signin(email, password)

        

        if (data) {
            setUser(data)
            return true
        }
        return false
    }

    const signout = async () => {
        await api.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}