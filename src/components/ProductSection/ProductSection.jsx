import { useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductSection.css'

// СТВОРЮЮ СЕКЦІЮ  ЯКУ БУДУ ВИКОРИСТОВУВАТИ І ПІДСТАВЛЯТИ ДАННІ ДЛЯ СТОРІНКИ НОВИХ ТОВАРІВ ТА ГОЛОВНИХ ПРОДАЖ
const ProductSection = ({ id, title, products, className }) => {
    const [showAll, setShowAll] = useState(false)
    
    // Якщо showAll = false → перші 4, якщо true → всі
    const visibleProducts = showAll ? products : products.slice(0, 4)
    
    return (
        <section id={id || 'products'} className='product-section'>
            <div className='product-section__container container'>
                <h2 className='product-section__title'>{title}</h2>
                <div className='product-section__grid'>
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className='product-section__btn'>
                    <button className='view-all' onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'Show Less' : 'View All'}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductSection