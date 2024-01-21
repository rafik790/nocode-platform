import { Link } from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'

const NavBarLinks = () => {
    return (
        <>
            <HashLink className="text-white hover:text-green-500 font-semibold" smooth to="/#about">
                About
            </HashLink>
            <HashLink className="text-white hover:text-green-500 font-semibold" smooth to="/#services">
                Services
            </HashLink>
            <HashLink className="text-white hover:text-green-500 font-semibold" to="/">
                Portfolio
            </HashLink>
            <HashLink className="text-white hover:text-green-500 font-semibold" to="/contact">
                Contact Us
            </HashLink>
            <Link className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" smooth to="/login">
                Sign In
            </Link>
        </>
    )
}

export default NavBarLinks;