import { FC, useContext } from "react";
import { MyContext } from "./MyContextProvider";
import { motion, Variants } from "framer-motion";
import TooltipWithFramerMotion from "../framer/FramerTooltip";

interface Container extends Variants {
    hidden: { opacity: number, x: number },
    visible: { opacity: number, x: number, transition: { delayChildren: number, staggerChildren: number } },
    exit: { opacity: number, x: number },
}

const container: Container = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1, x: 0, transition: {
            delayChildren: 0.3,
            staggerChildren: 0.5
        },
    },
    exit: { opacity: 0, x: 30 },
};


const item = {
    hidden: {
        opacity: 0, x: -10, filter: "blur(40px)"
    },
    visible: {
        opacity: 1, x: 10, filter: "blur(0px)"
    },
    exit: {
        opacity: 0, x: -10, filter: "blur(40px)"
    },
}

const ContextData: FC = () => {
    const data = useContext(MyContext)
    // console.log(data);

    return (
        <>
            <div>
                <nav className="flex justify-between items-center">
                    <motion.h1 className="text-4xl" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                        Context API
                    </motion.h1>
                    <TooltipWithFramerMotion value={data.value} />
                </nav>

            </div>


            <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-3xl text-center my-10">Profiles</motion.h2>
            <motion.div
                className="flex gap-4 justify-center flex-wrap"
                initial="hidden"
                transition={{ duration: 0.3 }}
                animate="visible" exit="exit" variants={container}
            >
                {data.users && (
                    data.users.map(user => <motion.div
                        className="bg-slate-900 sm:w-1/2 md:w-1/3 lg:w-1/4 text-center overflow-hidden px-4 py-8 rounded-lg relative"
                        transition={{ duration: 0.3 }}
                        variants={item}
                        key={user.email}
                    >
                        <p className="text-slate-300 text-xs absolute top-5 left-5 border border-slate-600 rounded-full px-3">{user.price}$</p>
                        <div className="h-40 w-40 my-5 mx-auto overflow-hidden rounded-full">
                            <img className="h-40 w-40 object-contain rounded-full" src={user.img} alt={user.name + `'s Profile`} />
                        </div>
                        <p className="bg-slate-800 inline-block px-4 py-1 rounded-full mt-2 text-slate-300 text-sm">{user.subscription ? 'Subscribed' : 'Not Subscribed'}</p>
                        <h3 className="py-2 text-2xl text-slate-200">{user.name}</h3>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                    </motion.div>))}
            </motion.div>

        </>
    )
}

export default ContextData