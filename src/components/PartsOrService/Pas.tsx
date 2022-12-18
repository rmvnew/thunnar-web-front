import { useState } from "react"
import { AlertTypes } from "../../enums/enums"
import { api } from "../../hooks/useApi"
import { AlertTypesInterface } from "../../interfaces/AlertTypesInterface"
import AlertMessage from "../AlertMessage"
import { CreatePosButton, CreatePosCols, CreatePoslabel, CreatePosMain, CreatePosTitle } from "./PasStyled"





export const Pos = (props: any) => {


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


        }
    }

    function exit() {
        props.closeModalPos({
            showModal: false
        })
    }
    const [posDescription, setPosDescription] = useState("")
    const [posQuantity, setPosQuantity] = useState(0)
    const [posPrice, setPosPrice] = useState(0)
    const [alertProps, setAlertProps] = useState({})
    const [open, setOpen] = useState(false);



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

                <CreatePosButton className="btn btn-primary" onClick={createClient}>Salvar</CreatePosButton>
                <CreatePosButton className="btn btn-secondary" onClick={exit}>Sair</CreatePosButton>

            </CreatePosMain>
            {open && <AlertMessage props={alertProps} />}
        </>
    )
}