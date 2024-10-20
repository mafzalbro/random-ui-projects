import { useTransform, progress, useScroll, motion } from 'framer-motion'
import { BsForward } from 'react-icons/bs'

export default function FramerAPIs() {
  const { scrollXProgress, scrollY, scrollX, scrollYProgress } = useScroll()
  // const scroll = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2])
  const prog = progress(10, 20, 100)

  console.log({ prog });
  console.log({ scale });
  console.log({ scrollXProgress, scrollY, scrollX, scrollYProgress });
  // console.log({ scroll });
  return (
    <motion.h1 className='text-3xl text-red-300' initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
      See the Console <BsForward className='inline-block' />
    </motion.h1>
  )
}