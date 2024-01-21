import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBarLinks from './NavBarLinks';
import { RiMenuLine } from 'react-icons/ri';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <nav className={`fixed top-0 w-full h-24 z-10 transition duration-300 ease-in-out bg-blue-900`}>
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center text-white">
                    <Link to="/">
                        <h1 className="font-extrabold text-2xl hover:text-green-500">
                            <span className="text-yellow-300">L</span>
                            <span className="text-red-500">o</span>
                            <span className="text-blue-300">w</span>
                            <span className="text-purple-500"> C</span>
                            <span className="text-green-300">o</span>
                            <span className="text-yellow-500">d</span>
                            <span className="text-blue-300">e</span>
                        </h1>
                    </Link>
                </div>
                <div className="group flex items-center">
                    {/* Navigation menu button for small and medium screens */}
                    <button
                        className="p-2 rounded-lg lg:hidden text-white"
                        onClick={handleClick}
                    >
                        <RiMenuLine size={24} />
                    </button>

                    {/* Nav links for larger screens */}
                    <div className='hidden space-x-6 lg:inline-block'>
                        <NavBarLinks />
                    </div>

                    {/* Nav menu for small and medium screens */}
                    <div
                        className={`fixed transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "block" : "hidden"
                            } top-14 left-0 w-full bg-blue-900`}
                    >
                        <div className='flex flex-col space-y-4 p-4'>
                            <NavBarLinks />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};
export default NavBar;