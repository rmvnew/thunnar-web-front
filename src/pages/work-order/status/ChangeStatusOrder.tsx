import { useState } from 'react';
import { ChangeStatusButton, ChangeStatusLabel, ChangeStatusSelect, ChangeStatusTytle } from './ChangeStatusOrderStyled';





export const ChangeStatusOrder = (props: any) => {

    const updateStatus = () =>{

        props.status()

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
            <ChangeStatusButton className='btn btn-primary' onClick={updateStatus}>Editar</ChangeStatusButton>
        </>
    )
}