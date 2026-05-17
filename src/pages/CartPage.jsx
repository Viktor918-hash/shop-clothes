import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, Tag } from 'lucide-react'
import './CartPage.css'

const CartPage = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)

  // Завантажуємо кошик з localStorage
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(savedCart)
    }
    loadCart()

    // Слухаємо зміни в localStorage (якщо відкрито кілька вкладок)
    window.addEventListener('storage', loadCart)
    return () => window.removeEventListener('storage', loadCart)
  }, []) 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  

  // ✅ НОВА ФУНКЦІЯ: Оновлення кошика + відправка події
  const updateCartAndNotify = (updatedCart) => {
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // 🔔 Відправляємо custom event для оновлення бейджа в Navbar
    window.dispatchEvent(new Event('cartUpdated'))
  }

  // Функція оновлення кількості
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return
    
    const updatedCart = [...cartItems]
    updatedCart[index].quantity = newQuantity
    
    // ✅ Використовуємо нову функцію
    updateCartAndNotify(updatedCart)
  }

  // Функція видалення товару
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index)
    
    // ✅ Використовуємо нову функцію
    updateCartAndNotify(updatedCart)
  }

  // Застосування промокоду
  const applyPromoCode = () => {
    // Приклад промокодів
    const promoCodes = {
      'SAVE20': 20,
      'DISCOUNT10': 10,
      'SUMMER15': 15
    }

    const discount = promoCodes[promoCode.toUpperCase()]
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount })
    } else {
      alert('Invalid promo code')
    }
  }

  // Розрахунки
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0
  const deliveryFee = subtotal > 0 ? 15 : 0
  const total = subtotal - discountAmount + deliveryFee

  // Якщо кошик порожній
  if (cartItems.length === 0) {
    return (
      <div className='cart-page'>
        <div className='cart-page__container container'>
          <div className='cart-page__breadcrumb'>
            <Link to="/">Home</Link>
            <span> &gt; </span>
            <span>Cart</span>
          </div>
          
          <div className='cart-page__empty'>
            <h1>YOUR CART</h1>
            <p>Your cart is empty</p>
            <Link to="/shop" className='btn-shop'>Go to Shop</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='cart-page'>
      <div className='cart-page__container container'>
        
        {/* BREADCRUMB */}
        <div className='cart-page__breadcrumb'>
          <Link to="/">Home</Link>
          <span> &gt; </span>
          <span>Cart</span>
        </div>

        <h1 className='cart-page__title'>YOUR CART</h1>

        <div className='cart-page__content'>
          
          {/* СПИСОК ТОВАРІВ */}
          <div className='cart-page__items'>
            {cartItems.map((item, index) => (
              <div key={index} className='cart-item'>
                
                {/* Зображення */}
                <div className='cart-item__image'>
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Інформація */}
                <div className='cart-item__info'>
                  <h3 className='cart-item__name'>{item.name}</h3>
                  <p className='cart-item__detail'>Size: <span>{item.size}</span></p>
                  {item.color && (
                    <p className='cart-item__detail'>
                      Color: <span style={{ 
                        display: 'inline-block',
                        width: '16px',
                        height: '16px',
                        backgroundColor: item.color,
                        borderRadius: '50%',
                        verticalAlign: 'middle',
                        marginLeft: '4px',
                        border: '1px solid #0000001a'
                      }}></span>
                    </p>
                  )}
                  <p className='cart-item__price'>${item.price}</p>
                </div>

                {/* Кнопка видалення */}
                <button 
                  className='cart-item__remove'
                  onClick={() => removeItem(index)}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} color="#FF3333" />
                </button>

                {/* Кількість */}
                <div className='cart-item__quantity'>
                  <button 
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className='cart-page__summary'>
            <h2 className='summary__title'>Order Summary</h2>

            <div className='summary__row'>
              <span>Subtotal</span>
              <span className='summary__value'>${subtotal}</span>
            </div>

            {appliedPromo && (
              <div className='summary__row summary__row--discount'>
                <span>Discount (-{appliedPromo.discount}%)</span>
                <span className='summary__value summary__value--discount'>
                  -${discountAmount.toFixed(0)}
                </span>
              </div>
            )}

            <div className='summary__row'>
              <span>Delivery Fee</span>
              <span className='summary__value'>${deliveryFee}</span>
            </div>

            <div className='summary__divider'></div>

            <div className='summary__row summary__row--total'>
              <span>Total</span>
              <span className='summary__value'>${total.toFixed(0)}</span>
            </div>

            {/* Промокод */}
            <div className='summary__promo'>
              <div className='promo__input-wrapper'>
                <Tag size={20} color="#00000066" />
                <input 
                  type="text" 
                  placeholder='Add promo code'
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                />
              </div>
              <button 
                className='promo__apply'
                onClick={applyPromoCode}
              >
                Apply
              </button>
            </div>

            {/* Кнопка Checkout */}
            <button 
              className='summary__checkout'
              onClick={() => navigate('/checkout')}
            >
              Go to Checkout →
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default CartPage