import { useState, useEffect } from 'react';
import { Pas } from "../../../interfaces/Pas.interface"
import { WorkOrderInternalTebla, WorkOrderTitle } from "../WorkOrderFormStyled"
import { ImBin, ImPencil2 } from "react-icons/im"
import { Td_Options } from './TablePosStyled';





export const TablePos = (props: any) => {


    const [listPos, setListPos] = useState<Pas[]>([])

    function editPos(pos_id: number) {
        props.editPos(pos_id)
    }

    function deletePos(pos_id: number) {
        props.deletePos(pos_id)
    }


    useEffect(() => {
        setListPos(props.posList)

        setTimeout(()=>{
            console.log('###',listPos);
        },1500)
        
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
                            <td>Status</td>
                            <td>Opções</td>

                        </tr>
                    </thead>
                    <tbody>
                        {listPos && listPos.map((pos, i) => (
                            <tr key={pos.pas_id === 0 ? i : pos.pas_id}>
                                <td>{pos.pas_id === 0 ? i : pos.pas_id}</td>
                                <td>{pos.pas_description}</td>
                                <td>{pos.pas_quantity}</td>
                                <td>{pos.pas_price}</td>
                                <td>{pos.isSaved === true? 'Saved':'cash'}</td>
                                <td>
                                    <Td_Options>
                                        <button className='btn btn-warning' onClick={() => editPos(pos.pas_id === 0 ? i : pos.pas_id)}><ImPencil2 /></button>
                                        <button className='btn btn-danger' onClick={() => deletePos(pos.pas_id === 0 ? i : pos.pas_id)}><ImBin /></button>
                                    </Td_Options>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </WorkOrderInternalTebla>
        </>
    )

}