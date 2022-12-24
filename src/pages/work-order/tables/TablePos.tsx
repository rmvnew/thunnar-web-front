import { useState, useEffect } from 'react';
import { Pas } from "../../../interfaces/Pas.interface"
import { WorkOrderInternalTebla, WorkOrderTitle } from "../WorkOrderFormStyled"
import { ImBin, ImPencil2 } from "react-icons/im"
import { Td_Options } from './TablePosStyled';





export const TablePos = (props: any) => {


    const [listPos, setListPos] = useState<Pas[]>([])

    function editPos(index: number) {

        props.editPos(listPos[index])
    }

    function deletePos(index: number) {
        props.deletePos(listPos[index])
    }


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
                                <td>{pos.isSaved === true ? 'Saved' : 'cash'}</td>
                                <td>
                                    <Td_Options>
                                        <button className='btn btn-warning' onClick={() => editPos(i)}><ImPencil2 /></button>
                                        <button className='btn btn-danger' onClick={() => deletePos(i)}><ImBin /></button>
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