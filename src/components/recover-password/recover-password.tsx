import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { AlertTypes } from '../../enums/enums';
import { api } from '../../hooks/useApi';
import { AlertTypesInterface } from '../../interfaces/AlertTypesInterface';
import { cpfMask } from '../../utils/mask';
import AlertMessage from '../AlertMessage';
import './recover-password.css'




export const RecoverForm = () => {


    function checkPassword() {
        if (cpf && password && rePassword) {

            if (password === rePassword) {
                api.patch(`/user/changePassword/${cpf}/${password}`, {
                    cpf: cpf,
                    pass: password
                })
                    .then(response => {
                        showAlert(AlertTypes.SUCCESS, "senha alterada com sucesso", 4000)
                        setCpf("")
                        setPassword("")
                        setRePassword("")
                    })
            } else {
                showAlert(AlertTypes.WARNING, "Senhas não coincidem", 3000)
            }

        } else {
            showAlert(AlertTypes.WARNING, "Preencha todos campos", 3000)
        }
    }


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

    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    const [open, setOpen] = useState(false);
    const [alertProps, setAlertProps] = useState({})


    return (
        <div>
            <h3>Reconfigurar Senha</h3>
            <label >Cpf</label>
            <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Digite o cpf"
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.target.value))}
            />

            <label >Senha</label>
            <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label >Repita a Senha</label>
            <input
                className="form-control form-control-lg last"
                type="password"
                placeholder="Digite a senha"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
            />

            <Button onClick={checkPassword} className='btn-save' variant="outlined">Salvar</Button>

            {open && <AlertMessage props={alertProps} />}

        </div>
    )

}