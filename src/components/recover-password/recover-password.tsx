
import { useState } from 'react';
import { AlertTypes } from '../../enums/enums';
import { api } from '../../hooks/useApi';
import { AlertTypesInterface } from '../../interfaces/AlertTypesInterface';
import { cpfMask } from '../../utils/mask';
import AlertMessage from '../AlertMessage';
import { RecoverInputPass, RecoverPassButtonSave, RecoverPassLabel, RecoverTitle } from './RecoverPasswordStyled';




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

    const [alertProps, setAlertProps] = useState({})
    const [open, setOpen] = useState(false);
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")



    return (
        <div>
            <RecoverTitle>Reconfigurar Senha</RecoverTitle>

            <RecoverPassLabel>CPF</RecoverPassLabel>
            <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Digite o cpf"
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.target.value))}
            />

            <RecoverPassLabel >Senha</RecoverPassLabel>

            <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <RecoverPassLabel >Repita a Senha</RecoverPassLabel>
            <RecoverInputPass
                className="form-control form-control-lg"
                type="password"
                placeholder="Digite a senha"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
            />


            <RecoverPassButtonSave onClick={checkPassword} variant="outlined">Registrar</RecoverPassButtonSave>

            {open && <AlertMessage props={alertProps} />}

        </div>
    )

}