
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../hooks/useApi";
import './UserForm.css'



interface Profile {
    id: number;
    name: string;

}

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

            console.log('User: ',user);

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
                    console.log(resultError);

                    if (error.response.data.message == "O email informado não é válido!!") {
                        //ação ao email errado
                    }

                })
        } else {
            alert("Preencha todos dados")
        }

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
            setCpf(dataResult.user_cpf)
            setSelect(dataResult.user_profile)
            setOptions(dataResult.user_profile_id)
        } else {
            setIsUpdate(false)
        }

    }



    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState(0)
    const [password, setPassword] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [profile, setProfile] = useState<Profile[]>([])
    const [options,setOptions] = useState("")
    const [cpf,setCpf] = useState("")
    const [select,setSelect] = useState("")
    
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
            <div className="main">
                <h1>Formulário de usuários</h1>

                <div className="form">
                    <label>Nome</label>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Digite o nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>E-mail</label>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Digite o e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <label>Cpf</label>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Digite o cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />


                    {!isUpdate && <label>Senha</label>}
                    {!isUpdate && <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Informe a senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    }
                    <label>Perfil</label>
                    <select onChange={e => setOptions(e.target.value)} className="form-select form-select-lg mb-3" aria-label="Default select example">
                    <option selected>{select}</option>
                        {profile.map((data,i) => (

                        <option key={i} value={data.id}>{data.name}</option>
                        
                       ))}

                    </select>
                    <div className="btn-actions">

                        <input
                            type="submit"
                            value={"Novo"}
                            className="btn btn-primary"
                            onClick={clearOperation}

                        />

                        {!isUpdate && <input
                            type="submit"
                            value={"Salvar"}
                            className="btn btn-primary"
                            onClick={createUser}
                        />}


                        {isUpdate && <input
                            type="submit"
                            value={"Atualizar"}
                            className="btn btn-secondary"
                            onClick={updateUser}
                        />}

                    </div>
                </div>
            </div>
        </>
    )

}

export default UserForm