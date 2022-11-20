import { clear } from "console";
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/api";



const UserForm = () => {



    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate()


    function createUser() {
        if (name && email && password) {
            const user = {
                name,
                email,
                password,
            };

            api
                .post("/user", {
                    user_name: user.name,
                    user_email: user.email,
                    user_password: user.password,
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

        if (userId && name && email) {
            const user = {
                name,
                email,
            }

            api
                .put(`/user/${userId}`, {
                    user_name: user.name,
                    user_email: user.email,
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

    }



    function setUser() {
        if (dataResult !== undefined) {
            setIsUpdate(true)
            setUserId(dataResult.user_id)
            setName(dataResult.user_name)
            setEmail(dataResult.user_email)
        } else {
            setIsUpdate(false)
        }

    }



    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState(0)
    const [password, setPassword] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)





    useEffect(() => {
        setUser()
    }, [])


    return (
        <>
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

                {!isUpdate && <label>Senha</label>}
                {!isUpdate && <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Informe a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                }
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
        </>
    )

}

export default UserForm