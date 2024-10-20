// import BoxesName from './components/BoxesName'
// import Init from './components/Init'
// import FramerAPIs from './components/FramerAPIs'
// import ReactAPIs from './components/react-apis/ReactAPIs'
import Lenis from 'lenis'
import './App.css'
import { motion } from 'framer-motion';

const App = () => {
  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <>
      {/* <BoxesName /> */}
      {/* <Init /> */}
      {/* <FramerAPIs /> */}
      {/* <ReactAPIs /> */}

     

      <motion.h1 className='text-3xl' initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
        This is APP
      </motion.h1>
    </>
  )
}

export default App