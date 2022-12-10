import styled from 'styled-components'


export const LoginTitle = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Roboto:wght@900&display=swap');
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
    position: absolute;
    top: 0;
    display: flex;
    background-color: #00a1e7;
    height: 100px;
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-family: 'Permanent Marker', cursive;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    h2{
        font-size: 2.8rem;
    }
`


export const LoginCard = styled.div`
    width: 100vw;
    height: 100vh;
    background: #fcfcfd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const LoginInputs = styled.div`
    border-radius: 15px;
    position: relative;
    background-color: rgb(62, 81, 98);
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 600px;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

    input{
        width: 80%;
        margin-top: 20px;
        text-align: center;
        border-radius: 20px;
        font-size: 1.3rem;
    }

    button{
        margin-top: 40px;
        border-radius: 10px;
        width: 200px;
        color: white;
        font-size: 1.5rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    
    button:hover{
        font-weight: bold;
    }

`

export const LoginRecoverText = styled.a`
    position: absolute;
    right: 80px;
    margin-top: 7px;
    color: #FFF;

    &:hover{
        font-weight: 600;
        color: #FFF;
        cursor: pointer;
    }
`