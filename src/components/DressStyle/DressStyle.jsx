import { Link } from 'react-router-dom'
import './DressStyle.css'
const DressStyle = () => {
    return(
        <section className='dress-style'>
            <div className='dress-style__container'>
                <div className='color'>
                <h2 className='dress-style__title'>Browse By Dress Style</h2>
                <div className='dress-style__grid'>
                    <Link to="/shop?category=casual" className='dress-style__item'>
                        <img src="/images/category/casualstyle.png" alt="casual" />
                        <img src="/images/category/mobilecasual.png" alt="casual" className='mobile' />
                        <span></span>
                    </Link>
                    <Link to="/shop?category=formal" className='dress-style__item'>
                        <img src="/images/category/formalstyle.png" alt="formal" />
                        <img src="/images/category/mobileformal.png" alt="casual" className='mobile' />
                        <span></span>
                    </Link>
                    <Link to="/shop?category=party" className='dress-style__item'>
                        <img src="/images/category/partystyle.png" alt="party" />
                        <img src="/images/category/mobileparty.png" alt="casual" className='mobile' />
                        <span></span>
                    </Link>
                    <Link to="/shop?category=gym" className='dress-style__item'>
                        <img src="/images/category/gymstyle.png" alt="gym" />
                        <img src="/images/category/mobilegym.png" alt="casual" className='mobile' />
                        <span></span>
                    </Link>
                </div>
                </div>
            </div>
        </section>
    )
}

export default DressStyle;