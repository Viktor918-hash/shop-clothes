import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// Імпорт іконок з бібліотеки lucide-react
import { ShoppingCart, User, Search, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
    // Стан для збереження пошукового запиту
    const [searchQuery, setSearchQuery] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false) // Стан для меню
    const [isSearchOpen, setIsSearchOpen] = useState(false) // ПОШУК ДЛЯ МОБІЛОК
    const [cartCount, setCartCount] = useState(0) // Кількість товарів у кошику
    const location = useLocation() //ПОВ'ЯЗАНО ІЗ КНОПКОЮ NEW ARRIVALS ЯКА ПРОКРУЧУЄ В НИЗ НА СЕКЦІЮ З ТОВАРАМИ
    const navigate = useNavigate()

    // Підрахунок товарів у кошику
    useEffect(() => {
        // Функція для оновлення кількості товарів
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
            setCartCount(totalItems)
        }

        // Оновлюємо при завантаженні компонента
        updateCartCount()

        // Слухаємо зміни localStorage (для інших вкладок)
        window.addEventListener('storage', updateCartCount)
        
        // Слухаємо custom event (для оновлення в тій же вкладці)
        window.addEventListener('cartUpdated', updateCartCount)

        // Очищаємо слухачі при розмонтуванні
        return () => {
            window.removeEventListener('storage', updateCartCount)
            window.removeEventListener('cartUpdated', updateCartCount)
        }
    }, [])

    // ✅ Ефект для прокрутки після переходу на головну сторінку
    useEffect(() => {
        // Перевіряємо чи є hash в URL після переходу
        if (location.pathname === '/' && location.hash === '#products') {
            // Невелика затримка для того щоб сторінка встигла відрендеритись
            setTimeout(() => {
                const element = document.getElementById('products')
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    })
                }
            }, 100)
        }
    }, [location])

    const handleNewArrivals = (e) => {
        e.preventDefault()
        
        // Якщо ми на головній сторінці - просто прокрутити
        if (location.pathname === '/') {
            const element = document.getElementById('products')
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        } else {
            // Якщо на іншій сторінці - перейти на головну з hash
            navigate('/#products')
        }
        
        // ✅ Закриваємо мобільне меню після переходу
        setIsMenuOpen(false)
    }

    // ✅ НОВА ФУНКЦІЯ: Обробка пошуку
    const handleSearch = (e) => {
        e.preventDefault()
        
        if (searchQuery.trim()) {
            // Переходимо на сторінку Shop з пошуковим запитом
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
            
            // Очищаємо пошук та закриваємо мобільний пошук
            setSearchQuery('')
            setIsSearchOpen(false)
        }
    }

    // ✅ НОВА ФУНКЦІЯ: Обробка Enter в полі пошуку
    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e)
        }
    }

    return (
        <div className='wrapper'>
            <header className='header'>
                <div className='header__container'>
                    {/* ✅ КНОПКА ГАМБУРГЕР-МЕНЮ */}
                    <button 
                        className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <div className='header__logo'>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            <h1 className='logo'>shop.co</h1>
                        </Link>
                    </div>
                    
                    {/* ✅ ДЕСКТОПНА НАВІГАЦІЯ */}
                    <nav className='header__nav'>
                        <ul className='nav__list'>
                            <li className='nav__item'>
                                <Link to="/">Shop <ChevronDown className="nav__icon" /></Link>
                            </li>
                            <li className='nav__item'>
                                <Link to="/shop?sale=true">On Sale</Link>
                            </li>
                            <li className='nav__item'>
                                <a href="#products" onClick={handleNewArrivals}>
                                    New Arrivals
                                </a>
                            </li>
                            <li className='nav__item'>
                                <Link to="/contact">Brands</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* ✅ МОБІЛЬНА НАВІГАЦІЯ (виїжджає збоку) */}
                    <nav className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                        <ul className='mobile-menu__list'>
                            <li className='mobile-menu__item'>
                                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li className='mobile-menu__item'>
                                <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                                    Shop
                                </Link>
                            </li>
                            <li className='mobile-menu__item'>
                                <Link to="/shop?sale=true" onClick={() => setIsMenuOpen(false)}>
                                    On Sale
                                </Link>
                            </li>
                            <li className='mobile-menu__item'>
                                <a href="#products" onClick={handleNewArrivals}>
                                    New Arrivals
                                </a>
                            </li>
                            <li className='mobile-menu__item'>
                                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                                    Brands
                                </Link>
                            </li>
                            <li className='mobile-menu__item'>
                                <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                                    Cart {cartCount > 0 && `(${cartCount})`}
                                </Link>
                            </li>
                            <li className='mobile-menu__item'>
                                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* ✅ Overlay для мобільного меню */}
                    {isMenuOpen && (
                        <div 
                            className='mobile-menu__overlay' 
                            onClick={() => setIsMenuOpen(false)}
                        />
                    )}
                    
                    {/* ✅ ПОШУКОВА ПАНЕЛЬ (з обробкою Enter та кнопкою пошуку) */}
                    <div className={`header__search ${isSearchOpen ? 'active' : ''}`}>
                        <button 
                            className='search__button'
                            onClick={handleSearch}
                            aria-label="Search"
                        >
                            <Search size={20} className='search__icon' />
                        </button>
                        <input 
                            type="text" 
                            placeholder='Search products...' 
                            className='search__input' 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </div>
                    
                    {/* ІКОНКИ КОШИКА та ПРОФІЛЮ */}
                    <div className='icons'> 
                        {/* Кнопка пошуку тільки для мобільних */}
                        <button 
                            className='search__button-mobile'
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>
        
                        {/* Іконка кошика з бейджем */}
                        <Link to="/cart" className='cart__link'>
                            <ShoppingCart size={20} className='cart__icon' />
                            {cartCount > 0 && (
                                <span className='cart-badge'>{cartCount}</span>
                            )}
                        </Link>
                        
                        <Link to="/profile"><User size={20} className='user__icon' /></Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar