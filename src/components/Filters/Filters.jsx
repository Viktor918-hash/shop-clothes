import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import './Filters.css'

const types = ['tshirt', 'shorts', 'shirt', 'jacket', 'pants', 'jeans', 'polo']
const styles = ['casual', 'formal', 'party', 'gym']

const Filters = ({ selectedType, onTypeChange, priceRange, onPriceChange, selectedStyle, onStyleChange }) => {
  // Dress Style — за замовчуванням ЗАКРИТИЙ
  const [isDressStyleOpen, setIsDressStyleOpen] = useState(false)

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className='filters'>

      {/* ── ТИП ТОВАРУ ── */}
      <div className='filters__section'>
        <h4 className='filters__section-title'>Type</h4>
        <ul className='filters__list'>
          {types.map((type) => (
            <li
              key={type}
              className={`filters__item ${selectedType === type ? 'active' : ''}`}
              onClick={() => onTypeChange(selectedType === type ? null : type)}
            >
              <span>{capitalize(type)}</span>
              <ChevronRight size={16} className='filters__arrow' />
            </li>
          ))}
        </ul>
      </div>

      {/* ── ЦІНА ── */}
      <div className='filters__section'>
        <h4 className='filters__section-title'>Price</h4>
        <div className='filters__price-range'>
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange?.[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className='filters__range'
          />
          <div className='filters__price-labels'>
            <span>${priceRange?.[0]}</span>
            <span>${priceRange?.[1]}</span>
          </div>
        </div>
      </div>

      {/* ── DRESS STYLE (розкривний) ── */}
      <div className='filters__section'>
        {/* Клікабельний заголовок з chevron */}
        <div
          className='filters__section-header'
          onClick={() => setIsDressStyleOpen(!isDressStyleOpen)}
        >
          <h4 className='filters__section-title'>Dress Style</h4>
          <ChevronDown
            size={16}
            className={`filters__chevron ${isDressStyleOpen ? 'open' : ''}`}
          />
        </div>

        {/* Список категорій — видимий тільки коли open */}
        {isDressStyleOpen && (
          <ul className='filters__list'>
            {styles.map((style) => (
              <li
                key={style}
                className={`filters__item ${selectedStyle === style ? 'active' : ''}`}
                onClick={() => onStyleChange(selectedStyle === style ? null : style)}
              >
                <span>{capitalize(style)}</span>
                <ChevronRight size={16} className='filters__arrow' />
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default Filters
