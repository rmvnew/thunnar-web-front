import styled from 'styled-components';


export const SaleMain = styled.div`

    width: 88vw;
    margin-left: 10px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 20vh 62vh 10vh;
    grid-template-areas: "top top"
                         "body1 body2"
                         "footer footer";
    gap:15px ;
    
`

export const SaleTop = styled.div`
    grid-area: top;
    background-color: rgb(38, 67, 80);
    border-radius: 10px;
    padding: 10px;
    

`
export const SaleBody1 = styled.div`
    background-color: rgb(38, 67, 80);
    border-radius: 10px;
    padding: 10px;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    
`
//^ Body2 start

export const SaleBody2 = styled.div`
    grid-area: body2;
    background-color: rgb(38, 67, 80);
    border-radius: 10px;
    padding: 10px;
    /* overflow: scroll; */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    
   
`

export const SaleCardTable = styled.div`
    
    width: 100%;
    height: 98%;
   
    overflow: scroll;

`




export const SaleTable = styled.table`

    margin: 10px;
    width: 97%;
   
   
       
`
export const SaleTableTheadTr = styled.tr`

    
    background-color: rgb(38, 45, 63);
    text-align: center;
    height: 40px;
    padding: 5px;
    color: #FFF;
    
    
       
`
export const SaleTableTheadTd = styled.td`

    
   
    font-weight: 600;
    border: 3px solid #ffffff;
    padding: 0 15px;
    
       
`
export const SaleTableTBodyTr = styled.tr`

    
    text-align: center;
    height: 40px;
    background-color: #FFF;
    
     &:nth-child(even){
        background-color: #d1d1d1;
    }
    &:nth-child(odd){
        background-color: #FFF;
        
    } 

    &:hover{
        cursor: pointer;
        background-color: #547fa7;
        color: white;
        
    }

    
    
`

export const SaleTableTBodyTd = styled.td`

    border: 3px solid #aaa;
    
   
    
`
//^ Body2 end

export const SaleFooter = styled.div`
    grid-area: footer;
    background-color: rgb(38, 67, 80);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    
`


export const CardBody1 = styled.div`

    /* background-color: #a5f2f7; */
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;

    label{
        color: #FFF;
        font-style: italic;
        font-weight: 600;
        margin-left: 10px;
    }
    
`



export const CardSuggestion = styled.div`
    position: absolute;
    
    /* margin-top: 30px; */
`

export const Suggestion = styled.div`
    
    background-color: #fff;
    width: 500px;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;

    &:hover{
        cursor: pointer;
        background-color: #4a809f;
        color: #fff;
    }
   
    

`

export const CardSellResult = styled.div`
    
    /* background-color: #2e3131; */
    background-image: linear-gradient(
        to top, #1b232e, #1c2a37,
        #1c3140, #1a3948, #164150,
        #164150, #164150, #164150, 
        #1a3948, #1c3140, #1c2a37, #1b232e);
    color: #fff;
    width: 23%;
    padding-left: 15px;
    text-align: center;
    border-radius: 10px;
    box-shadow: #1cacff 0px 4px 8px;
    z-index: 3;

`


export const ImputProductProcessQuantity = styled.input`

        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
    
`

export const ImputProductProcessSearch = styled.input`

        
        font-weight: 600;
        font-size: 1.2rem;
        padding-left: 20px;
    
`