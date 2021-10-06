import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {

    return (
<footer className="footer-area">
    <div className="Container text-center text-white py-4 mt-3 glassFooter">
    <span>React Weather App By </span>
    <Link className="text-danger text-decoration-none fs-5" aria-current="page" to="/">ASIF JAVED</Link>
    <span> &reg; {new Date().getFullYear()}</span>
     
    </div>
</footer>
    )
}

export default Footer
