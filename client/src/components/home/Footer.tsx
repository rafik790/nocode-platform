import { HashLink } from 'react-router-hash-link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-blue-500 p-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Column */}
                <div className="flex-shrink-0">
                    <h3 className="font-bold mb-4 text-white">
                        <span className="text-2xl">LOW</span>
                        <span className="text-3xl"> CODE</span>
                    </h3>

                </div>

                {/* Right Columns */}
                <div className="flex justify-end space-x-8">
                    {/* First right column */}
                    <div className="col-span-6 md:col-span-6 lg:col-span-1 ml-7 mx-auto">
                        <h6 className="text-white text-xl font-bold mb-4">Navigation</h6>

                        <ul className="text-md">
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Home</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Features</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Services</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Testimonials</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">We Care</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Idea Exchange</HashLink>
                            </li>
                        </ul>

                    </div>

                    {/* Second right column */}
                    <div className="col-span-6 md:col-span-6 lg:col-span-1 ml-7 mx-auto">
                        <h6 className="text-white text-xl font-bold mb-4">About</h6>
                        <ul className="text-md">

                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Contact Us</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Privacy Policy</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Terms & Conditions</HashLink>
                            </li>
                            <li className="mb-2">
                                <HashLink to="#" className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">FAQ</HashLink>
                            </li>


                        </ul>
                    </div>
                    <div className="col-span-6 md:col-span-6 lg:col-span-1 ml-7 mx-auto">
                        <h6 className="text-white text-xl font-bold mb-4">Stay Connected</h6>
                        <ul className="flex flex-col">
                            <li className="mb-2 flex items-center">
                                <HashLink to="#">
                                    <FaFacebook className="text-white mr-2" />
                                    <span className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Facebook</span>
                                </HashLink>
                            </li>
                            <li className="mb-2 flex items-center">
                                <HashLink to="#">
                                    <FaTwitter className="text-white mr-2" />
                                    <span className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Twitter</span>
                                </HashLink>
                            </li>
                            <li className="mb-2 flex items-center">
                                <HashLink to="#">
                                    <FaInstagram className="text-white mr-2" />
                                    <span className="text-white hover:text-white-900 hover:green transition duration-250 ease-in-out">Instagram</span>
                                </HashLink>
                            </li>
                        </ul>
                    </div>
                    {/* Third right column */}

                </div>
            </div>
        </footer>
    );
};

export default Footer;