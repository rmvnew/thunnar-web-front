
import { useContext, useState, useEffect } from 'react';
import { ImSearch, ImUserPlus } from "react-icons/im";
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { WorkOrderClientButton, WorkOrderClientCardButtons, WorkOrderForm_Header, WorkOrderForm_Label, WorkOrderForm_Main, WorkOrderForm_NumberOrder, WorkOrderForm_Title } from "./WorkOrderFormStyled"
import { SearchClient } from "../../components/client/search-client/SearchClient";
import { ModalSearchClient } from '../../components/client/search-client/Modal.search.client';
import { ModalCreateClient } from '../../components/client/create-client/Modal.create.client';
import { CreateClient } from "../../components/client/create-client/CreateClient";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { api } from '../../hooks/useApi';
import { Technician } from '../../interfaces/Technician.interface';


export const WorkOrderForm = () => {


    const auth = useContext(AuthContext)

    const getIdUserByName = async (name: string = "") => {

        await api.get(`/user/get-id/${name}`).then(response => {


            setUserId(response.data[0].user_id)


        });
    };


    const getTechnician = async () => {
        await api.get(`/technician`).then(response => {

            let technicians = []

            for (let tec in response.data) {
                const tecs: Technician = {
                    id: response.data[tec].technician_id,
                    name: response.data[tec].technician_name,
                    phone: response.data[tec].technician_phone
                }
                technicians.push(tecs)
            }

            setTechnicians(technicians)

        })
    }

    function exit(obj: any) {

        setShowModalSearchClient(obj.statusModal)
    }


    function afterSearchClient(obj: any) {

        setClientName(obj.client.client_name)
        setClientPhone(obj.client.client_phone)
        setShowModalSearchClient(obj.status)

    }


    function afterCreateClient(obj: any) {

        setSowModalCreateClient(obj.showModal)
        setClientName(obj.client.client_name)
        setClientPhone(obj.client.client_phone)
        setClientId(obj.client.client_id)

    }

    function closeModalCreateClient(obj: any) {

        setSowModalCreateClient(obj.showModal)

    }

    function changeStatusModalSearchClient(status: boolean = false) {
        setShowModalSearchClient(status)
    }

    function changeStatusModalCreateClient(status: boolean = false) {
        setSowModalCreateClient(status)
    }


    const [order, setOrder] = useState(0)
    const [clientName, setClientName] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [showModalSearchClient, setShowModalSearchClient] = useState(false)
    const [ShowModalCreateClient, setSowModalCreateClient] = useState(false)
    const [clientId, setClientId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [options, setOptions] = useState("")
    const [select, setSelect] = useState("")
    const [technicians, setTechnicians] = useState<Technician[]>([])


    useEffect(() => {
        getTechnician()
        getIdUserByName(auth.user?.name);
    }, [])

    return (
        <>
            <AnimatePageOpacity>

                <WorkOrderForm_Header>

                    <WorkOrderForm_NumberOrder>Ordem: {order}</WorkOrderForm_NumberOrder>
                    <WorkOrderForm_Title>Gerenciador de Ordem de serviço</WorkOrderForm_Title>

                </WorkOrderForm_Header>

                <WorkOrderForm_Main>
                    <div className="row">
                        <div className="col">

                            <div className="row">

                                <WorkOrderClientCardButtons >
                                    <WorkOrderClientButton onClick={() => changeStatusModalSearchClient(true)} className="btn btn-primary" >
                                        <ImSearch /> Buscar Cliente
                                    </WorkOrderClientButton>

                                    <WorkOrderClientButton onClick={() => changeStatusModalCreateClient(true)} className="btn btn-primary">
                                        <ImUserPlus /> Novo Cliente
                                    </WorkOrderClientButton>
                                </WorkOrderClientCardButtons>



                            </div>

                            <div className="row">
                                <div className="col-lg-7">
                                    <WorkOrderForm_Label>Nome do cliente</WorkOrderForm_Label>
                                    <input
                                        className="form-control form-control"
                                        type="text"
                                        placeholder="Digite o nome do cliente"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                    />
                                </div>

                                <div className="col-lg-5">
                                    <WorkOrderForm_Label>Telefone do cliente</WorkOrderForm_Label>
                                    <input
                                        className="form-control form-control"
                                        type="text"
                                        placeholder="Digite o telefone"
                                        value={clientPhone}
                                        onChange={(e) => setClientPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-7">
                                    <WorkOrderForm_Label>Técnico</WorkOrderForm_Label>

                                    <select onChange={e => setOptions(e.target.value)} className="form-select form-select mb-3" aria-label="Default select example">
                                        <option defaultValue={select}>{select}</option>
                                        {technicians.map((data, i) => (

                                            <option key={i} value={data.id}>{data.name}</option>

                                        ))}

                                    </select>

                                </div>
                            </div>


                        </div>
                        <div className="col">

                        </div>
                    </div>



                    {showModalSearchClient && <ModalSearchClient body={<SearchClient exit={exit} setCurrentClient={afterSearchClient} />} />}
                    {ShowModalCreateClient && <ModalCreateClient body={<CreateClient afterCreate={closeModalCreateClient} getNewClient={afterCreateClient} />} />}
                </WorkOrderForm_Main>



            </AnimatePageOpacity>
        </>
    )
}