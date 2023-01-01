
import { useEffect, useState } from "react"
import { api } from "../../../hooks/useApi"
import { SearchClientButtonSearch, SearchClientLabel, SearchClientTitle } from "./SearchClientStyled"
import { AlertTypes, ValidType } from '../../../enums/enums';
import { AlertTypesInterface } from "../../../interfaces/AlertTypesInterface"
import AlertMessage from "../../AlertMessage"
import { Validations } from '../../../common/validations';
import { ImExit } from "react-icons/im";
import { GoSearch } from "react-icons/go";





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


    function verifiCpf(cpf: string) {

        if (Validations.getInstance().validRegex(/[a-zA-Z!@#$%^&*(),.?":{}|<>]/gm, cpf)) {
            showAlert(AlertTypes.ERROR, "Não pode conter letras", 5000)
        } else {

            setCurrentCpf(cpf)

        }

    }



    const [currentCpf, setCurrentCpf] = useState("")
    const [search, setSearch] = useState("")
    const [alertProps, setAlertProps] = useState({})
    const [open, setOpen] = useState(false);

    const searchCurrentClient = () => {
        if (Validations.getInstance().verifyLength(currentCpf, 'cpf', 11, 11)) {
            setSearch(currentCpf)
        } else {
            showAlert(AlertTypes.ERROR, "Cpf deve conter 11 digitos!", 5000)
        }
    }


    const getUserByName = async (cpf: string = "") => {

        await api.get(`/client/cpf/${cpf}`).then((response) => {
            setResponse(response)
        }).catch(error => {

            if (error.response.data.message.indexOf('not found') >= 0) {

                showAlert(AlertTypes.ERROR, "Cliente não encontrado!", 5000)

            }

        })
    };




    useEffect(() => {
        if (search) {

            getUserByName(search)
        }
    }, [search])



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


    return (

        <>

            <SearchClientTitle>Busca de Cliente</SearchClientTitle>
            <SearchClientLabel>Busca por cpf</SearchClientLabel>
            <input
                className="form-control form-control "
                type="text"
                placeholder="Digite o cpf"
                value={currentCpf}
                onChange={(e) => verifiCpf(e.target.value)}

            />
            <SearchClientButtonSearch className="btn btn-primary" onClick={searchCurrentClient}><GoSearch/> Buscar</SearchClientButtonSearch>
            <SearchClientButtonSearch className="btn btn-secondary" onClick={callTeste}><ImExit/> Sair</SearchClientButtonSearch>
            {open && <AlertMessage props={alertProps} />}
        </>

    )
}