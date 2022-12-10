import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { FooterArea, FooterText, FooterName } from './FooterStyled';





const Footer = ({ children }: any) => {

    const auth = useContext(AuthContext)




    return (
        <>
            {children}
            
                <FooterArea className=" d-flex justify-content-around">
                    <FooterText className='name-left'>USUÁRIO: <FooterName className='name'>{auth.user?.name}</FooterName></FooterText>
                    <FooterText className='name-right'>PERFIL: <FooterName className='name'>{auth.user?.profile}</FooterName></FooterText>
                </FooterArea>
            

        </>
    )

}

export default Footer