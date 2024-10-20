import { motion } from "framer-motion";
import { useState } from "react";

interface TooltipProps {
    value: number
}

const TooltipWithFramerMotion = ({ value }: TooltipProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.p
            className="relative text-sm border border-slate-500 px-3 py-0 rounded-full cursor-pointer inline-block transition-all duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        >
            {isHovered && (
                <motion.span
                    initial={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                    animate={{ opacity: 1, filter: "blur(0)", y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="absolute px-2 py-1 bg-red-500 text-white rounded-md text-xs top-[-25px] right-0 z-10 whitespace-nowrap"
                >
                    Subscribers Count
                </motion.span>
            )}
            {value}
        </motion.p>
    );
};

export default TooltipWithFramerMotion;
