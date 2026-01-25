import { Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/LoginPage'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Chekout'
import Detail from './pages/detail/Detail'
import Profile from './pages/profile/Profile'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/detail' element={<Detail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default App
