import styled from 'styled-components';
import { NavLink } from "react-router-dom"


export const ProductTitle = styled.h1`
    margin: 50px;
    text-align: center;
`

export const ProductMain = styled.div`
    /* display: flex; */
    width: 80vw;
    height: 70vh;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;

`
export const ProductInputSearch = styled.input`
    margin-bottom: 10px;
`

export const ProductSectionNewProduct = styled.section`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

export const ProductButtonNewProduct = styled(NavLink)`
    margin-bottom: 10px;
    width: 200px;
`

export const ProductTableButtonNavLink = styled(NavLink)`
   margin-top: 5px;
   margin-bottom: 5px;
   border: 1px solid #000;

   &:hover{
    border: 1px solid #000;
    box-shadow: #000 0px 2px 5px;
   }
`
export const ProductTableButton = styled.button`
   margin-top: 5px;
   margin-bottom: 5px;
   border: 1px solid #000;

   &:hover{
    border: 1px solid #000;
    box-shadow: #000 0px 2px 5px;
   }
`

export const ProductBaseOption = styled.div`
    display: flex;
   
    justify-content: space-around;
    
     
`

export const ProductTable = styled.table`
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
    
    tbody{
        tr{
            &:nth-child(even){
            background-color: #d1d1d1;
            }
            &:nth-child(odd){
                background-color: #FFF;
                
            } 
        }
    }
    
    `

export const ProductTableTheadTd = styled.td`
    padding: 10px 10px;
    font-style: italic;

    
    
`

export const PaginationCard = styled.div`
    /* background-color: aliceblue; */
    display: flex;
    justify-content: center;


`