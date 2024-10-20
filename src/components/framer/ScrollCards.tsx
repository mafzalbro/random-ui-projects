import React from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

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
    {
        id: 6,
        body: { title: 'Card 6', description: 'Description 6', price: '$600', img: '/profile.png' },
        bgColor: 'bg-pink-500',
    },
    {
        id: 7,
        body: { title: 'Card 7', description: 'Description 7', price: '$700', img: '/profile.png' },
        bgColor: 'bg-indigo-500',
    },
    {
        id: 8,
        body: { title: 'Card 8', description: 'Description 8', price: '$800', img: '/profile.png' },
        bgColor: 'bg-teal-500',
    },
    {
        id: 9,
        body: { title: 'Card 9', description: 'Description 9', price: '$900', img: '/profile.png' },
        bgColor: 'bg-orange-500',
    },
    {
        id: 10,
        body: { title: 'Card 10', description: 'Description 10', price: '$1000', img: '/profile.png' },
        bgColor: 'bg-gray-500',
    },
];

// Custom hook to create scale and opacity transforms
const useCardTransforms = (index: number, scrollYProgress: MotionValue<number>) => {
    const start = index * 0.1; // Starting point for card
    const stop = start + 0.04; // Point where it stays fixed
    const end = (index + 1) * 0.1; // End point where card transitions out

    const scale = useTransform(scrollYProgress, [start, stop, end], [1, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [start, stop, end], [1, 1, 0]);

    return { scale, opacity };
};

const ScrollCards: React.FC = () => {
    const { scrollYProgress } = useScroll(); // Track scroll progress of the page

    const Transforms = ({ card, index }: {
        card: {
            id: number;
            body: {
                title: string;
                description: string;
                price: string;
                img: string;
            };
            bgColor: string;
        }, index: number
    }) => {
        const { scale, opacity } = useCardTransforms(index, scrollYProgress);
        return (
            <motion.div
                key={card.id}
                className={`card ${card.bgColor} h-[100vh] w-full text-center text-white p-10 shadow-xl rounded-lg flex items-center justify-center`}
                style={{
                    scale,
                    opacity,
                    position: 'absolute', // Ensure that only the active card is fixed
                    top: `${index * 100}vh`, // Position cards on different sections of the viewport
                }}
            >
                <div className="flex flex-col items-center">
                    <img src={card.body.img} alt={card.body.title} className="w-32 h-32 mb-4 rounded-full" />
                    <h2 className="text-5xl mb-2">{card.body.title}</h2>
                    <p className="text-xl mb-2">{card.body.description}</p>
                    <p className="text-3xl font-bold">{card.body.price}</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={`relative h-[${cardsData.length}00vh] flex flex-col items-center`}>
            {cardsData.map((card, index) => {
                return <>
                // Use the custom hook to get transforms for each card
                    <Transforms card={card} index={index} />
                </>
            })}
        </div>
    );
};

export default ScrollCards;
