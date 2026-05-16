// СТОРІНКА МАГАЗИНУ — показує товари з фільтрацією та пагінацією
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import './ShopPage.css'
import Filters from '../components/Filters/Filters'
import ProductCard from '../components/ProductCard/ProductCard'
import products from '../data/products'

const PRODUCTS_PER_PAGE = 9

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const saleFromUrl = searchParams.get('sale')
  const searchFromUrl = searchParams.get('search') // ✅ НОВИЙ параметр для пошуку

  // СТАН ФІЛЬТРІВ (ВИДИМІСТЬ)
  const [showFilters, setShowFilters] = useState(true)
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  // ТИМЧАСОВІ ФІЛЬТРИ
  const [tempType, setTempType] = useState(null)
  const [tempPrice, setTempPrice] = useState([0, 500])
  const [tempStyle, setTempStyle] = useState(null)

  // АКТИВНІ ФІЛЬТРИ
  const [selectedType, setSelectedType] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [showOnSale, setShowOnSale] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // ✅ НОВИЙ стан для пошуку

  // СОРТУВАННЯ та ПАГІНАЦІЯ
  const [sortBy, setSortBy] = useState(null)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // ✅ Автоматичне застосування фільтра "On Sale"
  useEffect(() => {
    if (saleFromUrl === 'true') {
      setShowOnSale(true)
    }
  }, [saleFromUrl])

  // ✅ НОВИЙ useEffect для пошуку з URL
  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl)
    }
  }, [searchFromUrl])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (categoryFromUrl) {
      setTempStyle(categoryFromUrl)
      setSelectedStyle(categoryFromUrl)
    }
  }, [categoryFromUrl])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  // ЗАСТОСУВАННЯ ФІЛЬТРІВ
  const applyFilters = () => {
    setSelectedType(tempType)
    setPriceRange(tempPrice)
    setSelectedStyle(tempStyle)
    setCurrentPage(1)
    setShowFiltersMobile(false)
  }

  // СКИДАННЯ ФІЛЬТРІВ
  const resetFilters = () => {
    setTempType(null)
    setTempPrice([0, 500])
    setTempStyle(null)
    setSelectedType(null)
    setPriceRange([0, 500])
    setSelectedStyle(null)
    setShowOnSale(false)
    setSearchQuery('') // ✅ Очищаємо пошук
    setSortBy(null)
    setCurrentPage(1)
    setSearchParams({})
  }

  // ✅ ФІЛЬТРАЦІЯ З ПОШУКОМ
  let filteredProducts = products.filter(p => {
    const matchType = selectedType ? p.type === selectedType : true
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    const matchStyle = selectedStyle ? p.category === selectedStyle : true
    const matchSale = showOnSale ? (p.oldPrice && p.oldPrice > p.price) : true
    
    // ✅ НОВИЙ: фільтр по пошуковому запиту
    // Шукає в назві та описі товару (без урахування регістру)
    const matchSearch = searchQuery 
      ? (p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         p.description?.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
    
    return matchType && matchPrice && matchStyle && matchSale && matchSearch
  })

  // СОРТУВАННЯ
  if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  }

  // ПАГІНАЦІЯ
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  const capitalize = (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const getSortLabel = () => {
    if (sortBy === 'rating') return 'Most Popular'
    if (sortBy === 'price-high') return 'Price: High to Low'
    if (sortBy === 'price-low') return 'Price: Low to High'
    return 'Most Popular'
  }

  const getBreadcrumb = () => {
    const parts = []
    if (selectedStyle) parts.push(capitalize(selectedStyle))
    if (selectedType) parts.push(capitalize(selectedType))
    return parts
  }

  const breadcrumbParts = getBreadcrumb()

  return (
    <div className='shop-page'>
      <div className='shop-page__container container'>

        {/* BREADCRUMB */}
        <div className='shop-page__breadcrumb'>
          <Link to="/">Home</Link>
          {breadcrumbParts.map((part, index) => (
            <span key={index}>
              <span> &gt; </span>
              <span>{part}</span>
            </span>
          ))}
        </div>

        <div className='shop-page__layout'>

          {/* МОБІЛЬНА КНОПКА ФІЛЬТРІВ (fixed, тільки mobile) */}
          <button
            className='shop-page__filter-toggle-mobile'
            onClick={() => setShowFiltersMobile(true)}
            aria-label="Open filters"
          >
            <SlidersHorizontal size={20} />
          </button>

          {/* SIDEBAR */}
          <aside className={`shop-page__sidebar ${showFilters ? 'show-desktop' : 'hide-desktop'} ${showFiltersMobile ? 'show-mobile' : ''}`}>

            {/* HEADER — завжди видимий на ПК (навіть коли filters collapsed) */}
            <div className='filters__header-wrapper'>
              <div className='filters__header-top'>
                <h3 className='filters__title'>Filters</h3>
                <div className='filters__header-actions'>
                  {/* ПК: toggle кнопка праворуч від "Filters" */}
                  <button
                    className='filters__toggle-desktop'
                    onClick={() => setShowFilters(!showFilters)}
                    aria-label="Toggle filters"
                  >
                    <SlidersHorizontal size={20} />
                  </button>
                  {/* Мобільна: кнопка закриття */}
                  <button
                    className='filters__close-mobile'
                    onClick={() => setShowFiltersMobile(false)}
                    aria-label="Close filters"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Тіло фільтрів — приховується на ПК через клас */}
            <div className='filters__body'>
              <Filters
                selectedType={tempType}
                onTypeChange={setTempType}
                priceRange={tempPrice}
                onPriceChange={setTempPrice}
                selectedStyle={tempStyle}
                onStyleChange={setTempStyle}
              />

              <div className='filters__buttons'>
                <button className='filters__apply' onClick={applyFilters}>
                  Apply Filter
                </button>
                <button className='filters__reset' onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* OVERLAY мобільний */}
          {showFiltersMobile && (
            <div
              className='shop-page__overlay'
              onClick={() => setShowFiltersMobile(false)}
            />
          )}

          {/* ГОЛОВНИЙ КОНТЕНТ */}
          <main className={`shop-page__main ${!showFilters ? 'full-width' : ''}`}>
            <h1 className='shop-page__title'>
              {searchQuery 
                ? `Search Results for "${searchQuery}"` 
                : (showOnSale 
                  ? 'On Sale' 
                  : (selectedStyle || selectedType
                      ? breadcrumbParts.join(' / ')
                      : 'All Products'))
              }
            </h1>

            {/* ✅ Індикатор активного пошуку */}
            {searchQuery && (
              <div style={{ 
                display: 'inline-block', 
                padding: '7px 14px', 
                background: '#000', 
                color: '#fff', 
                borderRadius: '20px',
                fontSize: '14px',
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                Searching: "{searchQuery}"
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setSearchParams({})
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* Індикатор активного фільтра "On Sale" */}
            {showOnSale && (
              <div style={{ 
                display: 'inline-block', 
                padding: '7px 14px', 
                background: '#FF3333', 
                color: '#fff', 
                borderRadius: '20px',
                fontSize: '14px',
                marginBottom: '16px',
                marginLeft: searchQuery ? '8px' : '0',
                fontWeight: '500'
              }}>
                Sale Items Only
                <button 
                  onClick={() => {
                    setShowOnSale(false)
                    setSearchParams({})
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            <div className='shop-page__toolbar'>
              <p className='shop-page__count'>
                Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} Products
              </p>

              <div className='shop-page__sort'>
                <span className='sort__label'>Sort by:</span>
                <button
                  className='sort__button'
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  {getSortLabel()}
                  <ChevronDown size={16} />
                </button>

                {showSortMenu && (
                  <div className='sort__menu'>
                    {[
                      { key: 'rating', label: 'Most Popular' },
                      { key: 'price-high', label: 'Price: High to Low' },
                      { key: 'price-low', label: 'Price: Low to High' },
                    ].map(opt => (
                      <div
                        key={opt.key}
                        className={`sort__option ${sortBy === opt.key ? 'active' : ''}`}
                        onClick={() => { setSortBy(opt.key); setShowSortMenu(false) }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* СІТКА ТОВАРІВ */}
            <div className='shop-page__grid'>
              {currentProducts.length > 0 ? (
                currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className='shop-page__empty'>
                  {searchQuery 
                    ? `No products found for "${searchQuery}". Try different keywords.`
                    : 'No products found.'}
                </p>
              )}
            </div>

            {/* ПАГІНАЦІЯ */}
            {totalPages > 1 && (
              <div className='shop-page__pagination'>
                <button
                  className='pagination__button'
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                <div className='pagination__numbers'>
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`dots-${index}`} className='pagination__dots'>...</span>
                    ) : (
                      <button
                        key={page}
                        className={`pagination__number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                <button
                  className='pagination__button'
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  )
}

export default ShopPage