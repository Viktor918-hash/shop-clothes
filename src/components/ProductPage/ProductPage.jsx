import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Star } from 'lucide-react'
import './ProductPage.css'
import products from "../../data/products";

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === parseInt(id))

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Large')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  // ✅ НОВИЙ СТАН: для анімації кнопки "Add to Cart"
  // Коли isAdding = true, кнопка показує "Adding..." і стає неактивною
  const [isAdding, setIsAdding] = useState(false)

  // Скрол на верх при завантаженні
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Якщо товар не знайдено
  if (!product) {
    return (
      <div className='product-page__not-found'>
        <h1>Product not found</h1>
        <Link to="/shop">Back to Shop</Link>
      </div>
    )
  }

  // ФУНКЦІЇ
  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  // ✅ ПОВНІСТЮ ОНОВЛЕНА ФУНКЦІЯ addToCart з усіма покращеннями
  const addToCart = () => {
    // 🎬 КРОК 1: Включаємо анімацію завантаження
    // Кнопка стає неактивною та змінює текст на "Adding..."
    setIsAdding(true)

    // 🛒 КРОК 2: Формуємо об'єкт товару для кошика
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[selectedColor] || product.image,
      color: product.colors?.[selectedColor],
      size: selectedSize,
      quantity: quantity
    }
    
    // 📦 КРОК 3: Отримуємо поточний кошик з localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // 🔍 КРОК 4: Перевіряємо чи вже є такий товар з такими самими параметрами
    // Порівнюємо id, розмір та колір
    const existingItemIndex = existingCart.findIndex(
      item => item.id === cartItem.id && 
              item.size === cartItem.size && 
              item.color === cartItem.color
    )

    if (existingItemIndex > -1) {
      // ➕ Якщо товар вже є — збільшуємо кількість
      existingCart[existingItemIndex].quantity += quantity
    } else {
      // ✨ Якщо товару немає — додаємо новий
      existingCart.push(cartItem)
    }

    // 💾 КРОК 5: Зберігаємо оновлений кошик
    localStorage.setItem('cart', JSON.stringify(existingCart))

    // 🔔 КРОК 6: Відправляємо custom event для оновлення бейджа кошика
    // Це дозволяє Header компоненту миттєво оновити кількість товарів
    // без перезавантаження сторінки
    window.dispatchEvent(new Event('cartUpdated'))

    // ⏱️ КРОК 7: Затримка для кращого UX (користувач бачить анімацію)
    setTimeout(() => {
      // Вимикаємо анімацію завантаження
      setIsAdding(false)
      
      // ✅ Покращене повідомлення з назвою товару та емодзі
      // alert(`✅ ${product.name} added to cart!`)
      
      // 🔄 Скидаємо кількість назад до 1 після додавання
      // Це зручно, якщо користувач хоче додати ще один товар
      setQuantity(1)
      
      // 🚀 ОПЦІОНАЛЬНО: Автоматичний редирект до кошика
      // Розкоментуйте наступний рядок, якщо хочете перенаправляти користувача
      // navigate('/cart')
    }, 800) // 800ms = 0.8 секунди (час показу анімації)
  }

  // Формуємо breadcrumb
  const capitalize = (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // Рендеримо зірки рейтингу
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={20} fill="#FFC633" color="#FFC633" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="star-half">
          <Star size={20} fill="#FFC633" color="#FFC633" />
        </div>
      )
    }

    const emptyStars = 5 - Math.ceil(product.rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} color="#FFC633" />)
    }

    return stars
  }

  // Розрахунок знижки
  const hasDiscount = product.oldPrice && product.oldPrice > product.price
  const discountPercent = hasDiscount 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div className='product-page'>
      <div className='product-page__container container'>
        
        {/* BREADCRUMB */}
        <div className='product-page__breadcrumb'>
          <Link to="/">Home</Link>
          <span> &gt; </span>
          <Link to="/shop">Shop</Link>
          {product.category && (
            <>
              <span> &gt; </span>
              <Link to={`/shop?category=${product.category}`}>
                {capitalize(product.category)}
              </Link>
            </>
          )}
          {product.type && (
            <>
              <span> &gt; </span>
              <span>{capitalize(product.type)}</span>
            </>
          )}
        </div>

        {/* ОСНОВНИЙ КОНТЕНТ */}
        <div className='product-page__content'>
          
          {/* ГАЛЕРЕЯ ЗОБРАЖЕНЬ */}
          <div className='product-page__gallery'>
            {/* Мініатюри */}
            <div className='gallery__thumbnails'>
              {(product.images || [product.image]).map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Основне зображення */}
            <div className='gallery__main'>
              <img 
                src={(product.images?.[selectedImage]) || product.image} 
                alt={product.name} 
              />
            </div>
          </div>

          {/* ІНФОРМАЦІЯ ПРО ТОВАР */}
          <div className='product-page__info'>
            
            {/* Назва */}
            <h1 className='product-page__title'>{product.name}</h1>

            {/* Рейтинг */}
            <div className='product-page__rating'>
              <div className='rating__stars'>
                {renderStars()}
              </div>
              <span className='rating__value'>{product.rating}/5</span>
            </div>

            {/* Ціна */}
            <div className='product-page__price'>
              <span className='price__current'>${product.price}</span>
              {hasDiscount && (
                <>
                  <span className='price__old'>${product.oldPrice}</span>
                  <span className='price__discount'>-{discountPercent}%</span>
                </>
              )}
            </div>

            {/* Опис */}
            <p className='product-page__description'>
              {product.description || 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.'}
            </p>

            {/* ВИБІР КОЛЬОРУ */}
            {product.colors && product.colors.length > 0 && (
              <div className='product-page__colors'>
                <h3 className='option__title'>Select Colors</h3>
                <div className='colors__list'>
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`color__option ${selectedColor === index ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedColor(index)
                        setSelectedImage(index)
                      }}
                    >
                      {selectedColor === index && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ВИБІР РОЗМІРУ */}
            <div className='product-page__sizes'>
              <h3 className='option__title'>Choose Size</h3>
              <div className='sizes__list'>
                {['Small', 'Medium', 'Large', 'X-Large'].map(size => (
                  <button
                    key={size}
                    className={`size__option ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* КІЛЬКІСТЬ + КНОПКА */}
            <div className='product-page__actions'>
              {/* Кількість */}
              <div className='actions__quantity'>
                <button 
                  className='quantity__button'
                  onClick={decrementQuantity}
                  aria-label="Decrease quantity"
                  disabled={isAdding} // ✅ Вимикаємо кнопки кількості під час додавання
                >
                  <Minus size={20} />
                </button>
                <span className='quantity__value'>{quantity}</span>
                <button 
                  className='quantity__button'
                  onClick={incrementQuantity}
                  aria-label="Increase quantity"
                  disabled={isAdding} // ✅ Вимикаємо кнопки кількості під час додавання
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* ✅ ОНОВЛЕНА Кнопка Add to Cart з анімацією */}
              <button 
                className={`actions__add-to-cart ${isAdding ? 'adding' : ''}`}
                onClick={addToCart}
                disabled={isAdding} // ❌ Вимикаємо кнопку під час додавання (запобігає подвійному кліку)
              >
                {/* 🔄 Динамічний текст: "Adding..." під час завантаження, інакше "Add to Cart" */}
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductPage