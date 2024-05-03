import {  createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import HeroPage from './pages/hero'
import Home from './pages/home'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path='/'element={<Home/>}/>
        <Route path='/hero'element={<HeroPage/>}/>

      </>
  )
  )
  return (
  <>
    <RouterProvider router={router}/>
    
    </>
  )
}

export default App
