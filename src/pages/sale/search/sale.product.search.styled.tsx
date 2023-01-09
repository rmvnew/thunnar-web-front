import styled from 'styled-components';





export const CardButtonCommand = styled.div`

    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
    margin-bottom: 15px;

    button{
        width: 200px;
    }
    

`

export const CardTitle = styled.div`

    display: flex;
    justify-content: center;
    margin-bottom: 30px;
   
    

`
export const CardSaleProductSearchPagination = styled.div`

    display: flex;
    justify-content: center;
    margin-top: 15px;
   
 

`

export const CardSaleProductSearchInput = styled.div`

    margin-bottom: 15px;
   
 

`
export const CardSaleProductTable = styled.table`


thead{
    td{
            text-align: center;
            background-color: #1d475d;
            color: white;
            height: 35px;
            border: 1px solid #000;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    tbody{
        
        tr{

            td{
                border: 1px solid #000;
                height: 35px;
                padding-left: 10px;
                padding-right: 10px;
            }

            &:nth-child(even){
                background-color: #d1d1d1;
            }
            &:nth-child(odd){
                background-color: #FFF;
                
            } 
            
            &:hover{
                background-color: #ffc106ff;
                cursor: pointer;
            }


        }

    }
   
 

`


export const CardSaleProductTabletQuantity = styled.div`
    
    text-align: center;
    border: 1px solid #000;
    height: 35px;

`
export const CardSaleProductTabletSelect = styled.div`
    
    display: flex;
    align-items: center;
    
    input{
        width: 35px;
        height: 25px;
        text-align: center;
        margin-right: 10px;
    }

    button{
        display: flex;
        align-items: center;
        height: 30px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

`