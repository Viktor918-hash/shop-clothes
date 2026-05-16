import './Hero.css'

const Hero = () => {
    return(
        <main className="page">
            <section className="hero">
        <div className="hero__container">
            <div className="hero__content">
                <h1 className="hero__title">Find clothes that matches your style</h1>
                <div className="hero__text">
                    <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                </div>
                <div className="hero__buttons">
                    <a href="#" className="hero__button button">Shop Now</a>
                </div>
                <div className="stats">
                    <div className="hero__stat">
                        <h2 className="stat__number">200+</h2>
                        <p className="stat__text">International Brands</p>
                    </div>
                    <div className="hero__stat">
                        <h2 className="stat__number">2,000+</h2>
                        <p className="stat__text">High-Quality Products</p>
                    </div>
                    <div className="hero__stat">
                        <h2 className="stat__number">30,000+</h2>
                        <p className="stat__text">Happy Customers</p>
                    </div>
                </div>
            </div>
            <figure className="hero__picture">
                <img src="/images/pageimg/Vector2.png" alt="" className="hero__vector hero__vector--small"/>
                    <img src="/images/pageimg/Vector.png" alt="" className="hero__vector hero__vector--big" />
                    <img src="/images/pageimg/people.png" alt="people" className="hero__photo" />
                </figure>
        </div>
        </section>
        </main>
    )
}

export default Hero