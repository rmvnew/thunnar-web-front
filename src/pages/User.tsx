import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../config/api";
import "../common/css/bootstrap.min.css";
import "./User.css";
import { NavLink } from "react-router-dom";

const User = () => {


  function setResponse(res: any) {

    setUsers(res.data.items)
    setPages(res.data.meta.totalPages)

  }

  const handleChange = (e: any, currentPage: any) => {
    setPage(currentPage)
  }


  const [users, setUsers] = useState<any[]>([])
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)

  const getUser = async (page: number = 1) => {

    await api.get(`/user?page=${page}&limit=8&sort=DESC&orderBy=ID`).then((response) => {
      setResponse(response)
    });
  };



  const deleteUser = async (user_id: number = 0) => {

    console.log(user_id);

    await api.delete(`/user/${user_id}`)
      .then(response => {
        getUser();
      }).catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    getUser();
  }, []);



  useEffect(() => {
    getUser(page);
  }, [page])


  return (
    <div className="main">
      <h1>Gerenciamento de usuários</h1>


      <section className="links">
        <NavLink to={"/user/form"} className="btn btn-primary newUser">Novo usuário</NavLink>
      </section>

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

                  <div className="d-flex justify-content-around base-options">

                    <NavLink to={"/user/form"} state={{
                      data: {
                        user_id: user.user_id,
                        user_name: user.user_name,
                        user_email: user.user_email
                      }
                    }} className="btn btn-warning">Editar</NavLink>

                    <button className="btn btn-danger btn-delete"
                      onClick={() => deleteUser(user.user_id)}
                    >Deletar</button>

                  </div>

                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
    </div>
  );
};

export default User;
