
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { AnimatePageLeft } from '../components/AnimatePageLeft';
import { AnimatePageOpacity } from '../components/AnimatePageOpacity';




const DashBoard = () => {

    const auth = useContext(AuthContext)

   

    return (
        <>
            <AnimatePageOpacity>
                
                <h1>{auth.user?.name}</h1>
            </AnimatePageOpacity>

        </>
    )

}

export default DashBoard