import { motion } from 'framer-motion';
import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { AnimatePageLeft } from '../components/AnimatePageLeft';




const DashBoard = () => {

    const auth = useContext(AuthContext)

    // const [data,setData] = useState('')

    // useEffect(()=>{
    //     setData(auth.user?.name!)
    // },[])

    return (
        <>
            <AnimatePageLeft>
                {/* <h1>{data}</h1> */}
                <h1>{auth.user?.name}</h1>
            </AnimatePageLeft>

        </>
    )

}

export default DashBoard