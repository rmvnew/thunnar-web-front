import styled from 'styled-components';


export const SaleMain = styled.div`

    width: 88vw;
    margin-left: 10px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 20vh 64vh 10vh;
    grid-template-areas: "top top"
                         "body1 body2"
                         "footer footer";
    gap:5px ;
    
`

export const SaleTop = styled.div`
    background-color: yellow;
    grid-area: top;
    

`
export const SaleBody1 = styled.div`
    background-color: blue;
    grid-area: body1;
    
`

export const SaleBody2 = styled.div`
    background-color: green;
    grid-area: body2;
    
`

export const SaleFooter = styled.div`
    background-color: purple;
    grid-area: footer;
    
`