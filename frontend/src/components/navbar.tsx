import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faOutdent } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
    className?: string;
}


const Navbar: React.FC<NavbarProps> = ({className = ''}) => {
    return (
        <header className={`flex justify-between items-center p-5 ${className}`}>
            <a href="../pages/Home.tsx" className="logo">
                <img src="../assets/logo.png" alt="logo" className="w-1/4 mt-6" />
            </a>
            <nav>
                <ul className="flex space-x-5">
                    <li>
                        <a href="../views/destination.view.php" className="text-white text-xl font-semibold hover:text-cyan-400">
                            Destinations
                        </a>
                    </li>
                    <li>
                        <a href="../views/tours.view.php" className="text-white text-xl font-semibold hover:text-cyan-400">
                            Tours
                        </a>
                    </li>
                    <li>
                        <a
                            href="../views/book.view.php" className="text-white text-xl font-semibold hover:text-cyan-400">
                            Book
                        </a>
                    </li>
                    <li>
                        <a href="about.html" className="text-white text-xl font-semibold hover:text-cyan-400">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="../views/profile.view.php" className="text-white text-xl font-semibold hover:text-cyan-400">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </li>
                </ul>
            </nav>

            <div id="mobile" className="hidden">
                <a href="/pages/signin.html" className="text-white">
                    <FontAwesomeIcon icon={faUser} />
                </a>
                <FontAwesomeIcon icon={faOutdent} id="bar" className="text-white" />
            </div>
        </header>
    );
};

export default Navbar;