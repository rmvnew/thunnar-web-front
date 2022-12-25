import { useState, useEffect } from 'react';
import { CardButton, ConfirmationButton } from './ConfirmationModalStyled';





export const ConfirmationModal = (props: any) => {

    function confirmation() {

        props.confirmation({
            status: true,
            modal: false
        })

    }

    function exit() {
        props.exit({
            status: false,
            modal: false
        })
    }

    const [msgAction, setMsgAction] = useState('Executar está ação?')

    useEffect(() => {

        if (props.message !== undefined) {
            setMsgAction(props.message)
        }
    }, [])

    return (
        <>
            <h3>{msgAction}</h3>

            <CardButton>
                <ConfirmationButton className='btn btn-success' onClick={confirmation}>Sim</ConfirmationButton>
                <ConfirmationButton className='btn btn-danger' onClick={exit}>Não</ConfirmationButton>
            </CardButton>
        </>
    )
}