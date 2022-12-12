
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ImSearch, ImUserPlus } from "react-icons/im";
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { WorkOrderClientButton, WorkOrderClientCardButtons, WorkOrderForm_Header, WorkOrderForm_Label, WorkOrderForm_Main, WorkOrderForm_NumberOrder, WorkOrderForm_Title } from "./WorkOrderFormStyled"
import { ModalDefault } from "../../components/Modal.default";
import { SearchClient } from "../../components/client/search-client/SearchClient";
import { ModalClient } from '../../components/client/Modal.client';






export const WorkOrderForm = () => {

    const location = useLocation()
    const dataResult = location.state?.data


    function setUser() {
        if (dataResult !== undefined) {
            setIsUpdate(true)


        } else {
            setIsUpdate(false)
        }

    }

    function show(obj: any) {
        console.log(obj);
        setShowModal(obj.statusModal)
    }

    

    function closeModal(status:boolean = false){
        setShowModal(status)
    }

    const [isUpdate, setIsUpdate] = useState(false)
    const [order, setOrder] = useState(0)
    const [clientName, setClientName] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        setUser()



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
                                    <WorkOrderClientButton onClick={() => closeModal(true)} className="btn btn-primary" >
                                        <ImSearch /> Buscar Cliente
                                    </WorkOrderClientButton>

                                    <WorkOrderClientButton className="btn btn-primary">
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
                        </div>
                        <div className="col">

                        </div>
                    </div>

                    {showModal && <ModalClient body={<SearchClient teste={show} />} />}
                </WorkOrderForm_Main>



            </AnimatePageOpacity>
        </>
    )
}