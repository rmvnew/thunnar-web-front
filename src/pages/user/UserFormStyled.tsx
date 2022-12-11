import styled from 'styled-components';





export const UserFormMain = styled.div`
    display: flex;
    width: 80vw;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;


    @media (max-width: 1400px) {
        
        align-items: flex-start;
        width: 90vw;
       
       
  }
  
  @media (max-height: 700px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
       
       
  }

`

export const UserFormLabel = styled.label`
    margin-top: 15px;
    margin-left: 15px;
`


export const UserFormForm = styled.div`
    width: 800px;
    margin-bottom: 30px;
    
`

export const UserInputButton = styled.input`
    width: 200px;
    margin-left: 15px;
    
`