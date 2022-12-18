import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { ImBin, ImPencil2 } from "react-icons/im"
import { FiCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom"
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { api } from "../../hooks/useApi"
import { WorkOrderButtonNewOrder, WorkOrderInputSearch, WorkOrderMain, WorkorderNewOrder, WorkOrderTable, WorkOrderTitle } from "./WorkOrderStyled"






export const WorkOrder = () => {

    function getCurrentDate(date: Date) {

    }

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

    const getServiceOrder = async (page: number = 1) => {

        await api.get(`/service-order?page=${page}&limit=8&sort=DESC&orderBy=ID`).then((response) => {

            setResponse(response)
        });
    };


    const getServiceOrderByNameClient = async (page: number = 1, name: string = "") => {

        await api.get(`/service-order?page=${page}&limit=8&sort=DESC&orderBy=ID&search=${name}`).then((response) => {
            // console.log('Res: ',response);
            setResponse(response)
        });
    };



    const deleteOrder = async (order_id: number = 0) => {

        console.log(order_id);

        await api.delete(`/service-order/${order_id}`)
            .then(response => {
                getServiceOrder();
            }).catch(error => {
                console.log(error);
            })
    }

    const completOrder = async (order_id: number = 0) =>{

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
                        <WorkOrderButtonNewOrder to={"/work-order/form"} className="btn btn-primary ">Nova Ordem</WorkOrderButtonNewOrder>
                    </WorkorderNewOrder>

                    <WorkOrderInputSearch
                        className="form-control form-control-lg "
                        type="text"
                        placeholder="Busca de cliente"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <WorkOrderTable className="table table-striped">
                        <thead>
                            <tr>
                                <td>Nr Ordem</td>
                                <td>Nome do cliente</td>
                                <td>Telefone Cliente</td>
                                <td>Data de inicio</td>
                                <td>Previsão de entrega</td>
                                <td>Opções</td>



                            </tr>
                        </thead>
                        <tbody>
                            {serviceOrder.map((so) => (
                                    <tr key={so.service_order_number}>
                                        <td>{so.service_order_number}</td>
                                        <td>{so.client.client_name}</td>
                                        <td>{so.client.client_phone}</td>
                                        <td>{so.service_order_date}</td>
                                        <td>{so.service_order_expiration}</td>

                                        <td>

                                            <div className="d-flex justify-content-around base-options">

                                                <button className="btn btn-success btn-delete"
                                                    onClick={() => completOrder(so.service_order_id)}
                                                    data-hover="Fechar Ordem"
                                                ><FiCheck /></button>

                                                <NavLink to={"/work-order/form"} state={{
                                                    data: {
                                                        WorkOrder: so
                                                    }
                                                }} className="btn btn-warning"><ImPencil2 /></NavLink>

                                                <button className="btn btn-danger btn-delete"
                                                    onClick={() => deleteOrder(so.service_order_id)}
                                                ><ImBin /></button>
                                                

                                            </div>

                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </WorkOrderTable>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </WorkOrderMain>
            </AnimatePageOpacity>
        </>
    )
}