
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { AnimatePageLeft } from '../components/AnimatePageLeft';




const DashBoard = () => {

    const auth = useContext(AuthContext)

   

    return (
        <>
            <AnimatePageLeft>
                
                <h1>{auth.user?.name}</h1>
            </AnimatePageLeft>

        </>
    )

}

export default DashBoard