
import { AnimatePresence, motion } from 'framer-motion'
import { FaHome, FaBars } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineInbox } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import { NavLink } from 'react-router-dom';
import { useState } from 'react'
import './sidebar.css'


const routes = [
    {
        path: "/",
        name: "Home",
        icon: <FaHome />
    },
    {
        path: "/product",
        name: "Product",
        icon: <AiOutlineInbox />
    },
    {
        path: "/user",
        name: "User",
        icon: <FiUser />
    }
]

const Sidebar = ({ children }:any) => {

    const [isopen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isopen)

    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        },
        show: {
            width: "140px",
            padding: "5px 15px",
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

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
                width: isopen ? "200px" : "40px", transition: {
                    duration: 0.5,
                    type: "spring",
                    damping: 11,
                }
            }} className="sidebar">



                <div className="top_section">

                   
                    {isopen && <motion.img  src={require('../common/assets/logo.png')} className="logo"></motion.img>}

                    <div className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className="search">
                    <div className="search_icon">
                        <BiSearch />
                    </div>
                    <AnimatePresence>
                        {isopen && (<motion.input
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={inputAnimation}
                            placeholder='Search...' />)}
                    </AnimatePresence>
                </div>

                <section className='routes'>
                    {routes.map((route) => (

                        <NavLink
                            // activeClassName="active"
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
            </motion.div>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Sidebar;

