import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';




const DashBoard = () => {

    const auth = useContext(AuthContext)

    // const [data,setData] = useState('')

    // useEffect(()=>{
    //     setData(auth.user?.name!)
    // },[])

    return (
        <>
            {/* <h1>{data}</h1> */}
            <h1>{auth.user?.name}</h1>
        </>
    )

}

export default DashBoard