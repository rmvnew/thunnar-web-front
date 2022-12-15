import styled from "styled-components";






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

    
`

export const WorkOrderClientInputs = styled.input`

    margin-bottom: 20px;
    margin-left: 10px;
    width: 90%;

    
`

export const WorkOrderproblemInput = styled.input`

    margin-left: 10px;
    width: 97%;
    margin-bottom: 20px;

    
`

export const WorkOrderButtonSave = styled.button`

    width: 200px;
    margin-left: 10px;
    margin-top: 20px;

    
`

export const WorkOrderTitle = styled.h2`
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Vinyl&family=Zen+Dots&display=swap');
    font-family: 'Zen Dots', cursive;
    margin: 10px;
    text-align: center;
   
`