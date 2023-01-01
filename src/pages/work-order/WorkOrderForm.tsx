
import { useContext, useState, useEffect } from 'react';
import { ImSearch, ImUserPlus, ImPencil2, ImBin } from "react-icons/im";
import { GiSave } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { BiAddToQueue } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { WorkOrderClientButton, WorkOrderClientCard, WorkOrderClientCardButtons, WorkOrderClientInputs, WorkOrderTitle, WorkOrderForm_Header, WorkOrderForm_Label, WorkOrderForm_Main, WorkOrderForm_NumberOrder, WorkOrderForm_Title, WorkOrderproblemInput, WorkOrderButtonController, WorkOrderTopCard, WorkOrderTopCardInternal, WorkOrderButtonDevice, WorkOrderTableCard, WorkOrderInternalTable, WorkOrderSelectTechnician, WorkOrderDeviceCard, WorkOrderDeviceInput, WorkOrderButtonTable, WorkOrderForm_Label_status, WorkOrderResponseStatus, WorkOrderButtonUpdate } from "./WorkOrderFormStyled"
import { SearchClient } from "../../components/client/search-client/SearchClient";
import { CreateClient } from "../../components/client/create-client/CreateClient";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { api } from '../../hooks/useApi';
import { Technician } from '../../interfaces/Technician.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { phoneMask } from '../../utils/mask';
import { Device } from '../../interfaces/Device.interface';
import { Pas } from '../../interfaces/Pas.interface';
import { ModalDefault } from '../../components/Modal';
import { Pos } from '../../components/PartsOrService/Pas';
import AlertMessage from '../../components/AlertMessage';
import { TablePos } from './tables/TablePos';
import { toast } from 'react-toastify';
import { parseStatus } from '../../utils/ParseOrderStatus';
import { ChangeStatusOrder } from './status/ChangeStatusOrder';
import { WorkOrderTableOptions } from './WorkOrderStyled';


export const WorkOrderForm = () => {

    const location = useLocation()

    const dataResult = location.state?.data

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const setOrder = async () => {
        if (dataResult !== undefined) {


            await api.get(`service-order/${dataResult.WorkOrder.service_order_id}`).then(result => {
                // console.log('Res: ', result.data);

                const initialDate = new Date(result.data.service_order_date)
                const finalDate = new Date(result.data.service_order_expiration)

                setOrderDate(initialDate)
                setOrderDateExpiration(finalDate)
                setOrderId(dataResult.WorkOrder.service_order_id)
                setStatusOrder(parseStatus(result.data.service_order_status))
                setOrderNumber(result.data.service_order_number)
                setClientId(result.data.client.client_id)
                setClientName(result.data.client.client_name)
                setClientPhone(result.data.client.client_phone)
                setOptions(result.data.technician.technician_id)
                setSelect(result.data.technician.technician_name)
                setOrderEdit(true)

                const oldList: any[] = result.data.devices

                const newList = oldList.map(data => {

                    const res = data.parts_and_services.map((result: any) => {

                        let currentPos = result
                        currentPos.isSaved = true
                        return currentPos

                    })

                    data.parts_and_services = res
                    return data

                })

                setDevices(newList)

                if (parseStatus(result.data.service_order_status) === 'FINALIZADA') {
                    setStatusEditable(false)
                } else {
                    setStatusEditable(true)
                }





            })



        }
    }

    function createOrder() {

        // console.log('ClientId: ', clientId);
        // console.log('Options: ', options);
        // console.log('devices length: ', devices.length);

        if (clientId && options && devices.length > 0) {
            const order = {
                client_id: clientId,
                user_id: userId,
                options: Number(options),
                devices: devices
            };

            console.log('Order: ', order);

            api
                .post("/service-order", {
                    client_id: order.client_id,
                    user_id: order.user_id,
                    technician_id: order.options,
                    devices: order.devices
                })
                .then((response) => {
                    clear()
                    navigate("/work-order")
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        } else {
            toast.error(
                'Preencha todos campos e adicione um aparelho para salvar a Ordem!',
                {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            )
            setDataOrderInputFails('fail')
            setTimeout(() => {
                setDataOrderInputFails('pass')
            }, 7000)
        }
    }

    function updateOrder() {

        // console.log('ClientId: ', clientId);
        // console.log('Options: ', options);
        // console.log('devices length: ', devices.length);

        if (clientId && options && devices.length > 0) {

            console.log('Devices: ', devices);
            const order = {
                client_id: clientId,
                user_id: userId,
                options: Number(options),
                devices: devices

            };

            // console.log('Order: ', order);

            api
                .put(`/service-order/${orderId}`, {
                    client_id: order.client_id,
                    user_id: order.user_id,
                    technician_id: order.options,
                    devices: order.devices
                })
                .then((response) => {

                    clear()
                    navigate("/work-order")
                    toast.success('Ordem atualizada com sucesso!')
                })
                .catch((error) => {
                    toast.error('Falha ao atualizar a ordem!')
                    console.log('Error: ', error);
                });
        } else {
            toast.error(
                'Preencha todos campos e adicione um aparelho para salvar a Ordem!',
                {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            )
            setDataOrderInputFails('fail')
            setTimeout(() => {
                setDataOrderInputFails('pass')
            }, 7000)
        }
    }




    function createDevice() {

        let dev = devices

        if (brand && model && problemReported) {

            const device: Device = {
                device_id: 0,
                device_brand: brand,
                device_model: model,
                device_serial_number: serialNumber,
                device_imei: imei,
                device_problem_reported: problemReported,
                parts_and_services: parts_and_services
            }

            dev.push(device)

            setDevices(dev)
            clearDevice()
            setMarkUpdate("#0b811993 0px 1px 9px 9px")
            setTimeout(() => {
                setMarkUpdate("")
            }, 7000)
            toast.success(
                'Aparelho adicionado a ordem. Atualize a ordem para salvar o aparelho',
                {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

        } else {
            setDeviceInputFails('fail')
            toast.error(
                'Preencha todos campos',
                {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            setTimeout(() => {
                setDeviceInputFails('pass')
            }, 7000)
        }

    }

    function updateDeviceAfterEdit() {

        if (brand && model && problemReported) {

            const device: Device = {
                device_id: deviceId,
                device_brand: brand,
                device_model: model,
                device_serial_number: serialNumber,
                device_imei: imei,
                device_problem_reported: problemReported,
                device_problem_detected: problemDetected === "" ? undefined : problemDetected,
                parts_and_services: parts_and_services,
            }

            const currentDev = devices.map(data => {

                if (data.device_id == deviceId) {
                    return device
                } else {
                    return data
                }
            })

            // console.log('>>>',currentDev);

            setMarkUpdate("#0b811993 0px 1px 9px 9px")
            setTimeout(() => {
                setMarkUpdate("")
            }, 7000)
            toast.success(
                'Modificações adicionadas com sucesso. Atualize a ordem para salvar',
                {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

            setDevices(currentDev)
            clearDevice()


        } else {
            setDeviceInputFails('fail')
            toast.error(
                'Preencha todos campos',
                {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            setTimeout(() => {
                setDeviceInputFails('pass')
            }, 7000)
        }
    }




    function deleteDevice(id: number, index: number) {



        devices.splice(index, 1)

        api.delete(`/device/${id}`)
            .then(response => {
                toast.success("Aparelho deletado com sucesso!")
                setTimeout(()=>{
                    setOrder()
                },1000)
            }).catch(error => {
                console.log(`Error: `, error);
            })


    }



    function loadDeviceToEdit(id: number, position: number) {

        console.log('load id: ', id);

        setDeviceId(id)
        setBrand(devices[position].device_brand)
        setModel(devices[position].device_model)
        setSerialNumber(devices[position].device_serial_number)
        setImei(devices[position].device_imei)
        setProblemReported(devices[position].device_problem_reported)
        setProblemDetected(devices[position].device_problem_detected ?? "")
        setParts_and_services(devices[position].parts_and_services!)
        setEditDevice(true)


    }


    //& ## initial POS 

    function showModalCreatePos(device_id: number, devicePosition: number) {
        setPosObject(null!)
        setDevicePosition(devicePosition)
        setDeviceId(device_id)
        setShowModalPos(true)
    }

    function createPos(obj: any) {

        let list = devices[devicePosition].parts_and_services!

        const pos: Pas = {
            pas_id: 0,
            pas_description: obj.pos.description,
            pas_quantity: obj.pos.quantity,
            pas_price: obj.pos.price,
            isSaved: false
        }

        list.push(pos)

        setParts_and_services(list)
        // setHaveDetails(true)
        setShowModalPos(obj.showModal)
        setCreatedPos(true)
        setMarkUpdate("#0b811993 0px 1px 9px 9px")
        setTimeout(() => {
            setMarkUpdate("")
        }, 7000)
        toast.info(
            'O item foi adicionado!\n Atualize a ordem para salvar item.',
            {
                position: "bottom-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }
        )


    }

    const sumPos = () => {


        let value = 0

        devices.forEach(data => {

            const result = data.parts_and_services!.reduce((a, b) => a + (b.pas_price * b.pas_quantity), 0)

            // console.log(result);

            value += result

        })

        setOrderValue(value)

    }

    function editPos(pos: any) {

        // console.log('editando: ', pos);

        setPosObject(pos)
        setShowModalPos(true)



    }

    function operationAfterEditPos() {
        setShowModalPos(false)
        clear()
        setOrder()
    }

    function deletePos(pos: any) {

        console.log('deletando: ', pos);
        api.delete(`parts-and-services/${pos.pas_id}`)
            .then(res => {
                clear()
                setOrder()
            }).catch(error => {
                console.log('Error: ', error);
            })

    }





    // & ## final POS

    function clear() {
        setOrderEdit(false)
        clearDevice()
        setParts_and_services([])
        setDevicePosition(0)
        setDeviceId(0)
        setShowPosList(false)
        setCreatedPos(false)
        setDeviceInputFails('pass')
        setDataOrderInputFails('pass')

    }

    function clearDevice() {
        setBrand("")
        setModel("")
        setSerialNumber("")
        setImei("")
        setProblemReported("")
        setProblemDetected("")
        setEditDevice(false)
        // setHaveDetails(false)

    }




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

    function reloadOrder() {
        setTimeout(() => {
            setOrder()
        }, 1000)
    }

    function closeModalChangeStatus() {
        setShowModalChangeStatus(false)
    }

    function exit(obj: any) {

        setShowModalSearchClient(obj.statusModal)
    }

    function closeModalPos(obj: any) {
        setShowModalPos(false)
    }

    function showListPos(device_id: number, device_position: number) {

        const listPos = devices[device_position].parts_and_services
        setListPos(listPos!)
        setShowPosList(!showPosList)


    }


    function afterSearchClient(obj: any) {


        setClientId(obj.client.client_id)
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


    const callChangeStatus = () => {

        changeStatusModalChangeStatusOrder()

    }

    const changeStatusModalChangeStatusOrder = () => {
        setShowModalChangeStatus(!showModalChangeStatus)
    }



    const [alertProps, setAlertProps] = useState({})
    const [open, setOpen] = useState(false);
    const [orderId, setOrderId] = useState(0)
    const [orderNumber, setOrderNumber] = useState(0)
    const [orderEdit, setOrderEdit] = useState(false)
    // const [haveDetails, setHaveDetails] = useState(false)
    const [clientName, setClientName] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [showModalSearchClient, setShowModalSearchClient] = useState(false)
    const [ShowModalCreateClient, setSowModalCreateClient] = useState(false)
    const [ShowModalPos, setShowModalPos] = useState(false)
    const [showModalChangeStatus, setShowModalChangeStatus] = useState(false)
    const [clientId, setClientId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [options, setOptions] = useState("")
    const [select, setSelect] = useState("")
    const [technicians, setTechnicians] = useState<Technician[]>([])
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const [imei, setImei] = useState("")
    const [problemReported, setProblemReported] = useState("")
    const [problemDetected, setProblemDetected] = useState("")
    const [deviceId, setDeviceId] = useState(0)
    const [devicePosition, setDevicePosition] = useState(0)
    const [editDevice, setEditDevice] = useState(false)
    const [orderDate, setOrderDate] = useState(new Date())
    const [orderDateExpiration, setOrderDateExpiration] = useState(new Date())
    const [orderValue, setOrderValue] = useState(0.0)
    const [devices, setDevices] = useState<Device[]>([])
    const [parts_and_services, setParts_and_services] = useState<Pas[]>([])
    const [createdPos, setCreatedPos] = useState(false)
    const [showPosList, setShowPosList] = useState(false)
    const [listPos, setListPos] = useState<Pas[]>([])
    const [deviceInputsFails, setDeviceInputFails] = useState('pass')
    const [dataOrderInputFails, setDataOrderInputFails] = useState('pass')
    const [posObject, setPosObject] = useState({})
    const [statusOrder, setStatusOrder] = useState("")
    const [statusEditable, setStatusEditable] = useState(false)
    const [markUpdate, setMarkUpdate] = useState("")


    useEffect(() => {
        getTechnician()
        getIdUserByName(auth.user?.name);
        setOrder()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            sumPos()
        }, 2000)
    }, [orderEdit])

    useEffect(() => {
        setTimeout(() => {
            if (parts_and_services.length > 0) {
                devices[devicePosition].parts_and_services = parts_and_services
            }
        }, 1000)
    }, [createdPos])

    return (
        <>
            <AnimatePageOpacity>

                <WorkOrderForm_Header>

                    <WorkOrderForm_NumberOrder>Ordem: {orderNumber}</WorkOrderForm_NumberOrder>
                    <WorkOrderForm_Title>Gerenciador de Ordem de serviço</WorkOrderForm_Title>

                </WorkOrderForm_Header>

                <WorkOrderForm_Main>
                    <div className="row">

                        <WorkOrderTopCard>

                            <WorkOrderTopCardInternal>
                                <WorkOrderForm_Label_status>Status Da Ordem</WorkOrderForm_Label_status>
                                <WorkOrderResponseStatus about={statusOrder}>{statusOrder}</WorkOrderResponseStatus>
                            </WorkOrderTopCardInternal>

                            <WorkOrderTopCardInternal>
                                <WorkOrderForm_Label_status>Data de inicio</WorkOrderForm_Label_status>
                                <WorkOrderResponseStatus>{orderDate.toLocaleString("ZM", { timeZone: 'America/Bahia' }).substring(0, 10)}</WorkOrderResponseStatus>
                            </WorkOrderTopCardInternal>

                            <WorkOrderTopCardInternal>
                                <WorkOrderForm_Label_status>Previsão de entrega</WorkOrderForm_Label_status>
                                <WorkOrderResponseStatus>{orderDateExpiration.toLocaleString("ZM", { timeZone: 'America/Bahia' }).substring(0, 10)}</WorkOrderResponseStatus>
                            </WorkOrderTopCardInternal>

                            <WorkOrderTopCardInternal>
                                <WorkOrderForm_Label_status>Valor da ordem</WorkOrderForm_Label_status>
                                <WorkOrderResponseStatus>{orderValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</WorkOrderResponseStatus>
                            </WorkOrderTopCardInternal>

                        </WorkOrderTopCard>


                        {/* aqui */}
                        <div className="col">

                            <WorkOrderClientCard className="row">

                                <WorkOrderTitle>Cliente e técnico</WorkOrderTitle>

                                <WorkOrderClientCardButtons >
                                    <WorkOrderClientButton onClick={() => changeStatusModalSearchClient(true)} className="btn btn-primary" >
                                        <ImSearch /> Buscar Cliente
                                    </WorkOrderClientButton>

                                    <WorkOrderClientButton onClick={() => changeStatusModalCreateClient(true)} className="btn btn-primary">
                                        <ImUserPlus /> Novo Cliente
                                    </WorkOrderClientButton>
                                </WorkOrderClientCardButtons>

                                <div className="col-lg-7">
                                    <WorkOrderForm_Label>Nome do cliente</WorkOrderForm_Label>
                                    {/* <WorkOrderClientInputs */}
                                    <WorkOrderDeviceInput
                                        alt={dataOrderInputFails}
                                        property='10px'
                                        itemProp={dataOrderInputFails}
                                        className="form-control form-control"
                                        type="text"
                                        placeholder="Digite o nome do cliente"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                    />
                                </div>

                                <div className="col-lg-5">
                                    <WorkOrderForm_Label>Telefone do cliente</WorkOrderForm_Label>
                                    {/* <WorkOrderClientInputs */}
                                    <WorkOrderDeviceInput
                                        alt={dataOrderInputFails}
                                        property='10px'
                                        itemProp={dataOrderInputFails}
                                        className="form-control form-control"
                                        type="text"
                                        placeholder="Digite o telefone"
                                        maxLength={15}
                                        value={clientPhone}
                                        onChange={(e) => setClientPhone(phoneMask(e.target.value))}
                                    />
                                </div>


                                <div className="col-lg-7">

                                    <WorkOrderForm_Label>Escolha o técnico</WorkOrderForm_Label>

                                    <WorkOrderSelectTechnician onChange={e => setOptions(e.target.value)} className="form-select form-select mb-3" aria-label="Default select example">
                                        <option defaultValue={select}>{select}</option>
                                        {technicians.map((data, i) => (

                                            <option key={i} value={data.id}>{data.name}</option>

                                        ))}

                                    </WorkOrderSelectTechnician>

                                </div>
                            </WorkOrderClientCard>

                            <WorkOrderClientCard className="row">
                                <WorkOrderDeviceCard>
                                    <div className="row">

                                        <WorkOrderTitle>Gerenciar aparelho</WorkOrderTitle>

                                        <div className="col-lg-6">
                                            <WorkOrderForm_Label>Marca</WorkOrderForm_Label>

                                            <WorkOrderDeviceInput
                                                alt={deviceInputsFails}
                                                property='0'
                                                itemProp={deviceInputsFails}
                                                className="form-control form-control"
                                                type="text"
                                                placeholder="Digite a marca do aparelho"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                            />

                                        </div>

                                        <div className="col-lg-6">
                                            <WorkOrderForm_Label>Modelo</WorkOrderForm_Label>

                                            <WorkOrderDeviceInput
                                                alt={deviceInputsFails}
                                                property='0'
                                                itemProp={deviceInputsFails}
                                                className="form-control form-control"
                                                type="text"
                                                placeholder="Digite a marca do aparelho"
                                                value={model}
                                                onChange={(e) => setModel(e.target.value)}
                                            />

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-lg-6">
                                            <WorkOrderForm_Label>Número de série</WorkOrderForm_Label>

                                            <WorkOrderDeviceInput
                                                alt='pass'
                                                property='0'
                                                className="form-control form-control"
                                                type="text"
                                                placeholder="Digite a marca do aparelho"
                                                value={serialNumber}
                                                onChange={(e) => setSerialNumber(e.target.value)}
                                            />

                                        </div>

                                        <div className="col-lg-6">
                                            <WorkOrderForm_Label>Imei</WorkOrderForm_Label>

                                            <WorkOrderDeviceInput
                                                alt='pass'
                                                property='0'
                                                className="form-control form-control"
                                                type="text"
                                                placeholder="Digite a marca do aparelho"
                                                value={imei}
                                                onChange={(e) => setImei(e.target.value)}
                                            />

                                        </div>

                                    </div>

                                    <div className="row">
                                        <WorkOrderForm_Label>Defeito Informado</WorkOrderForm_Label>

                                        <WorkOrderDeviceInput
                                            alt={deviceInputsFails}
                                            property='10px'
                                            itemProp={deviceInputsFails}
                                            className="form-control form-control"
                                            type="text"
                                            placeholder="Digite a marca do aparelho"
                                            value={problemReported}
                                            onChange={(e) => setProblemReported(e.target.value)}
                                        />



                                    </div>

                                    {orderEdit && <div className="row">
                                        <WorkOrderForm_Label>Defeito Detectado</WorkOrderForm_Label>

                                        <WorkOrderDeviceInput
                                            alt={deviceInputsFails}
                                            property='10px'
                                            className="form-control form-control"
                                            type="text"
                                            placeholder="Informe o defeito detectado"
                                            value={problemDetected}
                                            onChange={(e) => setProblemDetected(e.target.value)}
                                        />



                                    </div>}

                                    <div className="row">
                                        {editDevice && <WorkOrderButtonDevice className='btn btn-secondary' onClick={updateDeviceAfterEdit}><MdUpdate /> Atualizar</WorkOrderButtonDevice>}
                                        {!editDevice && <WorkOrderButtonDevice className='btn btn-primary' onClick={createDevice}><MdOutlinePlaylistAdd /> Adicionar</WorkOrderButtonDevice>}
                                    </div>
                                </WorkOrderDeviceCard>
                            </WorkOrderClientCard>




                        </div >

                        <div className="col">


                            <WorkOrderTableCard >

                                <WorkOrderInternalTable>
                                    <WorkOrderTitle>lista de aparelhos</WorkOrderTitle>

                                    <table className='table table-striped'>
                                        <thead >
                                            <tr>
                                                <td>Id</td>
                                                <td>Marca</td>
                                                <td>Modelo</td>
                                                <td>Sérial</td>
                                                {orderEdit && <td>Pos</td>}
                                                {/* <td>Editar</td> */}
                                                <td>Detalhes</td>
                                                <td>Opções</td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {devices && devices.map((device, i) => (
                                                <tr key={device.device_id === 0 ? i : device.device_id}>
                                                    <td>{device.device_id === 0 ? i : device.device_id}</td>
                                                    <td>{device.device_brand}</td>
                                                    <td>{device.device_model}</td>
                                                    <td>{device.device_serial_number}</td>
                                                    {orderEdit && <td>{<WorkOrderButtonTable className='btn btn-warning' onClick={() => showModalCreatePos(device.device_id === 0 ? i : device.device_id, i)}><BiAddToQueue /></WorkOrderButtonTable>}</td>}
                                                    {/* <td>{<WorkOrderButtonTable className='btn btn-warning' onClick={() => loadDeviceToEdit(device.device_id === 0 ? i : device.device_id, i)}><ImPencil2 /></WorkOrderButtonTable>}</td> */}
                                                    {(devices[i].parts_and_services?.length! > 0) && <td>{<WorkOrderButtonTable className='btn btn-warning' onClick={() => showListPos(device.device_id === 0 ? i : device.device_id, i)}><CgDetailsMore /></WorkOrderButtonTable>}</td>}
                                                    {!(devices[i].parts_and_services?.length! > 0) && <td>{<WorkOrderButtonTable className='btn btn-secondary' onClick={() => setShowPosList(false)}><CgDetailsMore /></WorkOrderButtonTable>}</td>}
                                                    <td>
                                                        <WorkOrderTableOptions>
                                                            <WorkOrderButtonTable className='btn btn-warning' onClick={() => loadDeviceToEdit(device.device_id === 0 ? i : device.device_id, i)}><ImPencil2 /></WorkOrderButtonTable>
                                                            <WorkOrderButtonTable className='btn btn-danger' onClick={() => deleteDevice(device.device_id === 0 ? i : device.device_id, i)}><ImBin /></WorkOrderButtonTable>
                                                        </WorkOrderTableOptions>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </WorkOrderInternalTable>
                            </WorkOrderTableCard>

                            {showPosList && <WorkOrderTableCard >

                                <TablePos posList={listPos} editPos={editPos} deletePos={deletePos} />

                            </WorkOrderTableCard>}

                            {!orderEdit && <WorkOrderButtonController className='btn btn-primary' onClick={createOrder}><GiSave /> Salvar</WorkOrderButtonController>}
                            {orderEdit && <WorkOrderButtonUpdate className='btn btn-primary' about={markUpdate} onClick={updateOrder}><MdUpdate /> Atualizar</WorkOrderButtonUpdate>}
                            {orderEdit && statusEditable && <WorkOrderButtonController className='btn btn-primary' onClick={callChangeStatus}><ImPencil2 /> Editar Status</WorkOrderButtonController>}

                        </div>
                    </div>

                    {showModalSearchClient && <ModalDefault body={<SearchClient exit={exit} setCurrentClient={afterSearchClient} />} />}
                    {ShowModalCreateClient && <ModalDefault body={<CreateClient afterCreate={closeModalCreateClient} getNewClient={afterCreateClient} />} />}
                    {ShowModalPos && <ModalDefault body={<Pos posObject={posObject} operationAfterEditPos={operationAfterEditPos} closeModalPos={closeModalPos} createPos={createPos} />} />}
                    {showModalChangeStatus && <ModalDefault body={<ChangeStatusOrder status={changeStatusModalChangeStatusOrder} orderNumber={orderNumber} exit={closeModalChangeStatus} reload={reloadOrder} />} />}
                    {open && <AlertMessage props={alertProps} />}
                </WorkOrderForm_Main>

            </AnimatePageOpacity>
        </>
    )
}