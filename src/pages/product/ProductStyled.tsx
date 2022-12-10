import styled from 'styled-components';
import { NavLink } from "react-router-dom"


export const ProductTitle = styled.h1`
    margin: 50px;
    text-align: center;
`

export const ProductMain = styled.div`
    display: flex;
    width: 85vw;
    height: 80vh;
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

export const ProductBaseOption = styled.div`
    display: flex;
   
    justify-content: space-around;
    
     
`

export const ProductTable = styled.table`
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