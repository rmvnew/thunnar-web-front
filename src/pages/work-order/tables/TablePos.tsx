import { useState, useEffect } from 'react';
import { Pas } from "../../../interfaces/Pas.interface"
import { WorkOrderInternalTebla, WorkOrderTitle } from "../WorkOrderFormStyled"





export const TablePos = (props: any) => {


    const [listPos, setListPos] = useState<Pas[]>([])


    useEffect(() => {
        setListPos(props.posList)
    }, [])


    return (
        <>
            <WorkOrderInternalTebla>
                <WorkOrderTitle>lista de peças e/ou serviços</WorkOrderTitle>

                <table className='table table-striped'>
                    <thead >
                        <tr>
                            <td>Id</td>
                            <td>Descrição</td>
                            <td>Quantidade</td>
                            <td>Preço</td>

                        </tr>
                    </thead>
                    <tbody>
                        {listPos && listPos.map((pos, i) => (
                            <tr key={pos.pas_id === 0 ? i : pos.pas_id}>
                                <td>{pos.pas_id === 0 ? i : pos.pas_id}</td>
                                <td>{pos.pas_description}</td>
                                <td>{pos.pas_quantity}</td>
                                <td>{pos.pas_price}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </WorkOrderInternalTebla>
        </>
    )

}