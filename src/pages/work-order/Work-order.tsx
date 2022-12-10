import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { ImBin, ImPencil2 } from "react-icons/im"
import { NavLink } from "react-router-dom"
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { api } from "../../hooks/useApi"
import './Work-order.css'



export const WorkOrder = () => {

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
        <>
            <AnimatePageOpacity>
                <div className="main-work-order">
                    <div className="title">
                        <h1>Gerenciador de Ordem de Serviço</h1>
                    </div>

                    <section className="new-work-order">
                        <NavLink to={"/product/form"} className="btn btn-primary btn-work-order">Novo Produto</NavLink>
                    </section>

                    <input
                        className="form-control form-control-lg search-work-order"
                        type="text"
                        placeholder="Busca de usuários"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <table className="my-table table table-striped">
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>Nome</td>
                                <td>E-mail</td>
                                <td>Cpf</td>
                                <td>Perfil</td>
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
                                        <td>{user.user_cpf}</td>
                                        <td>{user.profile.profile_name}</td>
                                        <td>{user.is_active === true ? "Ativo" : "Inativo"}</td>
                                        <td>

                                            <div className="d-flex justify-content-around base-options">

                                                <NavLink to={"/user/form"} state={{
                                                    data: {
                                                        user_id: user.user_id,

                                                    }
                                                }} className="btn btn-warning"><ImPencil2 /></NavLink>

                                                <button className="btn btn-danger btn-delete"
                                                    onClick={() => deleteUser(user.user_id)}
                                                ><ImBin /></button>

                                            </div>

                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </div>
            </AnimatePageOpacity>
        </>
    )
}