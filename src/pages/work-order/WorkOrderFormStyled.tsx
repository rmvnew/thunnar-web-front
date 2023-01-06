import styled, { keyframes } from "styled-components";
import { WorkOrder } from './Work-order';







export const WorkOrderForm_Header = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Rubik+Vinyl&family=Zen+Dots&display=swap');
    font-family: 'Zen Dots', cursive;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    background-color: rgb(38, 67, 80);
    width: 100vw;
    height: 30px;
    align-items: center;
    color: #FFF;

`

export const WorkOrderForm_Main = styled.div`
    
   position: relative;
   flex-direction: row;
   margin-left: 20px;
   margin-top: 40px;
   width: 80vw;
   height: 90vh;
   /* overflow: scroll; */
    
    
    

`
export const WorkOrderForm_NumberOrder = styled.h1`
    
    position: absolute;
    justify-content: flex-start;
    margin-left: 20px;
    padding-top: 5px;
    font-size: 1.3rem;
    

`

export const WorkOrderForm_Title = styled.h1`
    
    position: absolute;
    left: 40%;
    padding-top: 5px;
    font-size: 1.3rem;

`

export const WorkOrderForm_Label = styled.label`
    
    
    margin-top: 10px;
    margin-left: 15px;
    font-style: italic;
    font-weight: bold;

`

export const WorkOrderForm_Label_status = styled.label`
    
    font-size: 0.8rem;
    align-items: center;
    margin-top: 10px;
    font-style: italic;
    font-weight: bold;

`

export const WorkOrderClientCardButtons = styled.div`

    display: flex;
    position: relative;
    flex-direction: row; 
    margin-top: 10px;
    
`

export const WorkOrderClientButton = styled.button`
    
    width: 180px;
    height: 35px;
    border-radius: 5px;
    margin-left: 10px;
    

    &:hover{
        font-weight: bold;
    }

`

export const WorkOrderClientCard = styled.div`

    background-color: rgb(38, 67, 80);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-left: 5px;
    margin-top: 10px;
    color: #FFF;

    &:hover{
        box-shadow: #066ba6 0px 3px 5px;
    }

    
`

export const WorkOrderTableCard = styled.div`


    background-color: rgb(38, 67, 80);
    margin-top: 10px;
    padding-top: 10px;
    border-radius: 10px;
    color: #FFF;
    height: 245px;
    
    
    table{
        text-align: center;
        width: 95%;
        /* margin-left: 15px; */

        tr{
            background-color: #FFF;
            
            td{
                border: 2px solid #000;
                align-items: center;
                justify-content: center;
                
            }
        }

    }

    &:hover{
        box-shadow: #066ba6 0px 3px 5px;
    }
   
    
`


export const WorkOrderInternalTable = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    width: 97%;
    height: 220px;
    overflow: scroll;
    
   
    
`

export const WorkOrderClientInputs = styled.input`

    margin-bottom: 20px;
    margin-left: 10px;
    width: 90%;

    
`

export const WorkOrderproblemInput = styled.input`

    

    margin-left: 10px;
    width: 97%;
    /* margin-bottom: 20px; */

`

const failCondition = keyframes`
    0%{
        transform: translateX(0%);
        opacity: 1;
    }50%{
        transform: translateX(-1%);
        opacity: 0.6;
    }100%{
        transform: translateX(0%);
        opacity: 1;
        
    }
    
`
export const WorkOrderDeviceInput = styled.input`

    

    margin-left: ${props => props.property};
    width: 97%;
    box-shadow: ${props => props.alt == 'pass' ? "#FFF 0px 0px 0px" : "#F00 0px 0px 20px"};
    animation: ${props => props.itemProp == 'pass' ? "" : failCondition};
    animation-duration: 0.3s;
    overflow: hidden;



    
`

export const WorkOrderButtonController = styled.button`

    width: 200px;
    /* margin-left: 10px; */
    margin-right: 15px;
    margin-top: 10px;
    color: #FFF;
    border: 1px solid #000;
    &:hover{
        border: 2px solid #000;
        font-weight: 600;
        color: #FFF;
    }
    
`

export const WorkOrderButtonUpdate = styled.button`

    width: 200px;
    /* margin-left: 10px; */
    margin-right: 15px;
    margin-top: 10px;
    color: #FFF;
    border: 1px solid #000;
    box-shadow: ${props => props.about}; //#0b811993 0px 1px 9px 9px;
    &:hover{
        border: 2px solid #000;
        font-weight: 600;
        color: #FFF;
    }
    
`

export const WorkOrderButtonDevice = styled.button`

    width: 200px;
    margin-left: 10px;
    margin-bottom: 20px;
    margin-top: 20px;

    
`

export const WorkOrderTitle = styled.h2`

    @import url('https://fonts.googleapis.com/css2?family=Rubik+Vinyl&family=Zen+Dots&display=swap');
    font-family: 'Zen Dots', cursive;
    font-size: 1.2rem;
    margin-top: 5px;
    margin-bottom: 0;
    color: #7fcaff;
    text-align: center;
    text-shadow: #000c01 0px 2px 4px;
   
`


export const WorkOrderTopCard = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 98%;
    background-color: rgb(38, 67, 80);
    margin-left: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: #FFF;
    padding-top: 15px;
    padding-bottom: 15px;
    
`

export const WorkOrderTopCardInternal = styled.div`

    display: flex;
    flex-direction: column;
    background-image: linear-gradient(
        to top, #1b232e, #1c2a37,
         #1c3140, #1a3948, #164150,
         #164150, #164150, #164150, 
         #1a3948, #1c3140, #1c2a37, #1b232e);
    width: 23%;
    align-items: center;
    border-radius: 10px;
    box-shadow: #4fc1eb 3px 3px 9px;
    &:hover{
        box-shadow: #4fc1eb 0px 6px 9px;
    }
`





export const WorkOrderSelectTechnician = styled.select`

    margin-left: 10px;
    
   
    
`

export const WorkOrderDeviceCard = styled.div`

    width: 95%;
    margin-left: 10px;
    
`


export const WorkOrderButtonTable = styled.button`
    /* margin-top: 5px;
    margin-bottom: 5px; */
    border: 1px solid #000;

    &:hover{
        border: 1px solid #000;
        box-shadow: #000 0px 2px 5px;
    }
`

export const WorkOrderResponseStatus = styled.h3`

    font-size: 1rem;
    color: ${props => props.about === 'CANCELADA'?'#e80000': props.about === 'FINALIZADA'?'#00e1ff':'#3dff33'} ;
    font-weight: 600;
    
`