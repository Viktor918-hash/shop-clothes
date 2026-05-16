import Hero from "../components/Hero/Hero"
import Brands from "../components/Brands/Brands"
import ProductSection from "../components/ProductSection/ProductSection"
// Пікдлючаємо data з id продуктів
import products from "../data/products"  
import DressStyle from "../components/DressStyle/DressStyle"

// Вибираємо товар по id передаэмо ці данні на два розділи "New Arrivals" та "Top Selling"

const newArrivals = products.filter(p => [1, 6, 11, 12, 3, 4, 10, 21].includes(p.id))
const topSelling = products.filter(p => [2, 8, 5, 7, 13, 14, 22, 15].includes(p.id))

const HomePage = () => {
    return (
        <div className="homePage">
            <Hero />
            <Brands />
            <ProductSection title="New Arrivals" products={newArrivals} />
            <ProductSection title="Top Selling" products={topSelling} />
            <DressStyle />
        </div>
    )
}

export default HomePage