import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { api } from "../../../hooks/useApi"
import { SearchClientButtonSearch, SearchClientLabel, SearchClientTitle } from "./SearchClientStyled"





export const SearchClient = (props: any) => {

    function callTeste() {

        props.exit({
            statusModal: false
        })

    }



    function setResponse(res: any) {

        props.setCurrentClient({
            client: res.data,
            status: false
        })

        

    }



    const [currentCpf, setCurrentCpf] = useState("")
    const [search, setSearch] = useState("")

    const searchClient = () => {
        setSearch(currentCpf)
    }


    const getUserByName = async (cpf: string = "") => {

        await api.get(`/client/cpf/${cpf}`).then((response) => {
            setResponse(response)
        }).catch(error =>{
            console.log('Error: ',error);
        })
    };




    useEffect(() => {
        if (search) {

            getUserByName(search)
        }
    }, [search])


    return (

        <>

            <SearchClientTitle>Busca de Cliente</SearchClientTitle>
            <SearchClientLabel>Busca por cpf</SearchClientLabel>
            <input
                className="form-control form-control "
                type="text"
                placeholder="Digite o cpf"
                value={currentCpf}
                onChange={(e) => setCurrentCpf(e.target.value)}

            />
            <SearchClientButtonSearch className="btn btn-primary" onClick={searchClient}>Buscar</SearchClientButtonSearch>
            <SearchClientButtonSearch className="btn btn-secondary" onClick={callTeste}>Sair</SearchClientButtonSearch>

        </>

    )
}