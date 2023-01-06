import styled from 'styled-components';



export const Td_Options = styled.div`
    
    display: flex;
    justify-content: space-around;

    button{
        /* margin-top: 5px;
        margin-bottom: 5px; */
        border: 1px solid #000;

        &:hover{
            border: 1px solid #000;
            box-shadow: #000 0px 2px 5px;
        }
    }
    
`

export const TablePartsOrService = styled.table`

    color: #000;
    margin-top: 5px;

    thead{
        tr{
            background-image: linear-gradient(
            to top, #1b232e, #1c2a37,
            #1c3140, #1a3948, #164150,
            #164150, #164150, #164150, 
            #1a3948, #1c3140, #1c2a37, #1b232e);
            color: #FFF;
            
            td{
                padding-top: 5px;
                padding-bottom: 5px;
            }
        }
    }

    tbody{
        tr{
            td{
                padding-top: 5px;
                padding-bottom: 5px;
            }
            &:nth-child(even){
            background-color: #d1d1d1;
            }
            &:nth-child(odd){
                background-color: #FFF;
                
            } 
        }
    }
    
`