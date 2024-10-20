import { FC, useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./MyContextProvider";
import { motion, Variants } from "framer-motion";

interface Container extends Variants {
    hidden: { opacity: number; x: number };
    visible: { opacity: number; x: number; transition: { delayChildren: number; staggerChildren: number } };
    exit: { opacity: number; x: number };
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
    hidden: { opacity: 0, x: -10, filter: "blur(40px)" },
    visible: { opacity: 1, x: 10, filter: "blur(0px)" },
    exit: { opacity: 0, x: -10, filter: "blur(40px)" },
};

const ContextDataView: FC = () => {
    const data = useContext(MyContext);
    const [isVisible, setIsVisible] = useState<boolean[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
                if (index !== -1) {
                    if (entry.isIntersecting) {
                        // Set the card as visible
                        setIsVisible((prev) => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
                            return newVisible;
                        });
                    } else {
                        // Set the card as hidden
                        setIsVisible((prev) => {
                            const newVisible = [...prev];
                            newVisible[index] = false;
                            return newVisible;
                        });
                    }
                }
            });
        });

        // Observe each card
        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            observer.disconnect(); // Cleanup observer on component unmount
        };
    }, [data.users]);

    return (
        <>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl text-center my-10"
            >
                With Observer API
            </motion.h2>
            <motion.div
                className="flex gap-4 justify-center flex-wrap"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={container}
            >
                {data.users &&
                    data.users.map((user, index) => (
                        <motion.div
                            className="bg-slate-900 sm:w-1/2 md:w-1/3 lg:w-1/4 text-center overflow-hidden px-4 py-8 rounded-lg relative"
                            transition={{ duration: 0.3 }}
                            variants={item}
                            key={user.email}
                            ref={(el) => (cardsRef.current[index] = el)} // Store reference to each card
                            initial={isVisible[index] ? "visible" : "hidden"} // Set initial visibility based on state
                            animate={isVisible[index] ? "visible" : "hidden"} // Animate based on visibility state
                        >
                            <p className="text-slate-300 text-xs absolute top-5 left-5 border border-slate-600 rounded-full px-3">
                                {user.price}$
                            </p>
                            <div className="h-40 w-40 my-5 mx-auto overflow-hidden rounded-full">
                                <img
                                    className="h-40 w-40 object-contain rounded-full"
                                    src={user.img}
                                    alt={user.name + `'s Profile`}
                                />
                            </div>
                            <p className="bg-slate-800 inline-block px-4 py-1 rounded-full mt-2 text-slate-300 text-sm">
                                {user.subscription ? 'Subscribed' : 'Not Subscribed'}
                            </p>
                            <h3 className="py-2 text-2xl text-slate-200">{user.name}</h3>
                            <p className="text-slate-400 text-sm">{user.email}</p>
                        </motion.div>
                    ))}
            </motion.div>
        </>
    );
};

export default ContextDataView;
