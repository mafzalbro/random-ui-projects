import { motion } from 'framer-motion';
import { useState } from 'react';

const slides = [
  { id: 1, color: 'from-red-500 to-red-700', text: 'Slide 1' },
  { id: 2, color: 'from-green-500 to-green-700', text: 'Slide 2' },
  { id: 3, color: 'from-blue-500 to-blue-700', text: 'Slide 3' },
  { id: 4, color: 'from-yellow-500 to-yellow-700', text: 'Slide 4' },
  { id: 5, color: 'from-purple-500 to-purple-700', text: 'Slide 5' },
];

const ThreeDEffectSwiperFramer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    console.log(event);

    const threshold = 100; // Adjust this threshold as needed
    if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % slides.length); // Next Slide
    } else if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length); // Previous Slide
    }
  };

  return (
    <>
      <h2 className='my-20 px-20 text-center text-4xl'>3D Effect with Framer Motion</h2>
      <div className="relative flex justify-center items-center h-96 overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.1}
            onDragEnd={(event, info) => handleDragEnd(event, info)}
            initial={{ scale: 0.8, opacity: 0.5, rotateY: 0, zIndex: 0 }}
            animate={activeIndex === index ? { scale: 1.2, opacity: 1, rotateY: 0, zIndex: 1 } : { scale: 0.9, opacity: 0.5, rotateY: -20, zIndex: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateY: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`absolute flex items-center justify-center bg-gradient-to-r ${slide.color} rounded-lg shadow-xl text-xl font-bold text-white text-center h-full w-64 transition-all duration-300 ease-in-out`} // Set a specific width
          >
            {slide.text}
          </motion.div>
        ))}
      </div>
      {/* <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 mx-1 rounded-full cursor-pointer ${activeIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div> */}
    </>
  );
};

export default ThreeDEffectSwiperFramer;
