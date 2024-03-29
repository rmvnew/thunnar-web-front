import { clear } from 'console';
import { useState, useEffect } from 'react';
import { AlertTypes } from "../../enums/enums"
import { api } from "../../hooks/useApi"
import { AlertTypesInterface } from "../../interfaces/AlertTypesInterface"
import AlertMessage from "../AlertMessage"
import { CreatePosButton, CreatePosCols, CreatePoslabel, CreatePosMain, CreatePosTitle } from "./PasStyled"
import { toast } from 'react-toastify';
import { MdOutlinePlaylistAdd, MdUpdate } from 'react-icons/md';
import { ImExit } from 'react-icons/im';





export const Pos = (props: any) => {


    function clearPas() {
        setPosDescription("")
        setPosQuantity(0)
        setPosPrice(0)
        setPasId(0)
    }

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


    function createPos() {
        if (posDescription && posQuantity && posPrice) {
            const pos = {
                description: posDescription,
                quantity: posQuantity,
                price: posPrice
            };


            props.createPos({
                pos,
                showModal: false
            })


        }else{
            toast.error(
                'Preencha todos campos',
                {
                    position: "top-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
        }
    }

    function updatePos() {
        if (posDescription && posQuantity && posPrice) {

            api.put(`parts-and-services/${pasId}`, {
                pas_id: pasId,
                pas_description: posDescription,
                pas_quantity: posQuantity,
                pas_price: posPrice
            }).then(response => {
                props.operationAfterEditPos()
                toast.success('Item atualizado com sucesso!')
            }).catch(error => {
                console.log('Error update: ', error);
            })


        }else{
            toast.error(
                'Preencha todos campos',
                {
                    position: "top-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
        }
    }

    function exit() {
        props.closeModalPos({
            showModal: false
        })
    }

    function setPos() {
        if (props.posObject !== null) {
            setIsUpdate(true)
            setPosDescription(props.posObject.pas_description)
            setPosQuantity(props.posObject.pas_quantity)
            setPosPrice(props.posObject.pas_price)
            setPasId(props.posObject.pas_id)
        } else {
            clearPas()
        }
    }


    const [posDescription, setPosDescription] = useState("")
    const [posQuantity, setPosQuantity] = useState(0)
    const [posPrice, setPosPrice] = useState(0)
    const [alertProps, setAlertProps] = useState({})
    const [open, setOpen] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [pasId, setPasId] = useState(0)


    useEffect(() => {
        setPos()
    }, [])

    return (
        <>
            <CreatePosTitle>Adicionar Peça ou Serviço</CreatePosTitle>
            <CreatePosMain>

                <div className="row">
                    <CreatePosCols className="col">
                        <CreatePoslabel>Descrição da peça ou serviço</CreatePoslabel>
                        <input
                            className="form-control form-control"
                            type="text"
                            placeholder="Informe a peça ou serviço"
                            value={posDescription}
                            onChange={e => setPosDescription(e.target.value)}
                        />
                    </CreatePosCols>
                </div>

                <div className="row">
                    <CreatePosCols className="col-lg-6">
                        <CreatePoslabel>Quantidade</CreatePoslabel>
                        <input
                            className="form-control form-control"
                            type="text"
                            placeholder="Quantidade"
                            value={posQuantity}
                            onChange={e => setPosQuantity(Number(e.target.value))}
                        />
                    </CreatePosCols>
                    <CreatePosCols className="col-lg-6">
                        <CreatePoslabel>Preço</CreatePoslabel>
                        <input
                            className="form-control form-control"
                            type="text"
                            placeholder="preço"
                            value={posPrice}
                            onChange={e => setPosPrice(Number(e.target.value))}
                        />
                    </CreatePosCols>
                </div>

                {!isUpdate && <CreatePosButton className="btn btn-primary" onClick={createPos}><MdOutlinePlaylistAdd />Salvar</CreatePosButton>}
                {isUpdate && <CreatePosButton className="btn btn-primary" onClick={updatePos}><MdUpdate /> Atualizar</CreatePosButton>}
                <CreatePosButton className="btn btn-secondary" onClick={exit}><ImExit/> Sair</CreatePosButton>

            </CreatePosMain>
            {open && <AlertMessage props={alertProps} />}
        </>
    )
}