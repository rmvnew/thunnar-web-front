import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "../../common/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { api } from "../../hooks/useApi";
import { ImPencil2, ImBin } from "react-icons/im";
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity";
import { PaginationCardUser, UserBaseOption, UserBtnNewUser, UserInputSearch, UserMain, UserNewUser, UserTable, UserTableButton, UserTableButtonNavLink, UserTableTheadTd, UserTitle } from "./UserStyled";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const User = () => {


  function setResponse(res: any) {

    // console.log('Res: ',res);

    setUsers(res.data.items)
    setPages(res.data.meta.totalPages)

  }

  const handleChange = (e: any, currentPage: any) => {
    setPage(currentPage)
  }


  const [users, setUsers] = useState<any[]>([])
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const getUser = async (page: number = 1) => {

    await api.get(`/user?page=${page}&limit=8&sort=DESC&orderBy=ID`).then((response) => {

      setResponse(response)
    });
  };


  const getUserByName = async (page: number = 1, name: string = "") => {

    await api.get(`/user?page=${page}&limit=8&sort=DESC&orderBy=ID&user_name=${name}`).then((response) => {
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
    getUserByName(page, search)
  }, [search])

  useEffect(() => {
    getUser();
  }, []);



  useEffect(() => {
    getUser(page);
  }, [page])


  return (
    <AnimatePageOpacity>
      <UserMain >


        <UserTitle>Gerenciamento de usuários</UserTitle>



        <UserNewUser >
          <UserBtnNewUser to={"/user/form"} className="btn btn-primary"><AiOutlineAppstoreAdd/> Novo usuário</UserBtnNewUser>
        </UserNewUser>



        <UserInputSearch
          className="form-control form-control-lg "
          type="text"
          placeholder="Busca de usuários"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <UserTable >
          <thead>
            <tr>
              <UserTableTheadTd>Id</UserTableTheadTd>
              <UserTableTheadTd>Nome</UserTableTheadTd>
              <UserTableTheadTd>E-mail</UserTableTheadTd>
              <UserTableTheadTd>Cpf</UserTableTheadTd>
              <UserTableTheadTd>Perfil</UserTableTheadTd>
              <UserTableTheadTd>Status</UserTableTheadTd>
              <UserTableTheadTd>Opções</UserTableTheadTd>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>{user.user_cpf}</td>
                  <td>{user.profile.profile_name}</td>
                  <td>{user.is_active === true ? "Ativo" : "Inativo"}</td>
                  <td>

                    <UserBaseOption >

                      <UserTableButtonNavLink to={"/user/form"} state={{
                        data: {
                          user_id: user.user_id,
                          user_name: user.user_name,
                          user_email: user.user_email,
                          user_cpf: user.user_cpf,
                          user_profile: user.profile.profile_name,
                          user_profile_id: user.profile.profile_id,
                        }
                      }} className="btn btn-warning"><ImPencil2 /></UserTableButtonNavLink>

                      <UserTableButton className="btn btn-danger"
                        onClick={() => deleteUser(user.user_id)}
                      ><ImBin /></UserTableButton>

                    </UserBaseOption>

                  </td>
                </tr>
              ))}
          </tbody>
        </UserTable>

        <PaginationCardUser>
          <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
        </PaginationCardUser>
      </UserMain>
    </AnimatePageOpacity>
  );
};

export default User;
