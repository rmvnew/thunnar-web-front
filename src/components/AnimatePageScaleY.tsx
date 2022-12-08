import { motion } from "framer-motion"


const animations = {
    initial: { scaleY: 0, opacity: 0, x: 100, y: -200 },
    animate: { scaleY: 1, opacity: 1, x: 0, y: 0 },
    exit: { scaleY: 0, opacity: 0, x: 100, y: -200 },
}


export const AnimatePageScaleY = ({ children }: any) => {


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