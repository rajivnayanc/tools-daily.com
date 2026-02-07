import { faBars, faTimes, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { tools } from "../data/tools";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="logo">
                <Link href="/">Tools<span>Daily</span></Link>
            </div>
            <nav>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>

                    <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li className="dropdown-item" style={{ position: 'relative' }}>
                        <span style={{ cursor: 'pointer', color: 'var(--text-highlight)', fontWeight: '500' }}>
                            More Tools <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '5px', fontSize: '0.8em' }} />
                        </span>
                        <ul className="dropdown-menu">
                            {tools.map((tool, index) => (
                                <li key={index}>
                                    <Link href={`/${tool.url}`} onClick={() => setIsMenuOpen(false)}>
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;

