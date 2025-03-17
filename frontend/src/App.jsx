import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Seller from './pages/Seller'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Category from './pages/Category'
import BuyProduct from './pages/BuyProduct'
import Orders from './pages/Orders'

const App = () => {
  return (
    <div className='bg-[#ECDFCC] min-h-screen lg:grid lg:grid-cols-[15%_70%] gap-6'>
      <div className='lg:h-full'>
        <Navbar></Navbar>
      </div>

      <div className='p-3 min-h-screen w-full'>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/sellers" element={<Seller/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/categories" element={<Category/>}/>
          <Route path="/buy" element={<BuyProduct/>}/>
          <Route path="/orders" element={<Orders/>}/>



        </Routes>
      </div>


    </div>
  )
}

export default App