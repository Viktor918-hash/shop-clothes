import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        
        {/* ✅ NEWSLETTER СЕКЦІЯ */}
        <div className='footer__newsletter'>
          <h2 className='newsletter__title'>
            STAY UP TO DATE ABOUT<br />OUR LATEST OFFERS
          </h2>
          
          <div className='newsletter__form'>
            <div className='newsletter__input-wrapper'>
              <Mail size={20} color="#00000066" />
              <input 
                type="email" 
                placeholder='Enter your email address'
                className='newsletter__input'
              />
            </div>
            <button className='newsletter__button'>
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* ✅ ОСНОВНИЙ КОНТЕНТ ФУТЕРА */}
        <div className='footer__content'>
          
          {/* Лого та опис */}
          <div className='footer__brand'>
            <h3 className='footer__logo'>SHOP.CO</h3>
            <p className='footer__description'>
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            
            {/* Соціальні мережі */}
            <div className='footer__social'>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="14" fill="white"/>
                  <path d="M21.5 9.5C21 9.7 20.5 9.8 20 9.9C20.5 9.6 20.9 9.1 21.1 8.5C20.6 8.8 20 9 19.4 9.1C18.9 8.6 18.2 8.3 17.4 8.3C15.9 8.3 14.6 9.6 14.6 11.2C14.6 11.4 14.6 11.6 14.7 11.8C12.4 11.7 10.3 10.5 8.9 8.8C8.7 9.2 8.5 9.6 8.5 10.1C8.5 11 9 11.8 9.7 12.3C9.2 12.3 8.8 12.2 8.4 12C8.4 12 8.4 12 8.4 12.1C8.4 13.5 9.4 14.7 10.7 14.9C10.5 15 10.2 15 10 15C9.8 15 9.6 15 9.4 15C9.8 16.1 10.9 16.9 12.2 16.9C11.2 17.7 9.9 18.1 8.5 18.1C8.3 18.1 8.1 18.1 7.9 18.1C9.2 18.9 10.7 19.3 12.3 19.3C17.4 19.3 20.2 15 20.2 11.5V11.1C20.7 10.7 21.1 10.2 21.5 9.5Z" fill="black"/>
                </svg>
              </a>
              
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="14" fill="white"/>
                  <path d="M16.5 15.5L16.9 12.8H14.3V11C14.3 10.2 14.7 9.5 15.9 9.5H17V7.1C17 7.1 15.9 6.9 14.8 6.9C12.6 6.9 11.1 8.3 11.1 10.7V12.8H8.7V15.5H11.1V21.9C11.6 22 12.1 22 12.7 22C13.3 22 13.8 22 14.3 21.9V15.5H16.5Z" fill="black"/>
                </svg>
              </a>
              
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="14" fill="white"/>
                  <path d="M14 10.3C12 10.3 10.3 12 10.3 14C10.3 16 12 17.7 14 17.7C16 17.7 17.7 16 17.7 14C17.7 12 16 10.3 14 10.3ZM14 16.5C12.7 16.5 11.5 15.4 11.5 14C11.5 12.7 12.6 11.5 14 11.5C15.3 11.5 16.5 12.6 16.5 14C16.5 15.3 15.3 16.5 14 16.5Z" fill="black"/>
                  <path d="M17.8 11.1C18.3 11.1 18.7 10.7 18.7 10.2C18.7 9.7 18.3 9.3 17.8 9.3C17.3 9.3 16.9 9.7 16.9 10.2C16.9 10.7 17.3 11.1 17.8 11.1Z" fill="black"/>
                  <path d="M20.4 9.3C20.2 8.7 19.9 8.2 19.4 7.7C18.9 7.2 18.4 6.9 17.8 6.7C17.2 6.5 16.5 6.4 15.1 6.4H12.9C11.5 6.4 10.8 6.5 10.2 6.7C9.6 6.9 9.1 7.2 8.6 7.7C8.1 8.2 7.8 8.7 7.6 9.3C7.4 9.9 7.3 10.6 7.3 12V16C7.3 17.4 7.4 18.1 7.6 18.7C7.8 19.3 8.1 19.8 8.6 20.3C9.1 20.8 9.6 21.1 10.2 21.3C10.8 21.5 11.5 21.6 12.9 21.6H15.1C16.5 21.6 17.2 21.5 17.8 21.3C18.4 21.1 18.9 20.8 19.4 20.3C19.9 19.8 20.2 19.3 20.4 18.7C20.6 18.1 20.7 17.4 20.7 16V12C20.7 10.6 20.6 9.9 20.4 9.3ZM19.5 16C19.5 17.3 19.4 17.9 19.3 18.3C19.2 18.6 19 18.9 18.7 19.2C18.4 19.5 18.1 19.7 17.8 19.8C17.4 19.9 16.8 20 15.5 20H12.5C11.2 20 10.6 19.9 10.2 19.8C9.9 19.7 9.6 19.5 9.3 19.2C9 18.9 8.8 18.6 8.7 18.3C8.6 17.9 8.5 17.3 8.5 16V12C8.5 10.7 8.6 10.1 8.7 9.7C8.8 9.4 9 9.1 9.3 8.8C9.6 8.5 9.9 8.3 10.2 8.2C10.6 8.1 11.2 8 12.5 8H15.5C16.8 8 17.4 8.1 17.8 8.2C18.1 8.3 18.4 8.5 18.7 8.8C19 9.1 19.2 9.4 19.3 9.7C19.4 10.1 19.5 10.7 19.5 12V16Z" fill="black"/>
                </svg>
              </a>
              
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="14" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14 6C9.6 6 6 9.6 6 14C6 17.4 8.2 20.3 11.2 21.3C11.6 21.4 11.8 21.1 11.8 20.9V19.4C9.7 19.9 9.2 18.4 9.2 18.4C8.8 17.5 8.3 17.2 8.3 17.2C7.5 16.7 8.4 16.7 8.4 16.7C9.3 16.8 9.7 17.6 9.7 17.6C10.5 18.9 11.7 18.5 12.1 18.3C12.2 17.8 12.4 17.4 12.6 17.2C11 17 9.3 16.3 9.3 13.5C9.3 12.7 9.6 12 10.1 11.5C10 11.3 9.7 10.5 10.2 9.4C10.2 9.4 10.9 9.2 11.8 9.8C12.5 9.6 13.3 9.5 14 9.5C14.7 9.5 15.5 9.6 16.2 9.8C17.1 9.1 17.8 9.4 17.8 9.4C18.3 10.5 18 11.3 17.9 11.5C18.4 12 18.7 12.7 18.7 13.5C18.7 16.3 17 17 15.4 17.2C15.7 17.5 15.9 18 15.9 18.7V20.9C15.9 21.1 16.1 21.4 16.6 21.3C19.6 20.3 21.8 17.4 21.8 14C22 9.6 18.4 6 14 6Z" fill="black"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Колонки з посиланнями */}
          <div className='footer__links'>
            
            {/* COMPANY */}
            <div className='footer__column'>
              <h4 className='footer__column-title'>COMPANY</h4>
              <ul className='footer__list'>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/works">Works</Link></li>
                <li><Link to="/career">Career</Link></li>
              </ul>
            </div>

            {/* HELP */}
            <div className='footer__column'>
              <h4 className='footer__column-title'>HELP</h4>
              <ul className='footer__list'>
                <li><Link to="/support">Customer Support</Link></li>
                <li><Link to="/delivery">Delivery Details</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* FAQ */}
            <div className='footer__column'>
              <h4 className='footer__column-title'>FAQ</h4>
              <ul className='footer__list'>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/manage-deliveries">Manage Deliveries</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/payments">Payments</Link></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div className='footer__column'>
              <h4 className='footer__column-title'>RESOURCES</h4>
              <ul className='footer__list'>
                <li><Link to="/ebooks">Free eBooks</Link></li>
                <li><Link to="/tutorial">Development Tutorial</Link></li>
                <li><Link to="/blog">How to - Blog</Link></li>
                <li><Link to="/playlist">Youtube Playlist</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* ✅ НИЖНЯ ЧАСТИНА (копірайт та платіжні системи) */}
        <div className='footer__bottom'>
          <p className='footer__copyright'>
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          
          <div className='footer__payment'>
            {/* VISA */}
            <div className='payment__badge'>
              <svg width="47" height="30" viewBox="0 0 47 30" fill="none">
                <rect x="0.5" y="0.5" width="46" height="29" rx="5.5" fill="white" stroke="#D6DCE5"/>
                <path d="M23.3146 19.5H21.0537L22.5391 10.5H24.8L23.3146 19.5Z" fill="#00579F"/>
                <path d="M31.8071 10.7347C31.3476 10.5449 30.5884 10.3359 29.6719 10.3359C27.3686 10.3359 25.7266 11.5457 25.7152 13.2969C25.7005 14.6016 26.9117 15.3222 27.8282 15.7543C28.7627 16.1958 29.0879 16.4738 29.0864 16.8606C29.0812 17.4473 28.3481 17.7155 27.6653 17.7155C26.7007 17.7155 26.1885 17.5868 25.4036 17.2664L25.1015 17.1282L24.7771 19.1578C25.3347 19.4095 26.3623 19.6318 27.4297 19.6402C29.8871 19.6402 31.498 18.4472 31.5142 16.5655C31.5223 15.5062 30.8663 14.6929 29.4646 14.0396C28.6164 13.6243 28.1158 13.3547 28.1195 12.9417C28.1195 12.5755 28.5443 12.1836 29.4704 12.1836C30.2351 12.1719 30.7876 12.36 31.2039 12.5481L31.4143 12.6491L31.8071 10.7347Z" fill="#00579F"/>
                <path d="M35.0801 10.5H33.3223C32.7485 10.5 32.3123 10.6641 32.0527 11.2344L28.5 19.5H30.9556L31.4209 18.2227H34.4258L34.7251 19.5H36.9062L35.0801 10.5ZM32.0645 16.4414C32.2002 16.0752 32.8066 14.5371 32.8066 14.5371C32.7956 14.5566 33.0083 13.9902 33.1367 13.6406L33.3223 14.4902C33.3223 14.4902 33.8633 16.9102 33.9712 17.4121L32.0645 16.4414Z" fill="#00579F"/>
                <path d="M18.9375 10.5L16.7056 16.5L16.4722 15.3516C16.0425 13.8945 14.5308 12.3047 12.8438 11.5195L14.8594 19.4922H17.3359L21.4219 10.5H18.9375Z" fill="#00579F"/>
                <path d="M14.0625 10.5H10.0469L10 10.7344C12.9687 11.4375 14.9844 13.2891 15.6562 15.3516L14.9531 11.25C14.8438 10.7109 14.4375 10.5234 14.0625 10.5Z" fill="#FAA61A"/>
              </svg>
            </div>
            
            {/* Mastercard */}
            <div className='payment__badge'>
              <svg width="47" height="30" viewBox="0 0 47 30" fill="none">
                <rect x="0.5" y="0.5" width="46" height="29" rx="5.5" fill="white" stroke="#D6DCE5"/>
                <circle cx="19" cy="15" r="7" fill="#EB001B"/>
                <circle cx="28" cy="15" r="7" fill="#F79E1B"/>
                <path d="M23.5 9C24.6046 9.89777 25.3333 11.197 25.3333 12.6667C25.3333 14.1363 24.6046 15.4356 23.5 16.3333C22.3954 15.4356 21.6667 14.1363 21.6667 12.6667C21.6667 11.197 22.3954 9.89777 23.5 9Z" fill="#FF5F00"/>
              </svg>
            </div>
            
            {/* PayPal */}
            <div className='payment__badge'>
              <svg width="47" height="30" viewBox="0 0 47 30" fill="none">
                <rect x="0.5" y="0.5" width="46" height="29" rx="5.5" fill="white" stroke="#D6DCE5"/>
                <path d="M20.5 9H16L13 21H16L17 16H19.5C22.5 16 24.5 14 24.5 11.5C24.5 9.5 23 9 20.5 9ZM19.5 13.5H17.5L18.2 10H19.8C20.8 10 21.5 10.3 21.5 11.5C21.5 12.7 20.5 13.5 19.5 13.5Z" fill="#003087"/>
                <path d="M27.5 9H24L21 21H24L25 16H27.5C30.5 16 32.5 14 32.5 11.5C32.5 9.5 31 9 27.5 9ZM26.5 13.5H24.5L25.2 10H26.8C27.8 10 28.5 10.3 28.5 11.5C28.5 12.7 27.5 13.5 26.5 13.5Z" fill="#009CDE"/>
              </svg>
            </div>
            
            {/* Apple Pay */}
            <div className='payment__badge'>
              <svg width="47" height="30" viewBox="0 0 47 30" fill="none">
                <rect x="0.5" y="0.5" width="46" height="29" rx="5.5" fill="white" stroke="#D6DCE5"/>
                <path d="M18.5 10.5C18.1 10.9 17.5 11.2 16.9 11.1C16.8 10.5 17.1 9.9 17.5 9.5C17.9 9.1 18.5 8.8 19 8.8C19.1 9.4 18.9 10 18.5 10.5ZM19 11.2C18.2 11.2 17.5 11.6 17.1 11.6C16.7 11.6 16.1 11.2 15.4 11.2C14.5 11.2 13.7 11.7 13.2 12.4C12.2 13.8 12.9 15.9 13.8 17.1C14.3 17.7 14.9 18.4 15.6 18.4C16.2 18.4 16.5 18 17.3 18C18.1 18 18.3 18.4 19 18.4C19.7 18.4 20.2 17.8 20.7 17.2C21.2 16.5 21.4 15.9 21.4 15.9C21.4 15.9 20 15.4 20 13.9C20 12.6 21 12 21.1 11.9C20.5 11.1 19.6 11.2 19 11.2Z" fill="black"/>
                <path d="M25.5 11.3V18.3H26.5V15.7H28C29.4 15.7 30.4 14.7 30.4 13.5C30.4 12.3 29.5 11.3 28.1 11.3H25.5ZM26.5 12.1H27.8C28.8 12.1 29.4 12.7 29.4 13.5C29.4 14.3 28.8 14.9 27.8 14.9H26.5V12.1Z" fill="black"/>
                <path d="M31 16.5C31 17.6 31.9 18.4 33.3 18.4C34.2 18.4 35 18 35.3 17.4H35.3V18.3H36.2V14.3C36.2 13.1 35.3 12.4 33.9 12.4C32.6 12.4 31.6 13.1 31.5 14.1H32.4C32.5 13.6 33 13.2 33.9 13.2C34.9 13.2 35.3 13.7 35.3 14.4V14.9L33.5 15C32 15.1 31.1 15.7 31 16.5ZM32 16.5C32 15.9 32.5 15.5 33.4 15.4L35.3 15.3V15.8C35.3 16.7 34.5 17.3 33.5 17.3C32.5 17.3 32 16.9 32 16.5Z" fill="black"/>
                <path d="M37.5 20C38.5 20 39 19.6 39.4 18.5L41.5 12.5H40.5L39.1 17.3H39.1L37.7 12.5H36.6L38.7 18.4L38.6 18.7C38.4 19.3 38.1 19.5 37.5 19.5C37.4 19.5 37.2 19.5 37.1 19.5V20.3C37.2 20.3 37.4 20.3 37.5 20Z" fill="black"/>
              </svg>
            </div>
            
            {/* Google Pay */}
            <div className='payment__badge'>
              <svg width="47" height="30" viewBox="0 0 47 30" fill="none">
                <rect x="0.5" y="0.5" width="46" height="29" rx="5.5" fill="white" stroke="#D6DCE5"/>
                <path d="M22.5 14.75V17.5H23.9C23.7 18.3 23 18.9 22.5 18.9C21.7 18.9 21 18.2 21 17.4C21 16.6 21.7 15.9 22.5 15.9C22.9 15.9 23.2 16.1 23.4 16.3L25.3 14.4C24.6 13.7 23.6 13.3 22.5 13.3C20.3 13.3 18.5 15.1 18.5 17.4C18.5 19.7 20.3 21.5 22.5 21.5C24.6 21.5 26.3 19.9 26.3 17.4C26.3 17.2 26.3 16.9 26.2 16.7H22.5V14.75Z" fill="#4285F4"/>
                <path d="M30.5 14.75C29.4 14.75 28.5 15.6 28.5 16.75C28.5 17.9 29.4 18.75 30.5 18.75C31.6 18.75 32.5 17.9 32.5 16.75C32.5 15.6 31.6 14.75 30.5 14.75ZM30.5 17.5C30.2 17.5 29.8 17.2 29.8 16.75C29.8 16.3 30.2 16 30.5 16C30.8 16 31.2 16.3 31.2 16.75C31.2 17.2 30.8 17.5 30.5 17.5Z" fill="#EA4335"/>
                <path d="M36.5 14.75C35.4 14.75 34.5 15.6 34.5 16.75C34.5 17.9 35.4 18.75 36.5 18.75C37.6 18.75 38.5 17.9 38.5 16.75C38.5 15.6 37.6 14.75 36.5 14.75ZM36.5 17.5C36.2 17.5 35.8 17.2 35.8 16.75C35.8 16.3 36.2 16 36.5 16C36.8 16 37.2 16.3 37.2 16.75C37.2 17.2 36.8 17.5 36.5 17.5Z" fill="#FBBC05"/>
                <path d="M28 19.5V13H27V15.2C26.7 14.9 26.2 14.7 25.7 14.7C24.6 14.7 23.7 15.6 23.7 16.75C23.7 17.9 24.6 18.8 25.7 18.8C26.2 18.8 26.7 18.6 27 18.3V19.5H28ZM27 16.75C27 17.2 26.6 17.5 26.2 17.5C25.8 17.5 25.4 17.2 25.4 16.75C25.4 16.3 25.8 16 26.2 16C26.6 16 27 16.3 27 16.75Z" fill="#34A853"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer