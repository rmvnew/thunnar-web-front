import { CreateClientButton, CreateClientInput, CreateClientlabel, CreateClientMain, CreateClientTitle } from "./CreateClientStyled"
import { useState } from 'react';
import { api } from "../../../hooks/useApi";
import { AlertTypes } from "../../../enums/enums";
import { AlertTypesInterface } from "../../../interfaces/AlertTypesInterface";
import AlertMessage from "../../AlertMessage";
import { phoneMask } from "../../../utils/mask";





export const CreateClient = (props: any) => {



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


    function createClient() {
        if (clientName && clientCpf && clientPhone) {
            const client = {
                name: clientName,
                cpf: clientCpf,
                phone: adjustingPhoneNumber(clientPhone)
            };

            // console.log('Client: ', client);

            api
                .post("/client", {
                    client_name: client.name,
                    client_phone: client.phone,
                    client_cpf: client.cpf
                })
                .then((res) => {

                    // console.log('Bom;', res);
                    props.getNewClient({
                        client: res.data,
                        showModal: false
                    })

                })
                .catch((error) => {



                    if (error.response.data.message.indexOf('não pode ter mais que 11 caracteres!') >= 0) {
                        showAlert(AlertTypes.ERROR, 'não pode ter mais que 11 caracteres!', 3000)
                    } else if (error.response.data.message.indexOf('não pode ter menos que 11 caracteres!') >= 0) {
                        showAlert(AlertTypes.ERROR, 'não pode ter menos que 11 caracteres!', 3000)
                    } else if (error.response.data.message.indexOf('Cliente já cadastrado') >= 0) {
                        showAlert(AlertTypes.ERROR, 'Cliente já cadastrado', 3000)
                    } else if (error.response.data.message.indexOf('Número de cpf inválido') >= 0) {
                        showAlert(AlertTypes.ERROR, 'Número de cpf inválido', 3000)
                    } else {
                        showAlert(AlertTypes.ERROR, `Error: ${error}`, 3000)
                    }
                });
        } else {
            alert("Preencha todos dados")
        }
    }


    const adjustingPhoneNumber = (phone: string) => {

        if (!phone) return ""
        phone = phone.replace(/[\() -]/gm, '')
        return phone
    }

    // const phoneMask = (value: string) => {
    //     if (!value) return ""
    //     value = value.replace(/\D/g, '')
    //     value = value.replace(/(\d{2})(\d)/, "($1) $2")
    //     value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    //     setClientPhone(value)
    // }

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
                    <CreateClientButton className="btn btn-primary" onClick={createClient}>Salvar</CreateClientButton>
                    <CreateClientButton className="btn btn-secondary" onClick={exit}>Sair</CreateClientButton>
                </div>
            </CreateClientMain>
            {open && <AlertMessage props={alertProps} />}
        </>
    )
}