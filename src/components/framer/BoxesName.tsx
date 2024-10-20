import { motion, type Variants } from 'framer-motion'

import React, { useState } from 'react'


export default function BoxesName() {

  const [data, setData] = useState([
    { id: 0, name: "Afzal", description: 'My name is Afzal, im 24 years old...' },
    { id: 1, name: "Ali", description: 'My name is Ali, im 19 years old...' },
    { id: 2, name: "Fotoo", description: 'My name is Fotoo, im 7 years old...' },
  ])
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

  const handleDelete = (id: number) => {
    setData(prevData => prevData.filter(dataItem => dataItem.id !== id));
  };

  // const handleDuplicate = (id: number) => {
  //   setData(prevData => {
  //     const itemToDuplicate = prevData.find(dataItem => dataItem.id === id);
  //     if (itemToDuplicate) {
  //       const newItem = { ...itemToDuplicate, id: prevData.length };
  //       return [...prevData, newItem];
  //     }
  //     return prevData;
  //   });
  // };


  return (
    <>

      <motion.div initial="hidden"
        transition={{ duration: 0.6 }}
        className='flex flex-wrap gap-4'
        animate="visible" exit="exit" variants={container}>
        {data.map(element => <React.Fragment key={element.id}>
          <motion.div
            onClick={() => handleDelete(element.id)}
            transition={{ duration: 0.6 }}
            variants={item}
            className='bg-gray-900 my-1 cursor-alias p-4 rounded-lg sm:h-1/3 md:w-1/4 lg:w-1/6'
          >
            <div>
              <span className='text-sm'>
                {element.id}
              </span>
              <h2 className='text-4xl my-4'>
                {element.name}
              </h2>
              <p className='text-normal'>
                {element.description}
              </p>
            </div>
          </motion.div>
        </React.Fragment>)}
      </motion.div>

    </>
  )
}