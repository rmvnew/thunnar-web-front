import styled from 'styled-components';



export const ProductFormText = styled.h1`
    text-align: center;
    margin: 50px;
`


export const ProductFormMain = styled.div`
    display: flex;
    width: 85vw;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;

    @media (max-width: 1400px) {
        
        align-items: flex-start;
        width: 90vw;
        height: auto;
       
  }
`
export const ProductFormForm = styled.div`
    width: 80%;
    margin-bottom: 30px;
    padding: 10px 15px;
`

export const ProductFormLabelOptional = styled.i`
    margin-left: 15px;
    font-size: 0.7rem;
`

export const ProductFormSelect = styled.select`
   margin-top: 0px;
   margin-bottom: 0;
`

export const ProductInputButton = styled.input`
    width: 200px;
    margin-left: 15px;
    
`

export const ProductLabel = styled.label`
    white-space: nowrap;
`