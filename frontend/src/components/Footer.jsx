import React from 'react'

import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer-content">
        <p>&copy; 2023 ShopNest. All rights reserved.</p>
        <ul className="footer-links">
          <li><Link to="/about">about us</Link></li>
          <li><Link to="/contact">contact</Link></li>
          <li><Link to="/privacy">privacy policy</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer