import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../common/css/bootstrap.min.css'
import './Login.css'
import { ModalDefault } from '../../components/Modal.default';
import { RecoverForm } from '../../components/recover-password/recover-password';






const Login = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('rmvnew@gmail.com')
    const [password, setPassword] = useState('12345')

    const handleLogin = async () => {

        if (email && password) {

            const isLogged = await auth.signin(email, password)

            if (isLogged) {
                // navigate('/')
                window.location.href = '/'
            } else {
                alert('Não deu certo.')
            }
        }



    }

    const ChildComp: React.FC = () => <h2>This is a child component</h2>


    return (
        <>
            <div className="card">
                <div className="inputs">
                    <div className="myTop">
                        <h2>Login</h2>
                    </div>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                    <input
                        className='form-control form-control-lg'
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />

                    <ModalDefault body={<RecoverForm/>}/>

                    <button className='btn btn-primary' onClick={handleLogin}>Logar</button>
                </div>
            </div>
        </>
    )

}

export default Login