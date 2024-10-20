import { motion } from "framer-motion"

const Hey = () => {
    return (
        <motion.p initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            Hey
        </motion.p>

    )
}

export default Hey