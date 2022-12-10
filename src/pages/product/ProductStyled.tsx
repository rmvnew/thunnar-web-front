import styled from 'styled-components';
import { NavLink } from "react-router-dom"




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