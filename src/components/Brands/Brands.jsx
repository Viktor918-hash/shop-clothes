import './Brands.css'

const Brands = () => {
    return(
        <section className="brands" >
            <div className='brands__container'>
                <div className='brands__content'>
                    <div className='brangs__pages' > 
                    <img src="/images/brands/versace.png" alt="versce" className='brands__page' />
                    <img src="/images/brands/zara.png" alt="zara" className='brands__page' />
                    <img src="/images/brands/gucci.png" alt="gucci"  className='brands__page'/>
                    <img src="/images/brands/prada.png" alt="prada" className='brands__page' />
                    <img src="/images/brands/calvin.png" alt="calvin" className='brands__page' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Brands;