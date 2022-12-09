import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import './Footer.css'





const Footer = ({ children }: any) => {

    const auth = useContext(AuthContext)




    return (
        <>
            {children}
            {/* <div className='footer'> */}
                <div className="area d-flex justify-content-around">
                    <p className='name-left'>USUÁRIO: <span className='name'>{auth.user?.name}</span></p>
                    <p className='name-right'>PERFIL: <span className='name'>{auth.user?.profile}</span></p>
                </div>
            {/* </div> */}

        </>
    )

}

export default Footer