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
    
    width: 80vw;
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

export const WorkOrderButtonComplet = styled.button`
    &:before {
        content: attr(data-hover);
        visibility: hidden;
        opacity: 0;
        width: max-content;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 5px 5px;
        transition: opacity 1s ease-in-out;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 110%;
    }
`

export const WorkOrderTable = styled.table`
   margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    thead{
        background-color:rgb(38, 67, 80);
        color: #FFF;
        font-size: 1rem;
        font-weight: bold;
    }
    td{     
        border: solid 1px #000;
        text-align: center;
    }
`

export const WorkOrderButtonTable = styled.button`
    
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid #000;

    &:hover{
        border: 1px solid #000;
        box-shadow: #000 0px 2px 5px;
    }

`

export const WorkOrderNavLinkTable = styled(NavLink)`
    
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid #000;

    &:hover{
        border: 1px solid #000;
        box-shadow: #000 0px 2px 5px;
    }
`


export const WorkOrderTableTd = styled.td`
    
    background-color: ${props => props.scope === 'FINALIZADA' ? '#cefdde' : props.about === '0' ? '#DDD' : '#FFF'} ;


`

export const WorkOrderTableOptions = styled.div`
    
   display: flex;
   justify-content: space-around;
   

`

export const PaginationCardworkOrder = styled.div`
    /* background-color: aliceblue; */
    display: flex;
    justify-content: center;


`

export const TableDevices = styled.table`

    color: #000;
    margin-top: 5px;

    thead{
        tr{
            background-image: linear-gradient(
            to top, #1b232e, #1c2a37,
            #1c3140, #1a3948, #164150,
            #164150, #164150, #164150, 
            #1a3948, #1c3140, #1c2a37, #1b232e);
            color: #FFF;
            
            td{
                padding-top: 5px;
                padding-bottom: 5px;
            }
        }
    }

    tbody{
        tr{
            td{
                padding-top: 5px;
                padding-bottom: 5px;
            }
            &:nth-child(even){
            background-color: #d1d1d1;
            }
            &:nth-child(odd){
                background-color: #FFF;
                
            } 
        }
    }
    
`

