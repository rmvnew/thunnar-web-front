import { CreateClientButton, CreateClientInput, CreateClientlabel, CreateClientMain, CreateClientTitle } from "./CreateClientStyled"
import { useState } from 'react';
import { api } from "../../../hooks/useApi";
import { AlertTypes } from "../../../enums/enums";
import { AlertTypesInterface } from "../../../interfaces/AlertTypesInterface";
import AlertMessage from "../../AlertMessage";
import { phoneMask } from "../../../utils/mask";
import { toast } from 'react-toastify';
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { ImExit } from "react-icons/im";





export const CreateClient = (props: any) => {



    function msgError(msg: string, timer: number) {
        toast.error(msg, {
            position: "bottom-center",
            autoClose: timer,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }


    function createClient() {
        if (clientName && clientCpf && clientPhone) {
            const client = {
                name: clientName,
                cpf: clientCpf,
                phone: adjustingPhoneNumber(clientPhone)
            };

            

            api
                .post("/client", {
                    client_name: client.name,
                    client_phone: client.phone,
                    client_cpf: client.cpf
                })
                .then((res) => {

                    toast.success('Client cadastrado com sucesso!')
                    props.getNewClient({
                        client: res.data,
                        showModal: false
                    })

                })
                .catch((error) => {



                    if (error.response.data.message.indexOf('não pode ter mais que 11 caracteres!') >= 0) {
                        msgError('não pode ter mais que 11 caracteres!', 5000)
                    } else if (error.response.data.message.indexOf('não pode ter menos que 11 caracteres!') >= 0) {
                        msgError('não pode ter menos que 11 caracteres!', 5000)
                    } else if (error.response.data.message.indexOf('Cliente já cadastrado') >= 0) {
                        msgError('Cliente já cadastrado', 5000)
                    } else if (error.response.data.message.indexOf('Número de cpf inválido') >= 0) {
                        msgError('Número de cpf inválido', 5000)
                    } else {
                        msgError(`Error: ${error}`, 5000)
                    }
                });
        } else {
            msgError('Preencha todos dados',3000)
        }
    }


    const adjustingPhoneNumber = (phone: string) => {

        if (!phone) return ""
        phone = phone.replace(/[\() -]/gm, '')
        return phone
    }



    function cpfMask(cpf: string) {
        cpf = cpf.replace(/\D/g, "")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        setClientCpf(cpf)
    }

    const [clientName, setClientName] = useState("")
    const [clientCpf, setClientCpf] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [alertProps, setAlertProps] = useState({})
    const [open, setOpen] = useState(false);

    function exit() {
        props.afterCreate({
            showModal: false
        })
    }

    return (
        <>
            <CreateClientMain>
                <CreateClientTitle>Cadastro de clientes</CreateClientTitle>

                <div className="row">
                    <div className="col">
                        <CreateClientlabel>Nome do cliente</CreateClientlabel>
                        <CreateClientInput
                            className="form-control form-control"
                            type="text"
                            placeholder="Digite o nome do cliente"
                            maxLength={50}
                            value={clientName}
                            onChange={e => setClientName(e.target.value)}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <CreateClientlabel>Cpf do cliente</CreateClientlabel>
                        <CreateClientInput
                            className="form-control form-control"
                            type="text"
                            placeholder="Digite o cpf do cliente"
                            maxLength={14}
                            value={clientCpf}
                            onChange={e => cpfMask(e.target.value)}
                        />
                    </div>

                    <div className="col">
                        <CreateClientlabel>Telefone do cliente</CreateClientlabel>
                        <CreateClientInput
                            className="form-control form-control"
                            type="text"
                            placeholder="Digite o telefone do cliente"
                            maxLength={15}
                            value={clientPhone}
                            onChange={e => setClientPhone(phoneMask(e.target.value))}
                        />
                    </div>
                </div>

                <div>
                    <CreateClientButton className="btn btn-primary" onClick={createClient}><MdOutlinePlaylistAdd /> Salvar</CreateClientButton>
                    <CreateClientButton className="btn btn-secondary" onClick={exit}><ImExit/> Sair</CreateClientButton>
                </div>
            </CreateClientMain>
            {open && <AlertMessage props={alertProps} />}
        </>
    )
}