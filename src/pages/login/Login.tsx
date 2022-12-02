import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'




const Login = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('rmvnew@gmail.com')
    const [password, setPassword] = useState('12345')

    const handleLogin = async () => {

        if (email && password) {

            const isLogged = await auth.signin(email, password)

            if (isLogged) {
                navigate('/')
            } else {
                alert('Não deu certo.')
            }
        }



    }

    return (
        <>
            <div className="card">
                <div className="inputs">
                    <div className="myTop">
                        <h2>Login</h2>
                    </div>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />

                    <button onClick={handleLogin}>Logar</button>
                </div>
            </div>
        </>
    )

}

export default Login