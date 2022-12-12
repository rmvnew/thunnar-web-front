import styled from "styled-components";






export const WorkOrderForm_Header = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Vinyl&family=Zen+Dots&display=swap');
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    background-color: rgb(38, 67, 80);
    width: 100vw;
    height: 80px;
    align-items: center;
    color: #FFF;
    font-family: 'Zen Dots', cursive;

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

