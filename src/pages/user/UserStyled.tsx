import styled from 'styled-components';
import { NavLink } from "react-router-dom";



export const UserTitle = styled.h1`
    margin: 50px;
    text-align: center;
`


export const UserMain = styled.div`
    /* display: flex; */
    width: 80vw;
    height: 70vh;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;

`

export const UserNewUser = styled.section`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    width: 100%;

`
export const UserBtnNewUser = styled(NavLink)`
    margin-bottom: 10px;
    width: 200px;

`

export const UserInputSearch = styled.input`
     margin-bottom: 10px;
`

export const UserBaseOption = styled.div`
    display: flex;
   
    justify-content: space-around;
    
     
`





export const UserTable = styled.table`
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

export const UserTableTheadTd = styled.td`
    padding: 10px 10px;
    font-style: italic;
    `
 
 export const UserTableButtonNavLink = styled(NavLink)`
 margin-top: 5px;
 margin-bottom: 5px;
 border: 1px solid #000;

 &:hover{
  border: 1px solid #000;
  box-shadow: #000 0px 2px 5px;
 }
`
export const UserTableButton = styled.button`
 margin-top: 5px;
 margin-bottom: 5px;
 border: 1px solid #000;

 &:hover{
  border: 1px solid #000;
  box-shadow: #000 0px 2px 5px;
 }
`


export const PaginationCardUser = styled.div`
    /* background-color: aliceblue; */
    display: flex;
    justify-content: center;


`
