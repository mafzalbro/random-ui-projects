import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'

const array: string[] = ['Mango', 'Apple', 'Orange']

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2
    }
  }
}


const item = {
  hidden: { opacity: 0, filter: "blur(30px)", scale: 0 },
  visible: {
    opacity: 1,
    filter: "blur(0px)", scale: 1
  }
}



export default function Init() {
  const constraintsRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2])


  return (
    <>
      <motion.h1 className='text-3xl' initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
        Hello world!
      </motion.h1>
      {array && <motion.div variants={container}
        initial="hidden"
        animate="visible"
      >
        {array.map((element => {
          return <motion.div
            variants={item}
            key={element}
            whileHover={{ scale: 0.9 }}
            style={{ display: 'inline-block' }}
            transition={{ duration: 1 }}
            className='px-1 hover:text-blue-200 cursor-pointer'
          >
            {element}
          </motion.div>
        }))}
      </motion.div>}
      <motion.div ref={constraintsRef} className='relative bg-slate-900 my-20 h-60 w-full overflow-hidden'>
        <motion.div
          className='bg-slate-400 w-20 h-20'
          drag
          dragConstraints={constraintsRef}
        />
        <p className='text-slate-300 pl-4'>
          Drag This Box
        </p>
      </motion.div>

      <motion.div
        style={{ scale }}
      >
        <motion.div
          className='bg-slate-500 my-20 h-60 w-full overflow-hidden'
          style={{
            scaleY: scrollYProgress
          }}
        />
      </motion.div>

    </>
  )
}