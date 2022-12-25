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
    height: 80px;
    align-items: center;
    color: #FFF;

`

export const WorkOrderForm_Main = styled.div`
    
   position: relative;
   flex-direction: row;
   margin-left: 20px;
   margin-top: 100px;
   width: 80vw;
   height: 90vh;
   /* overflow: scroll; */
    
    
    

`
export const WorkOrderForm_NumberOrder = styled.h1`
    
    position: absolute;
    justify-content: flex-start;
    margin-left: 20px;
    

`

export const WorkOrderForm_Title = styled.h1`
    
    position: absolute;
    left: 40%;

`

export const WorkOrderForm_Label = styled.label`
    
    margin-top: 10px;
    margin-left: 15px;
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
    height: 274px;
    
    
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
    margin-top: 10px;
    color: #FFF;

    
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
    margin: 10px;
    text-align: center;
   
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
    background-color: #1e1e1e;
    width: 25%;
    align-items: center;
    border-radius: 10px;
    box-shadow: #4fc1eb 3px 3px 9px;
    &:hover{
        box-shadow: #4fc1eb 0px 6px 9px;
    }
`



export const WorkOrderInternalTable = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    width: 97%;
    height: 250px;
    overflow: scroll;
    
   
    
`

export const WorkOrderSelectTechnician = styled.select`

    margin-left: 10px;
    
   
    
`

export const WorkOrderDeviceCard = styled.div`

    width: 95%;
    margin-left: 10px;
    
`


export const WorkOrderButtonTable = styled.button`
    border: solid 1px black;
        box-shadow: rgba(23, 42, 64, 0.4) 2px 0px 3px 2px, rgba(139, 140, 141, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    
        &:hover{
            border: solid 2px black;
        }
`