import { motion } from "framer-motion"
import { useContext, useEffect } from 'react';
import { useGlobalContext } from '../data/Store';



const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 500 },
}


export const AnimatePageLeft = ({ children }: any) => {




    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    )

}