import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity"
import { WorkOrderForm_Main, WorkOrderForm_NumberOrder, WorkOrderForm_Title } from "./WorkOrderFormStyled"






export const WorkOrderForm = () => {

    const location = useLocation()
    const dataResult = location.state?.data


    function setUser() {
        if (dataResult !== undefined) {
            setIsUpdate(true)


        } else {
            setIsUpdate(false)
        }

    }

    const [isUpdate, setIsUpdate] = useState(false)
    const [order,setOrder] = useState(0)



    useEffect(() => {
        setUser()



    }, [])

    return (
        <>
            <AnimatePageOpacity>

                <WorkOrderForm_Main>

                    <WorkOrderForm_NumberOrder>Ordem: {order}</WorkOrderForm_NumberOrder>
                    <WorkOrderForm_Title>Gerenciador de Ordem de serviço</WorkOrderForm_Title>

                </WorkOrderForm_Main>

            </AnimatePageOpacity>
        </>
    )
}