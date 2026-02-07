import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTiktok, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    return (
        <footer className={`bg-gray-800 text-white p-10 ${className}`}>
            <div className="flex justify-between items-center">
                <img src="../assets/" alt="logo" className="h-10"/>

                <ul className="flex space-x-5">
                    <li>
                        <a href="../pages/Destination.tsx" className="hover:text-cyan-400">
                            Destinations
                        </a>
                    </li>
                    <li>
                        <a href="../pages/Tours.tsx" className="hover:text-cyan-400">
                            Tours
                        </a>
                    </li>
                    <li>
                        <a href="/pages/About.tsx" className="hover:text-cyan-400">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="../pages/Book.tsx" className="hover:text-cyan-400">
                            Book
                        </a>
                    </li>
                </ul>

                <div className="flex space-x-5">
                    <FontAwesomeIcon icon={faFacebook} className="cursor-pointer hover:text-cyan-400" />
                    <FontAwesomeIcon icon={faTiktok} className="cursor-pointer hover:text-cyan-400" />
                    <FontAwesomeIcon icon={faSquareInstagram} className="cursor-pointer hover:text-cyan-400" />
                </div>
            </div>

            <div className="border-t border-gray-700 mt-5 pt-5 flex justify-between">
                <p>&copy; 2025 Vacasky. All rights reserved.</p>
                <p>Privacy Policy | Terms & Condition</p>
            </div>
        </footer>
    );
};

export default Footer;