import { useEffect, useState } from "react";
import api from "../config/api";
import "../common/css/bootstrap.min.css";
import "./User.css";

const User = () => {
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
          setOperation(!operation);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function clearOperation() {
    setName("");
    setEmail("");
    setPassword("");
  }

  function setUserToEdit(user: any) {
    
    if(user.user_name !== undefined){
        setName(user.user_name)
        setEmail(user.user_email)
    }
    
    
    
  }

  const [userEdit, setUserEdit] = useState({});
  const [operation, setOperation] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState<any[]>([]);

  const getUser = async () => {
    await api.get("/user").then((response) => setUsers(response.data));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    clearOperation();
    getUser();
  }, [operation]);

  useEffect(()=>{
    setUserToEdit(userEdit)
  },[userEdit])

  return (
    <>
      <h1>Gerenciamento de usuários</h1>

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

        <label>Senha</label>
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Informe a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="submit"
          value={"Salvar"}
          className="btn btn-primary"
          onClick={createUser}
        />
      </div>

      <table className="my-table table table-striped">
        <thead>
          <tr>
            <td>id</td>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Status</td>
            <td>Opções</td>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>{user.is_active === true ? "Ativo" : "Inativo"}</td>
                <td>
                  <input
                    type="submit"
                    value={"Editar"}
                    className="btn btn-warning"
                    onClick={() => setUserEdit({
                        user_id: user.user_id,
                        user_name: user.user_name,
                        user_email: user.user_email
                    })}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default User;
