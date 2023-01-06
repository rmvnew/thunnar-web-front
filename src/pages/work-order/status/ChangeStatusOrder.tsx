import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../../hooks/useApi';
import { parseStatus } from '../../../utils/ParseOrderStatus';
import { ChangeStatusButton, ChangeStatusLabel, ChangeStatusSelect, ChangeStatusTytle } from './ChangeStatusOrderStyled';
import { ImExit } from "react-icons/im";
import { BsCheck2All } from 'react-icons/bs';




export const ChangeStatusOrder = (props: any) => {

    const updateStatus = () => {

        api.patch(`/service-order/change-status/${props.orderNumber}/${option}`)
            .then(response => {
                toast.success(`Status modificado para:\n ${parseStatus(option)}`)
                props.status()
                props.reload()
            })

    }

    function exit() {
        props.exit()
    }


    const parseValue = (value: string) => {

        let result = ""

        switch (value) {

            case 'SOB ANÁLISE':
                result = 'UNDER_ANALYSIS'
                break
            case 'ESPERANDO APROVAÇÃO':
                result = 'WAITING_FOR_APPROVAL'
                break
            case 'EM PROGRESSO':
                result = 'IN_PROGRESS'
                break
            case 'FINISHED':
                result = 'FINALIZADA'
                break
            case 'CANCELADA':
                result = 'CANCELED'
                break
        }

        return result
    }


    const [option, setOption] = useState("")
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        if (option !== "") {
            setShowEdit(true)
        } else {
            setShowEdit(false)
        }
    }, [option])

    return (
        <>
            <ChangeStatusTytle>Gerenciar Status</ChangeStatusTytle>

            <ChangeStatusLabel>Status</ChangeStatusLabel>
            <ChangeStatusSelect className="form-select form-select-lg mb-4" onChange={e => setOption(parseValue(e.target.value))}>
                <option defaultValue={""}></option>
                <option value="SOB ANÁLISE">SOB ANÁLISE</option>
                <option value="ESPERANDO APROVAÇÃO">ESPERANDO APROVAÇÃO</option>
                <option value="EM PROGRESSO">EM PROGRESSO</option>
                <option value="CANCELADA">CANCELADA</option>
            </ChangeStatusSelect>
            {showEdit && <ChangeStatusButton className='btn btn-primary' onClick={updateStatus}><BsCheck2All/> Salvar</ChangeStatusButton>}
            <ChangeStatusButton className='btn btn-danger' onClick={exit}><ImExit/> Sair</ChangeStatusButton>
        </>
    )
}