import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import '../../common/css/bootstrap.min.css'
import { ModalDefault } from '../../components/Modal.default';
import { RecoverForm } from '../../components/recover-password/recover-password';
import { AlertTypes } from '../../enums/enums';
import { AlertTypesInterface } from '../../interfaces/AlertTypesInterface';
import AlertMessage from '../../components/AlertMessage';
import { LoginCard, LoginInputs, LoginTitle } from './LoginStyled';






const Login = () => {


    function showAlert(type: AlertTypes, message: string, time: number) {



        const props: AlertTypesInterface = {
            message: message,
            aletTypes: type,
            time: time
        }

        setAlertProps(props)

        setOpen(true)

        setTimeout(() => {
            setOpen(false)

        }, time)

    }


    const auth = useContext(AuthContext)


    const [email, setEmail] = useState('rmvnew@gmail.com')
    const [password, setPassword] = useState('12345')
    const [open, setOpen] = useState(false);
    const [alertProps, setAlertProps] = useState({})

    const handleLogin = async () => {

        if (email && password) {

            const isLogged = await auth.signin(email, password)

            console.log(isLogged.status);

            if (isLogged.status) {
                console.log('logou');
                showAlert(AlertTypes.SUCCESS, "Bem vindo!!", 1000)
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            } else {
                console.log('não logou');
                console.log(isLogged.code);
                if (isLogged.code === 401) {
                    showAlert(AlertTypes.ERROR, "Senha inválida", 4000)
                } else if (isLogged.code === 404) {
                    showAlert(AlertTypes.ERROR, "Usuário inválido", 4000)
                }
            }
        }



    }




    return (
        <>
            <LoginCard>
                <LoginInputs>
                    <LoginTitle>
                        <h2>Login</h2>
                    </LoginTitle>
                    
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

                    <ModalDefault body={<RecoverForm />} />

                    <button className='btn btn-primary' onClick={handleLogin}>Logar</button>
                </LoginInputs>
            </LoginCard>
            {open && <AlertMessage props={alertProps} />}
        </>
    )

}

export default Login