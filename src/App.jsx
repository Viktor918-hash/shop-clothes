import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer/Footer";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
      <Routes>
        <Route path='/' element={<HomePage/>} />
        {/* ДОДАЄМО ПЕРЕХІД НА СТОРІНКУ МАГАЗИНУ ДЕ МОЖНА БУДЕ ПОКАЗАТИ ВСІ ТОВАРИ І ВІДФІЛЬТРУВАТИ ЇХ ЗА КАТЕГОРІЯМИ */}
        <Route path='/shop' element={<ShopPage/>} />
        <Route path='/product/:id' element={<ProductPage/>} />
        <Route path='/cart' element={<CartPage/>} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;