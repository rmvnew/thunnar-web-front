import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { ImBin, ImPencil2 } from "react-icons/im"
import { FiCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom"
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { api } from "../../hooks/useApi"
import { PaginationCardworkOrder, WorkOrderButtonNewOrder, WorkOrderButtonTable, WorkOrderInputSearch, WorkOrderMain, WorkOrderNavLinkTable, WorkorderNewOrder, WorkOrderTable, WorkOrderTableTd, WorkOrderTitle } from "./WorkOrderStyled"
import { getDateBr } from "../../utils/date.utils";
import { OrderStatus } from "../../enums/enums";
import { toast } from 'react-toastify';
import { ModalDefault } from "../../components/Modal";
import { ConfirmationModal } from "../../components/conformation/ConfirmationModal";
import { parseStatus } from '../../utils/ParseOrderStatus';
import { AiOutlineAppstoreAdd } from "react-icons/ai";






export const WorkOrder = () => {



    function setResponse(res: any) {

        setServiceOrder(res.data.items)
        setPages(res.data.meta.totalPages)

    }

    const handleChange = (e: any, currentPage: any) => {
        setPage(currentPage)
    }


    const [serviceOrder, setServiceOrder] = useState<any[]>([])
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [showModalcloseOrder, setShowModalcloseOrder] = useState(false)
    const [showModalDeleteOrder, setShowModalDeleteOrder] = useState(false)
    const [messageConfirmation, setMessageConfirmation] = useState("")
    const [orderNumber, setOrderNumber] = useState(0)

    const getServiceOrder = async (page: number = 1) => {

        await api.get(`/service-order?page=${page}&limit=8&sort=DESC&orderBy=ID`).then((response) => {

            setResponse(response)
        });
    };


    const getServiceOrderByNameClient = async (page: number = 1, name: string = "") => {

        await api.get(`/service-order?page=${page}&limit=8&sort=DESC&orderBy=ID&search=${name}`)
            .then((response) => {
                setResponse(response)
            });
    };




    const callConfirmationClose = async (order_id: number = 0) => {

        setMessageConfirmation('Deseja fechar esta ordem?')
        setTimeout(() => {
            setOrderNumber(order_id)
            setShowModalcloseOrder(true)
        }, 500)


    }

    const callConfirmationDelete = async (order_id: number = 0) => {

        setMessageConfirmation('Deseja Deletar esta ordem?')
        setTimeout(() => {
            setOrderNumber(order_id)
            setShowModalDeleteOrder(true)
        }, 500)


    }


    const confirmationDeleteOrder = async (conf: any) => {

        setShowModalDeleteOrder(conf.modal)

        if (conf.status) {
            await api.delete(`/service-order/${orderNumber}`)
                .then(response => {
                    getServiceOrder()
                    toast.warning(`Ordem ${orderNumber} deletada com sucesso!`)
                }).catch(error => {
                    toast.error('Erro ao deletar ordem!')
                    console.log(error);
                })
        }
    }

    const confirmationClose = (conf: any) => {


        setShowModalcloseOrder(conf.modal)
        if (conf.status) {

            api.patch(`/service-order/change-status/${orderNumber}/${OrderStatus.FINISHED}`)
                .then(response => {
                    toast.success('Ordem de serviço fechada com sucesso!')
                })

            setTimeout(() => {
                getServiceOrder()
            }, 1000)

        }

    }

    const exit = (conf: any) => {
        setShowModalcloseOrder(conf.modal)
        setShowModalDeleteOrder(conf.modal)
    }


    useEffect(() => {
        getServiceOrderByNameClient(page, search)
    }, [search])

    useEffect(() => {
        getServiceOrder();
    }, []);

    useEffect(() => {
        getServiceOrder(page);
    }, [page])


    return (
        <>
            <AnimatePageOpacity>
                <WorkOrderMain >

                    <WorkOrderTitle>Gerenciador de Ordem de Serviço</WorkOrderTitle>


                    <WorkorderNewOrder >
                        <WorkOrderButtonNewOrder to={"/work-order/form"} className="btn btn-primary "><AiOutlineAppstoreAdd/> Nova Ordem</WorkOrderButtonNewOrder>
                    </WorkorderNewOrder>

                    <WorkOrderInputSearch
                        className="form-control form-control-lg "
                        type="text"
                        placeholder="Busca de cliente"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <WorkOrderTable >
                        <thead>
                            <tr>
                                <td>Nr Ordem</td>
                                <td>Nome do cliente</td>
                                <td>Telefone Cliente</td>
                                <td>Data de inicio</td>
                                <td>Previsão de entrega</td>
                                <td>Status</td>
                                <td>Opções</td>



                            </tr>
                        </thead>
                        <tbody>
                            {serviceOrder.map((so, i) => (
                                <tr key={so.service_order_number}>

                                    <WorkOrderTableTd scope={parseStatus(so.service_order_status)} about={`${i % 2}`}>
                                        {so.service_order_number}
                                    </WorkOrderTableTd>

                                    <WorkOrderTableTd scope={parseStatus(so.service_order_status)} about={`${i % 2}`}>
                                        {so.client.client_name}
                                    </WorkOrderTableTd>

                                    <WorkOrderTableTd scope={parseStatus(so.service_order_status)} about={`${i % 2}`}>
                                        {so.client.client_phone}
                                    </WorkOrderTableTd>

                                    <WorkOrderTableTd scope={parseStatus(so.service_order_status)} about={`${i % 2}`}>
                                        {getDateBr(so.service_order_date)}
                                    </WorkOrderTableTd>

                                    <WorkOrderTableTd scope={parseStatus(so.service_order_status)} about={`${i % 2}`}>
                                        {getDateBr(so.service_order_expiration)}
                                    </WorkOrderTableTd>

                                    <WorkOrderTableTd scope={parseStatus(so.service_order_status)} about={`${i % 2}`}>
                                        {parseStatus(so.service_order_status)}
                                    </WorkOrderTableTd>

                                    <WorkOrderTableTd scope={parseStatus(so.service_order_status)} about={`${i % 2}`}>

                                        <div className="d-flex justify-content-around base-options">

                                            {!(parseStatus(so.service_order_status) === 'FINALIZADA') && <WorkOrderButtonTable className="btn btn-success btn-delete"
                                                onClick={() => callConfirmationClose(so.service_order_id)}>
                                                <FiCheck />
                                            </WorkOrderButtonTable>}

                                            <WorkOrderNavLinkTable to={"/work-order/form"} state={{
                                                data: {
                                                    WorkOrder: so
                                                }
                                            }} className="btn btn-warning"><ImPencil2 /></WorkOrderNavLinkTable>

                                            <WorkOrderButtonTable className="btn btn-danger btn-delete"
                                                onClick={() => callConfirmationDelete(so.service_order_id)}
                                            ><ImBin /></WorkOrderButtonTable>


                                        </div>

                                    </WorkOrderTableTd>
                                </tr>
                            ))}
                        </tbody>
                    </WorkOrderTable>
                    <PaginationCardworkOrder>
                        <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                    </PaginationCardworkOrder>
                    {showModalcloseOrder && <ModalDefault body={<ConfirmationModal
                        message={messageConfirmation}
                        confirmation={confirmationClose}
                        exit={exit}
                    />} />}
                    {showModalDeleteOrder && <ModalDefault body={<ConfirmationModal
                        message={messageConfirmation}
                        confirmation={confirmationDeleteOrder}
                        exit={exit}
                    />} />}
                </WorkOrderMain>
            </AnimatePageOpacity>
        </>
    )
}