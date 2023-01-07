import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import '../../common/css/bootstrap.min.css'
import { ModalLogin } from '../../components/Modal.login';
import { RecoverForm } from '../../components/recover-password/recover-password';
import { LoginCard, LoginInputs, LoginTitle, MotionImgLogo } from './LoginStyled';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';






const Login = () => {


    const msgToast = (msg: string, timer: number, type: boolean) => {
        if (type) {
            toast.success(msg, {
                position: "top-right",
                autoClose: timer,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else {
            toast.error(msg, {
                position: "bottom-center",
                autoClose: timer,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }


    const auth = useContext(AuthContext)


    const [email, setEmail] = useState('rmvnew@gmail.com')
    const [password, setPassword] = useState('12345')
   

    const handleLogin = async () => {

        if (email && password) {

            const isLogged = await auth.signin(email, password)

            console.log(isLogged.status);

            if (isLogged.status) {
                console.log('logou');
                msgToast('Bem vindo!!', 2000,true)
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            } else {
                console.log('não logou');
                console.log(isLogged.code);
                if (isLogged.code === 401) {
                    msgToast('Senha inválida', 4000,false)
                } else if (isLogged.code === 404) {
                    msgToast('Usuário inválido', 4000,false)
                }
            }
        }



    }




    return (
        <>
            <LoginCard>
                    
                <LoginInputs>
                    
                    <MotionImgLogo src={require('../../common/assets/logo.png')}></MotionImgLogo>

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

                    <ModalLogin body={<RecoverForm />} />

                    <button className='btn btn-primary' onClick={handleLogin}>Logar</button>
                </LoginInputs>
            </LoginCard>
            <script src="./smoke.js"></script>
            
        </>
    )

}

export default Login