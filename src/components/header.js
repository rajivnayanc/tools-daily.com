import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect } from "react";

const initNavigation = () => {

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Function to close all dropdowns and menu
    const closeAll = () => {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.dropdown').forEach(item => {
            item.classList.remove('active');
            const toggle = item.querySelector('.dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    };

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        });
    }

    // Handle dropdown toggles on mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                const isExpanded = parent.classList.contains('active');

                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                        item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current dropdown
                parent.classList.toggle('active');
                this.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
                closeAll();
            }
        }
    });

    // Close menu when clicking any link
    navMenu.addEventListener('click', function (e) {
        const link = e.target.closest('a');
        if (link && !link.classList.contains('dropdown-toggle')) {
            closeAll();
        }
    });

    // Resize handler
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeAll();
        }
    });

    // Handle keyboard navigation for dropdowns
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const parent = this.parentElement;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                if (isExpanded) {
                    parent.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    parent.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');

                    // Focus the first item in the dropdown
                    const firstItem = parent.querySelector('.dropdown-menu a');
                    if (firstItem) {
                        setTimeout(() => {
                            firstItem.focus();
                        }, 100);
                    }
                }
            }
        });
    });
}

const init = () => {
    initNavigation();
}

const Header = () => {
    useEffect(() => {
        init();
    }, []);
    return <div><header>
        <div className="container">
            <div className="logo">
                <h1><Link href="/">Daily<span>Tools</span></Link></h1>
            </div>
            <nav aria-label="Main navigation">
                <div className="menu-toggle" aria-expanded="false" aria-controls="nav-menu">
                    <i><FontAwesomeIcon icon={faBars} /></i>
                    <span className="sr-only">Menu</span>
                </div>
                <ul className="nav-menu" id="nav-menu">
                    <li><Link href="/">Home</Link></li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Date & Time <i><FontAwesomeIcon icon={faCaretDown} /></i></a>
                        <ul className="dropdown-menu" aria-label="Date & Time submenu">
                            <li><Link href="/unix-timestamp">Unix Timestamp</Link></li>
                            <li><Link href="/date-difference">Date Difference</Link></li>
                            <li><Link href="/world-clock">World Clock</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Text Tools<i><FontAwesomeIcon icon={faCaretDown} /></i></a>
                        <ul className="dropdown-menu" aria-label="Text Tools submenu">
                            <li><Link href="/case-converter">Case Converter</Link></li>
                            <li><Link href="/text-diff">Text Diff</Link></li>
                            <li><Link href="/character-count">Character Count</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Converters <i><FontAwesomeIcon icon={faCaretDown} /></i></a>
                        <ul className="dropdown-menu" aria-label="Converters submenu">
                            <li><Link href="/unit-converter">Unit Converter</Link></li>
                            <li><Link href="/base64-encoder">Base64 Encoder/Decoder</Link></li>
                            <li><Link href="/json-formatter">JSON Formatter</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Web Dev <i><FontAwesomeIcon icon={faCaretDown} /></i></a>
                        <ul className="dropdown-menu" aria-label="Web Dev submenu">
                            <li><Link href="/html-encoder">HTML Encoder</Link></li>
                            <li><Link href="/css-minifier">CSS Minifier</Link></li>
                            <li><Link href="/color-picker">Color Picker</Link></li>
                        </ul>
                    </li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
}

export default Header;