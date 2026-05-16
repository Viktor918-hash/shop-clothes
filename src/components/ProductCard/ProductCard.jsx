import { Link } from 'react-router-dom'
import './ProductCard.css'
import StarRating from '../StarRating'


const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className='product-card'>
      <div className='product-card__container'>
        <div className='product-card__image'>
          <img src={product.image} alt={product.name} />
        </div>
        <div className='product-card__info'>
          <h3 className='product-card__text'>{product.name}</h3>
          {/* СТВОРЮЄМО РЕЙТИНГ ЗА ДОПОМОГОЮ ЗІРОЧОК  */}
          <StarRating rating={product.rating} className="product-card__rating" /> {/* КОД ІЗ ЗІРКОЮ */}
          
          <div className='product-card__price-wrapper'>
            <p className='product-card__price'>${product.price}</p>
            {product.oldPrice && (
              <>
                <p className='product-card__old-price'>${product.oldPrice}</p>
                <span className='product-card__discount'>
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard