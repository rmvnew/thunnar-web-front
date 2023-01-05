


import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
import { api } from "../../hooks/useApi";
import { AlertTypes } from '../../enums/enums';
import { AlertTypesInterface } from '../../interfaces/AlertTypesInterface';
import { Profile } from "../../interfaces/Profile.interface";
import { cpfMask } from "../../utils/mask";
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity";
import { UserFormForm, UserFormLabel, UserFormMain, UserInputButton } from "./UserFormStyled";
import { MdOutlinePlaylistAdd, MdUpdate } from "react-icons/md";
import { BsCheckSquare } from "react-icons/bs";

const UserForm = () => {



    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate()


    function createUser() {
        if (name && email && password && cpf) {
            const user = {
                name,
                email,
                password,
                cpf,
                options
            };

            console.log('User: ', user);

            api
                .post("/user", {
                    user_name: user.name,
                    user_email: user.email,
                    user_password: user.password,
                    user_cpf: user.cpf,
                    user_profile_id: user.options
                })
                .then((response) => {
                    navigate("/user")
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert("Preencha todos dados")
        }
    }

    function updateUser() {

        if (userId && name && email && cpf) {
            const user = {
                name,
                email,
                cpf,
                options
            }

            api
                .put(`/user/${userId}`, {
                    user_name: user.name,
                    user_email: user.email,
                    user_cpf: user.cpf,
                    user_profile_id: user.options
                })
                .then(response => {

                    navigate("/user")
                })
                .catch(error => {
                    const resultError = {
                        statusCode: error.response.data.statusCode,
                        message: error.response.data.message
                    }

                    if (error.response.data.message == "O cpf informado é inválido!!") {


                        ShowAlert(AlertTypes.WARNING, "O cpf informado é inválido!!", 4000)

                    }

                    if (error.response.data.message == "O email informado não é válido!!") {

                        ShowAlert(AlertTypes.WARNING, "O email informado não é válido!!", 4000)

                    }

                })
        } else {
            alert("Preencha todos dados")
        }

    }


    function ShowAlert(type: AlertTypes, message: string, time: number) {

        setAlertTypes(type)
        setAlertMessage(message)
        setTime(time)
        setOpen(true)

        setTimeout(() => {
            setOpen(false)
            setAlertTypes("")
            setAlertMessage("")
        }, time)

    }

    function clearOperation() {
        setName("");
        setEmail("");
        setPassword("");
        setIsUpdate(false)
        setOptions("")
        setCpf("")
        setSelect("")
    }




    function setUser() {
        if (dataResult !== undefined) {
            setIsUpdate(true)
            setUserId(dataResult.user_id)
            setName(dataResult.user_name)
            setEmail(dataResult.user_email)
            setCpf(cpfMask(dataResult.user_cpf))
            setSelect(dataResult.user_profile)
            setOptions(dataResult.user_profile_id)
        } else {
            setIsUpdate(false)
        }

    }


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState(0)
    const [password, setPassword] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [profile, setProfile] = useState<Profile[]>([])
    const [options, setOptions] = useState("")
    const [select, setSelect] = useState("")
    const [cpf, setCpf] = useState("")
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const [alertTypes, setAlertTypes] = useState("")
    const [alertProps, setAlertProps] = useState({})
    const [time, setTime] = useState(0)

    useEffect(() => {

        const props: AlertTypesInterface = {
            message: alertMessage,
            aletTypes: alertTypes,
            time: time
        }

        setAlertProps(props)


    }, [alertTypes])

    const getProfile = async () => {
        await api.get('/profile')
            .then(response => {

                const profiles = []

                for (let prof in response.data) {

                    const profs: Profile = {

                        id: response.data[prof].profile_id,
                        name: response.data[prof].profile_name
                    }
                    profiles.push(profs)
                }

                setProfile(profiles)
            }).catch(error => {
                console.log('Error: ', error);
            })
    }



    useEffect(() => {
        setUser()
        getProfile()


    }, [])



    return (
        <>
            <AnimatePageOpacity>
                <UserFormMain >
                    <h1>Formulário de usuários</h1>

                    <UserFormForm >
                        <UserFormLabel>Nome</UserFormLabel>
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Digite o nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <UserFormLabel>E-mail</UserFormLabel>
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Digite o e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <UserFormLabel>Cpf</UserFormLabel>
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Digite o cpf"
                            value={cpf}
                            onChange={(e) => setCpf(cpfMask(e.target.value))}
                        />


                        {!isUpdate && <UserFormLabel>Senha</UserFormLabel>}
                        {!isUpdate && <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Informe a senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        }
                        <UserFormLabel>Perfil</UserFormLabel>
                        <select onChange={e => setOptions(e.target.value)} className="form-select form-select-lg mb-3" aria-label="Default select example">
                            <option defaultValue={select}>{select}</option>
                            {profile.map((data, i) => (

                                <option key={i} value={data.id}>{data.name}</option>

                            ))}

                        </select>
                        <div className="btn-actions">

                            <UserInputButton
                                className="btn btn-primary"
                                onClick={clearOperation}

                            ><BsCheckSquare/>  Novo</UserInputButton>

                            {!isUpdate && <UserInputButton
                                className="btn btn-primary "
                                onClick={createUser}
                            ><MdOutlinePlaylistAdd/> Salvar</UserInputButton>}


                            {isUpdate && <UserInputButton
                                className="btn btn-secondary "
                                onClick={updateUser}
                            ><MdUpdate/> Atualizar</UserInputButton>}

                        </div>
                    </UserFormForm>


                    {open && <AlertMessage props={alertProps} />}


                </UserFormMain>
            </AnimatePageOpacity>
        </>
    )

}

export default UserForm