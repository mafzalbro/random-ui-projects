import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactAPIs from './components/react-apis/ReactAPIs.tsx'
import Nav from './components/Nav.tsx'
import BoxesName from './components/framer/BoxesName.tsx'
import Init from './components/framer/Init.tsx'
import FramerAPIs from './components/framer/FramerAPIs.tsx'
import ScrollBased3D from './components/ScrollBased3D.tsx'
import ThreeDEffectSwiper from './components/swiper/ThreeDEffectSwiper.tsx'
import ThreeDEffectSwiper2 from './components/swiper/ThreeDEffectSwiper2.tsx'
import ThreeDEffectSwiperFramer from './components/swiper/ThreeDEffectSwiper3.tsx'
import ScrollCards from './components/framer/ScrollCards.tsx'

const router = createBrowserRouter([
  {

    children: [
      {
        path: "/",
        element: <><Nav /><App /></>,
      },
      {
        path: "/react-api",
        element: <><Nav /><ReactAPIs /></>,
        // loader: teamLoader,
      },
      {
        path: "/boxes",
        element: <><Nav /><BoxesName /></>,
        // loader: teamLoader,
      },
      {
        path: "/init",
        element: <><Nav /><Init /></>,
        // loader: teamLoader,
      },
      {
        path: "/framer-api",
        element: <><Nav /><FramerAPIs /></>,
        // loader: teamLoader,
      },
      {
        path: "/3d",
        element: <><Nav /><ScrollBased3D /></>,
        // loader: teamLoader,
      },
      {
        path: "/scroll-cards",
        element: <><Nav /><ScrollCards /></>,
        // loader: teamLoader,
      },
      {
        path: "/3d-swiper",
        element: <><Nav /><ThreeDEffectSwiper /><ThreeDEffectSwiper2 /><ThreeDEffectSwiperFramer /></>,
        // loader: teamLoader,
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
