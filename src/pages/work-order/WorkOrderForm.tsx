
import { useContext, useState, useEffect } from 'react';
import { ImSearch, ImUserPlus, ImPencil2 } from "react-icons/im";
import { GiSave } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { FcServices } from "react-icons/fc";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { WorkOrderClientButton, WorkOrderClientCard, WorkOrderClientCardButtons, WorkOrderClientInputs, WorkOrderTitle, WorkOrderForm_Header, WorkOrderForm_Label, WorkOrderForm_Main, WorkOrderForm_NumberOrder, WorkOrderForm_Title, WorkOrderproblemInput, WorkOrderButtonController, WorkOrderTopCard, WorkOrderTopCardInternal, WorkOrderButtonDevice, WorkOrderTableCard, WorkOrderInternalTebla, WorkOrderSelectTechnician, WorkOrderDeviceCard } from "./WorkOrderFormStyled"
import { SearchClient } from "../../components/client/search-client/SearchClient";
import { ModalSearchClient } from '../../components/client/search-client/Modal.search.client';
import { ModalCreateClient } from '../../components/client/create-client/Modal.create.client';
import { CreateClient } from "../../components/client/create-client/CreateClient";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { api } from '../../hooks/useApi';
import { Technician } from '../../interfaces/Technician.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { phoneMask } from '../../utils/mask';
import { Device } from '../../interfaces/Device.interface';
import { Pas } from '../../interfaces/Pas.interface';


export const WorkOrderForm = () => {

    const location = useLocation()

    const dataResult = location.state?.data

    const auth = useContext(AuthContext)
    const navigate = useNavigate()


    function setOrder() {
        if (dataResult !== undefined) {

            // console.log('Order: ', dataResult.WorkOrder);

            setOrderId(dataResult.WorkOrder.service_order_id)
            setOrderNumber(dataResult.WorkOrder.service_order_number)
            setClientId(dataResult.WorkOrder.client.client_id)
            setClientName(dataResult.WorkOrder.client.client_name)
            setClientPhone(dataResult.WorkOrder.client.client_phone)
            setOptions(dataResult.WorkOrder.technician.technician_id)
            setSelect(dataResult.WorkOrder.technician.technician_name)
            setDevices(dataResult.WorkOrder.devices)
            setOrderEdit(true)

        }
    }

    function createOrder() {

        console.log('ClientId: ', clientId);
        console.log('Options: ', options);
        console.log('devices length: ', devices.length);

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
                    navigate("/work-order")
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        } else {
            alert("Preencha todos dados")
        }
    }
    
    function updateOrder() {

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
                .put(`/service-order/${orderId}`, {
                    client_id: order.client_id,
                    user_id: order.user_id,
                    technician_id: order.options,
                    devices: order.devices
                })
                .then((response) => {
                    navigate("/work-order")
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        } else {
            alert("Preencha todos dados")
        }
    }


    function createDevice() {

        let dev = devices

        if (brand && model && probelmReported) {

            const device: Device = {
                device_id: 0,
                device_brand: brand,
                device_model: model,
                device_serial_number: serialNumber,
                device_imei: imei,
                device_problem_reported: probelmReported,
                parts_and_services: parts_and_services
            }

            dev.push(device)

            setDevices(dev)
            clearDevice()

        }

    }


    function loadDeviceToEdit(id: number,position:number) {

        console.log('load id: ',id);
       
        setDeviceId(id)
        setBrand(devices[position].device_brand)
        setModel(devices[position].device_model)
        setSerialNumber(devices[position].device_serial_number)
        setImei(devices[position].device_imei)
        setProblemReported(devices[position].device_problem_reported)
        setParts_and_services(devices[position].parts_and_services!)
        setEditDevice(true)


    }


    function updateDeviceAfterEdit() {

        let dev = devices

        if (brand && model && probelmReported) {

            const device: Device = {
                device_id: deviceId,
                device_brand: brand,
                device_model: model,
                device_serial_number: serialNumber,
                device_imei: imei,
                device_problem_reported: probelmReported,
                parts_and_services: parts_and_services
            }

            // dev[deviceId] = device

           

            const currentDev = dev.map(data =>{

                console.log(data.device_id);
                console.log(deviceId);

                if(data.device_id == deviceId){
                    return device
                }else{
                    return data
                }
            })

            console.log(currentDev);

            setDevices(currentDev)
            clearDevice()

        }
    }


    function clear() {
        setOrderEdit(false)
        clearDevice()
    }

    function clearDevice() {
        setBrand("")
        setModel("")
        setSerialNumber("")
        setImei("")
        setProblemReported("")
        setParts_and_services([])
        setDeviceId(0)
        setEditDevice(false)

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

    function exit(obj: any) {

        setShowModalSearchClient(obj.statusModal)
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


    const [orderId,setOrderId] = useState(0)
    const [orderNumber, setOrderNumber] = useState(0)
    const [orderEdit, setOrderEdit] = useState(false)
    const [clientName, setClientName] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [showModalSearchClient, setShowModalSearchClient] = useState(false)
    const [ShowModalCreateClient, setSowModalCreateClient] = useState(false)
    const [clientId, setClientId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [options, setOptions] = useState("")
    const [select, setSelect] = useState("")
    const [technicians, setTechnicians] = useState<Technician[]>([])
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const [imei, setImei] = useState("")
    const [probelmReported, setProblemReported] = useState("")
    const [deviceId, setDeviceId] = useState(0)
    const [editDevice, setEditDevice] = useState(false)
    const [orderDate, setOrderDate] = useState(new Date())
    const [orderDateExpiration, setOrderDateExpiration] = useState(new Date())
    const [orderValue, setOrderValue] = useState(0.0)
    const [devices, setDevices] = useState<Device[]>([])
    const [parts_and_services, setParts_and_services] = useState<Pas[]>([])


    useEffect(() => {
        getTechnician()
        getIdUserByName(auth.user?.name);
        setOrder()
    }, [])

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
                                <WorkOrderForm_Label>Data de inicio</WorkOrderForm_Label>
                                <h2>{orderDate.toLocaleString("ZM", { timeZone: 'America/Bahia' }).substring(0, 10)}</h2>
                            </WorkOrderTopCardInternal>

                            <WorkOrderTopCardInternal>
                                <WorkOrderForm_Label>Previsão de entrega</WorkOrderForm_Label>
                                <h2>{orderDateExpiration.toLocaleString("ZM", { timeZone: 'America/Bahia' }).substring(0, 10)}</h2>
                            </WorkOrderTopCardInternal>

                            <WorkOrderTopCardInternal>
                                <WorkOrderForm_Label>Valor da ordem</WorkOrderForm_Label>
                                <h2>{orderValue}</h2>
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
                                    <WorkOrderClientInputs
                                        className="form-control form-control"
                                        type="text"
                                        placeholder="Digite o nome do cliente"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                    />
                                </div>

                                <div className="col-lg-5">
                                    <WorkOrderForm_Label>Telefone do cliente</WorkOrderForm_Label>
                                    <WorkOrderClientInputs
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

                                            <input
                                                className="form-control form-control"
                                                type="text"
                                                placeholder="Digite a marca do aparelho"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                            />

                                        </div>

                                        <div className="col-lg-6">
                                            <WorkOrderForm_Label>Modelo</WorkOrderForm_Label>

                                            <input
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

                                            <input
                                                className="form-control form-control"
                                                type="text"
                                                placeholder="Digite a marca do aparelho"
                                                value={serialNumber}
                                                onChange={(e) => setSerialNumber(e.target.value)}
                                            />

                                        </div>

                                        <div className="col-lg-6">
                                            <WorkOrderForm_Label>Imei</WorkOrderForm_Label>

                                            <input
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

                                        <WorkOrderproblemInput
                                            className="form-control form-control"
                                            type="text"
                                            placeholder="Digite a marca do aparelho"
                                            value={probelmReported}
                                            onChange={(e) => setProblemReported(e.target.value)}
                                        />

                                        {editDevice && <WorkOrderButtonDevice className='btn btn-secondary' onClick={updateDeviceAfterEdit}>Atualizar</WorkOrderButtonDevice>}
                                        {!editDevice && <WorkOrderButtonDevice className='btn btn-primary' onClick={createDevice}><MdOutlinePlaylistAdd /> Adicionar</WorkOrderButtonDevice>}

                                    </div>
                                </WorkOrderDeviceCard>
                            </WorkOrderClientCard>




                        </div >

                        <div className="col">


                            <WorkOrderTableCard >

                                <WorkOrderInternalTebla>
                                    <WorkOrderTitle>lista de aparelhos</WorkOrderTitle>

                                    <table className='table table-striped'>
                                        <thead >
                                            <tr>
                                                <td>Id</td>
                                                <td>Marca</td>
                                                <td>Modelo</td>
                                                <td>Sérial</td>
                                                <td>Editar</td>
                                                <td>Pos</td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {devices && devices.map((device, i) => (
                                                <tr key={device.device_id === 0 ? i : device.device_id}>
                                                    <td>{device.device_id === 0 ? i : device.device_id}</td>
                                                    <td>{device.device_brand}</td>
                                                    <td>{device.device_model}</td>
                                                    <td>{device.device_serial_number}</td>
                                                    <td>{<button className='btn btn-warning' onClick={() => loadDeviceToEdit(device.device_id === 0 ? i : device.device_id,i)}><ImPencil2 /></button>}</td>
                                                    <td>{<button className='btn btn-secondary'><FcServices/></button>}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </WorkOrderInternalTebla>
                            </WorkOrderTableCard>

                            {orderEdit && <WorkOrderTableCard >

                                <WorkOrderInternalTebla>
                                    <WorkOrderTitle>lista de peças e/ou serviços</WorkOrderTitle>

                                    <table className='table table-striped'>
                                        <thead >
                                            <tr>
                                                <td>Id</td>
                                                <td>Marca</td>
                                                <td>Modelo</td>
                                                <td>Sérial</td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {devices && devices.map((device, i) => (
                                                <tr key={device.device_id === 0 ? i : device.device_id}>
                                                    <td>{device.device_id === 0 ? i : device.device_id}</td>
                                                    <td>{device.device_brand}</td>
                                                    <td>{device.device_model}</td>
                                                    <td>{device.device_serial_number}</td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </WorkOrderInternalTebla>
                            </WorkOrderTableCard>}

                            {!orderEdit && <WorkOrderButtonController className='btn btn-primary' onClick={createOrder}><GiSave /> Salvar</WorkOrderButtonController>}
                            {orderEdit && <WorkOrderButtonController className='btn btn-secondary' onClick={updateOrder}><GrUpdate /> Atualizar</WorkOrderButtonController>}

                        </div>
                    </div>



                    {showModalSearchClient && <ModalSearchClient body={<SearchClient exit={exit} setCurrentClient={afterSearchClient} />} />}
                    {ShowModalCreateClient && <ModalCreateClient body={<CreateClient afterCreate={closeModalCreateClient} getNewClient={afterCreateClient} />} />}
                </WorkOrderForm_Main>



            </AnimatePageOpacity>
        </>
    )
}