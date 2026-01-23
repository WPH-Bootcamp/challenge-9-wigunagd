import { Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/LoginPage'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Chekout'
import Orders from './pages/orders/Orders'
import Detail from './pages/detail/Detail'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/detail' element={<Detail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/orders' element={<Orders />} />
    </Routes>
  )
}

export default App
