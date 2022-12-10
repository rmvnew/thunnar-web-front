import styled from 'styled-components';
import { NavLink } from "react-router-dom"


export const WorkOrderTitle = styled.h1`
    margin: 50px;
    text-align: center;
`
export const WorkOrderInputSearch = styled.input`
    margin-bottom: 15px;
`

export const WorkOrderMain = styled.div`
    display: flex;
    width: 85vw;
    height: 80vh;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
`

export const WorkorderNewOrder = styled.section`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 10px;
`

export const WorkOrderButtonNewOrder = styled(NavLink)`
    width: 200px;
`

export const WorkOrderTable = styled.table`
    margin-top: 10px;
    thead{
        background-color:rgb(38, 67, 80);
        color: #FFF;
        font-size: 1.2rem;
        font-weight: bold;
    }
    td{     
        border: solid 1px #000;
        padding: 10px 10px;
        text-align: center;
    }
`