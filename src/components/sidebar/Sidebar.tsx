
import { AnimatePresence, motion } from 'framer-motion'
import { FaHome, FaBars } from 'react-icons/fa'
import { AiOutlineInbox,AiFillSnippets } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import { GiReceiveMoney } from 'react-icons/gi'
import { NavLink } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import './Sidebar.css'





const routes = [
    {
        path: "/",
        name: "Home",
        icon: <FaHome />
    },
    {
        path: "/product",
        name: "Produtos",
        icon: <AiOutlineInbox />
    },
    {
        path: "/user",
        name: "Usuários",
        icon: <FiUser />
    },
    {
        path: "/work-order",
        name: "Ordem de serviço",
        icon: <AiFillSnippets />
    },
    {
        path: "/sale",
        name: "Venda",
        icon: <GiReceiveMoney />
    }
]

const Sidebar = ({ children }: any) => {

    function removeToken() {
        console.log('limpa');
        localStorage.removeItem('authToken')
    }

    const storageData = localStorage.getItem('authToken')

    const [isExit, setIsExit] = useState(false)

    useEffect(() => {
        setIsExit(!isExit)
    }, [storageData])

    const auth = useContext(AuthContext)

    const [isopen, setIsOpen] = useState(true)

    const toggle = () => setIsOpen(!isopen)

    

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5
            }
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }


    return (
        <div className="main-container">
            <motion.div animate={{
                width: isopen ? "200px" : "50px", transition: {
                    duration: 0.5,
                    type: "spring",
                    damping: 11,
                }
            }} className="sidebar">



                <div className="top_section">


                    {isopen && <motion.img src={require('../../common/assets/logo.png')} className="logo"></motion.img>}

                    <div className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>

               

                <section className='routes'>
                    {routes.map((route) => (



                        <NavLink
                           
                            to={route.path} key={route.name} className="link">
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence>
                                {isopen && (<motion.div
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="link_text">{route.name}</motion.div>)}
                            </AnimatePresence>
                        </NavLink>

                    ))}
                </section>

                <section className="routes exit">
                    <motion.div animate={{
                        width: isopen ? "200px" : "50px", transition: {
                            duration: 0.5,
                            type: "spring",
                            damping: 11,
                        }
                    }} >
                        {isExit && auth.user && <NavLink
                            to={'/login'} key={'Sair'} className="link" onClick={() => removeToken()}>
                            <div className="icon">{<SlLogout />}</div>
                            <AnimatePresence>
                                {isopen && auth.user && (<motion.div
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="link_text">{'Sair'}</motion.div>)}
                            </AnimatePresence>
                        </NavLink>}
                    </motion.div>
                </section>
            </motion.div>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Sidebar;

