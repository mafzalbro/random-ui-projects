import { motion } from "framer-motion"
import { FC } from "react"
import { NavLink, useLocation } from "react-router-dom"
import Hey from "./framer/Hey"
// import { Link, NavLink } from "react-router-dom"

const Nav: FC = () => {

    const navData = [
        {
            key: 'home',
            link: '/',
            name: 'Home'
        },
        {
            key: 'react-api',
            link: '/react-api',
            name: 'React APIs'
        },
        {
            key: 'boxes',
            link: '/boxes',
            name: 'Name Boxes'
        },
        {
            key: 'init',
            link: '/init',
            name: 'Initialize'
        },
        {
            key: 'framer-api',
            link: '/framer-api',
            name: 'Framer APIs'
        },
        {
            key: 'scroll-cards',
            link: '/scroll-cards',
            name: 'Scroll Cards'
        },
        {
            key: '3d',
            link: '/3d',
            name: 'Scroll 3D'
        },
        {
            key: '3d-swiper',
            link: '/3d-swiper',
            name: '3D Swiper'
        },
    ]
    const { pathname } = useLocation()
    return (
        <>
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <ul className="flex gap-4 my-4 flex-wrap">
                    {
                        navData.map(navItem => (
                            <motion.li key={navItem.key}>
                                <NavLink to={navItem.link} className={`hover:text-blue-300 ${pathname == navItem.link ? 'text-sm border border-slate-500 bg-slate-800 px-3 py-1 rounded-full' : ''}`}>{navItem.name}</NavLink>
                            </motion.li>
                        ))
                    }
                </ul>
            </motion.nav >
            <Hey />
        </>
    )
}

export default Nav