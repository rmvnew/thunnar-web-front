import styled from 'styled-components'
import { motion } from 'framer-motion';


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
 
	background: linear-gradient(-45deg, #00546b, #1d677f, #2e9dc2, #1d677f, #00546b);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 50% 100%;
        }
        100% {
            background-position: 100% 50%;
        }
    }

    @media (max-width: 1400px) {
    

    
    }


 

`

export const LoginInputs = styled.div`
    border-radius: 15px;
    position: relative;
    background-color: rgb(40, 40, 40);
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 600px;
    min-width: 400px;
    min-height: 400px;
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


    @media (max-height: 500px) {
    
        border-radius: 15px;
        position: relative;
        background-color: rgb(40, 40, 40);
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 400px;
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

        img{
            width: 150px;
        }
    
    }
    
    @media (max-width: 620px) {
    
        border-radius: 15px;
        position: relative;
        background-color: rgb(40, 40, 40);
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 400px;
        min-height: 400px;
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

        img{
            width: 150px;
        }
    
    }
    

`




export const LoginRecoverText = styled.a`
    position: absolute;
    right: 80px;
    margin-top: 7px;
    color: #ffffff;

    &:hover{
        font-weight: 600;
        color: #FFF;
        cursor: pointer;
    }
`

export const MotionImgLogo = styled(motion.img)`
    
    width: 350px;
    position: absolute;
    top: 20px;

`