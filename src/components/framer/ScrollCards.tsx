import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Example JSON array with 10 card data
const cardsData = [
    {
        id: 1,
        body: { title: 'Card 1', description: 'Description 1', price: '$100', img: '/profile.png' },
        bgColor: 'bg-blue-500',
    },
    {
        id: 2,
        body: { title: 'Card 2', description: 'Description 2', price: '$200', img: '/profile.png' },
        bgColor: 'bg-red-500',
    },
    {
        id: 3,
        body: { title: 'Card 3', description: 'Description 3', price: '$300', img: '/profile.png' },
        bgColor: 'bg-green-500',
    },
    {
        id: 4,
        body: { title: 'Card 4', description: 'Description 4', price: '$400', img: '/profile.png' },
        bgColor: 'bg-yellow-500',
    },
    {
        id: 5,
        body: { title: 'Card 5', description: 'Description 5', price: '$500', img: '/profile.png' },
        bgColor: 'bg-purple-500',
    },
];

const ScrollCards: React.FC = () => {
    // This will track the scroll progress of the entire window
    const { scrollYProgress } = useScroll();

    // For each card, create dynamic scale and opacity transformations based on scroll progress
    const cardTransforms = cardsData.map((_, index) => {
        const start = index * 0.1; // Starting point for card
        const stop = start + 0.04; // Point where it stays fixed for 100px of scroll (0.05 = 100px / viewport height)
        const end = (index + 1) * 0.1; // End point where card transitions out

        // Transform scale and opacity
        const scale = useTransform(scrollYProgress, [start, stop, end], [1, 1, 0.8]);
        const opacity = useTransform(scrollYProgress, [start, stop, end], [1, 1, 0]);

        return { scale, opacity };
    });

    return (
        <div className="relative h-[1000vh] flex flex-col items-center"> {/* Adjust height for scrolling */}
            {/* Render each card from the JSON data dynamically */}
            {cardsData.map((card, index) => (
                <motion.div
                    key={card.id}
                    className={`card ${card.bgColor} h-[100vh] w-full text-center text-white p-10 shadow-xl rounded-lg flex items-center justify-center`}
                    style={{
                        scale: cardTransforms[index].scale,
                        opacity: cardTransforms[index].opacity,
                        position: 'absolute', // Ensure that only the active card is fixed
                        top: `${index * 100}vh` // Position cards on different sections of the viewport
                    }}
                >
                    <div className="flex flex-col items-center">
                        <img src={card.body.img} alt={card.body.title} className="w-32 h-32 mb-4 rounded-full" />
                        <h2 className="text-5xl mb-2">{card.body.title}</h2>
                        <p className="text-xl mb-2">{card.body.description}</p>
                        <p className="text-3xl font-bold">{card.body.price}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ScrollCards;
