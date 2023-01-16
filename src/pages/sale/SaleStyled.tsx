import styled from 'styled-components';


export const SaleMain = styled.div`

    width: 85vw;
    margin-left: 10px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 10vh 62vh 15vh;
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
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
`

export const CardBody1 = styled.div`

    /* background-color: #a5f2f7; */
    width: 100%;
    
    margin-top: 10px;

    label{
        color: #FFF;
        font-style: italic;
        font-weight: 600;
        margin-left: 10px;
    }
    
`
export const CardBody2 = styled.div`

    /* background-color: #a5f2f7; */
    width: 100%;
    /* margin-top: 30px; */
    padding-top: 30px;
    padding-bottom: 20px;
    /* margin-bottom: 30px; */
    display: flex;
    justify-content: center;
    

    label{
        color: #FFF;
        font-style: italic;
        font-weight: 600;
        margin-left: 10px;
    }
    
`

export const CardBody2b = styled.div`

    /* background-color: aqua; */
    width: 95%;
    display: flex;
    justify-content: space-around;
    padding-bottom: 30px;
    border-top: 3px solid #FFF;
    border-bottom: 3px solid #FFF;
    
    
    
`

export const LabelTytleLastInput = styled.label`
    
    text-align: center;
    font-size: 1.4rem;
    color: #09c6ff;

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

    
background-image: linear-gradient(
        to top, #1b232e, #1c2a37,
        #1c3140, #1a3948, #164150,
        #164150, #164150, #164150, 
        #1a3948, #1c3140, #1c2a37, #1b232e);
    text-align: center;
    height: 40px;
    padding: 5px;
    color: #FFF;
    
    
       
`
export const SaleTableTheadTd = styled.td`

    
   
    font-weight: 600;
    border: 1px solid #000;
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
        background-color: #ffc106ff;
        color: #000000;
        
    }

    
    
`

export const SaleTableTBodyTd = styled.td`

    border: 1px solid #000;
    
   
    
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





export const CardSuggestion = styled.div`
    position: absolute;
    
    /* margin-top: 30px; */
    button{
        position: absolute;
        width: 30px;
        border-radius: 50px;
        background-color: #7e0903;
        font-weight: 600;
        color: #ffea00;
        border: 2px solid #fbff00;
        right: 0;

    }
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
    width: 32%;
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

export const ImputProductProcessLastName = styled.input`

        
        font-weight: 600;
        font-size: 0.8rem;
        padding-left: 20px;
       
    
`

export const ImputProductProcessLastNumber = styled.input`

        
        font-weight: 600;
        font-size: 0.8rem;
        padding-left: 20px;
        text-align: center;
        
    
`



export const CardButtonCommandServiceOrder = styled.div`
    
    width: 100%;
    /* background-color: #403bdc; */
    display: flex;
    justify-content: space-around;
    /* margin-top: 10px; */
    height: 80%;
    align-items: center;

    button{
        width: 45%;
        height: 80%;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        font-size: 1.5rem;
        font-style: italic;
        border: 2px solid #000;

        &:hover{
            border: 2px solid #000;
            box-shadow: #8f8f03 0px 4px 7px;
            font-size: 1.6rem;
        }

    }



`

export const CardBody3 = styled.div`
    
/* background-color: brown; */
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;


`


export const SaleTitle = styled.h1`

    width: 100%;
    font-size: 3.5rem;
    text-align: center;
    color: #FFF;
`

export const SaleLogo = styled.img`
    position: relative;
    left: 35px;
    width: 80px;
    height: 70px;
`

export const SaleTitleCard = styled.div`
    

    display: flex;


`