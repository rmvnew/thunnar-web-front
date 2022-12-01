import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';




const Login = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('rmvnew@gmail.com')
    const [password, setPassword] = useState('12345')

    const handleLogin = async () => {

        if (email && password) {

            const isLogged = await auth.signin(email, password)

            if (isLogged) {
                navigate('/home')
            } else {
                alert('Não deu certo.')
            }
        }

       

    }

    return (
        <>
            <h2>Pagina fechada</h2>
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
        </>
    )

}

export default Login