import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faCode, faExchangeAlt, faFont, faSearch } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Link from "next/link";

const initSearchFunctionality = () => {
  const searchInput = document.getElementById('search-tools');
  const searchButton = document.getElementById('search-button');

  if (!searchInput || !searchButton) return;

  // Tool data - this would ideally come from a database or JSON file
  const tools = [
    { name: 'Unix Timestamp Converter', url: 'unix-timestamp', category: 'Date & Time' },
    { name: 'Date Difference Calculator', url: 'date-difference', category: 'Date & Time' },
    { name: 'World Clock', url: 'world-clock', category: 'Date & Time' },
    { name: 'Case Converter', url: 'case-converter', category: 'Text Tools' },
    { name: 'Text Diff Checker', url: 'text-diff', category: 'Text Tools' },
    { name: 'Character Count', url: 'character-count', category: 'Text Tools' },
    { name: 'Unit Converter', url: 'unit-converter', category: 'Converters' },
    { name: 'Base64 Encoder/Decoder', url: 'base64-encoder', category: 'Encoders & Decoders' },
    { name: 'JSON Formatter', url: 'json-formatter', category: 'Developer Tools' },
    { name: 'HTML Encoder/Decoder', url: 'html-encoder', category: 'Encoders & Decoders' },
    { name: 'CSS Minifier', url: 'css-minifier', category: 'Developer Tools' },
    { name: 'Color Picker', url: 'color-picker', category: 'Design Tools' }
  ];

  // Handle search button click
  searchButton.addEventListener('click', function (e) {
    performSearch();
  });

  // Handle Enter key press in search input
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Perform the search and navigate to the tool if found
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) return; // Require at least 2 characters

    // Find matching tools
    const matches = tools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );

    if (matches.length === 1) {
      // If exactly one match, go directly to that tool
      window.location.href = matches[0].url;
    } else if (matches.length > 1) {
      // If multiple matches, go to the first one
      // In a real implementation, you might show a dropdown of results instead
      window.location.href = matches[0].url;
    } else {
      // No matches found
      showToast('No matching tools found. Try a different search term.', 'warning');
    }
  }
}

const init = () => {
  initSearchFunctionality();
}

export default function Home() {
  useEffect(() => {
    init();
  });
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DailyTools - Free Online Utility Tools</title>
        <meta name="description" content="Free online utility tools for everyday tasks. Convert timestamps, format code, calculate dates, and more. No ads, no signup required." />
        <meta name="keywords" content="online tools, web tools, utility tools, free tools, unix timestamp, date calculator, text tools" />
        <meta name="author" content="DailyTools" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="DailyTools - Free Online Utility Tools" />
        <meta property="og:description" content="Free online utility tools for everyday tasks. Convert timestamps, format code, calculate dates, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tools-daily.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DailyTools - Free Online Utility Tools" />
        <meta name="twitter:description" content="Free online utility tools for everyday tasks. Convert timestamps, format code, calculate dates, and more." />
        <link rel="canonical" href="https://tools-daily.com/" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      </Head>
      <main>
        <div className="container">
          {/* <!-- Ad Space: Top Banner -->
          <div className="ad-container ad-horizontal">
            <div className="ad-placeholder">
              <p>Advertisement</p>
              <p className="ad-size">728x90</p>
            </div>
          </div> */}

          <section className="hero">
            <div className="hero-content">
              <h2>Free Online Tools for Everyday Tasks</h2>
              <p>Simple, fast, and reliable utilities to help you with your daily work. No ads, no signup required.</p>
              <div className="search-container">
                <div className="form">
                  <input id="search-tools" type="text" name="q" placeholder="Search for a tool..." aria-label="Search for a tool" />
                  <button id="search-button" aria-label="Search"><i><FontAwesomeIcon icon={faSearch} /></i></button>
                </div>
              </div>
            </div>
          </section>

          <section className="tool-categories">
            <h2>Popular Tool Categories</h2>
            <div className="category-grid">
              <div className="category-card">
                <div className="category-icon">
                  <i><FontAwesomeIcon icon={faClock} /></i>
                </div>
                <h3>Date & Time</h3>
                <ul>
                  <li><Link href="/unix-timestamp">Unix Timestamp Converter</Link></li>
                  <li><Link href="/date-difference">Date Difference Calculator</Link></li>
                  <li><Link href="/world-clock">World Clock</Link></li>
                  <li><Link href="/timezone-converter">Time Zone Converter</Link></li>
                </ul>
                <Link href="/date-time-tools" className="view-all">View All <i><FontAwesomeIcon icon={faArrowRight} /></i></Link>
              </div>

              <div className="category-card">
                <div className="category-icon">
                  <i><FontAwesomeIcon icon={faFont} /></i>
                </div>
                <h3>Text Tools</h3>
                <ul>
                  <li><Link href="/case-converter">Case Converter</Link></li>
                  <li><Link href="/text-diff">Text Diff Checker</Link></li>
                  <li><Link href="/character-count">Character Count</Link></li>
                  <li><Link href="/lorem-ipsum">Lorem Ipsum Generator</Link></li>
                </ul>
                <Link href="/text-tools" className="view-all">View All <i><FontAwesomeIcon icon={faArrowRight} /></i></Link>
              </div>

              <div className="category-card">
                <div className="category-icon">
                  <i><FontAwesomeIcon icon={faExchangeAlt} /></i>
                </div>
                <h3>Converters</h3>
                <ul>
                  <li><Link href="/unit-converter">Unit Converter</Link></li>
                  <li><Link href="/base64-encoder">Base64 Encoder/Decoder</Link></li>
                  <li><Link href="/json-formatter">JSON Formatter</Link></li>
                  <li><Link href="/number-base-converter">Number Base Converter</Link></li>
                </ul>
                <Link href="/converter-tools" className="view-all">View All <i><FontAwesomeIcon icon={faArrowRight} /></i></Link>
              </div>

              <div className="category-card">
                <div className="category-icon">
                  <i><FontAwesomeIcon icon={faCode} /></i>
                </div>
                <h3>Web Development</h3>
                <ul>
                  <li><Link href="/html-encoder">HTML Encoder/Decoder</Link></li>
                  <li><Link href="/css-minifier">CSS Minifier</Link></li>
                  <li><Link href="/color-picker">Color Picker</Link></li>
                  <li><Link href="/regex-tester">Regex Tester</Link></li>
                </ul>
                <Link href="/web-dev-tools" className="view-all">View All <i><FontAwesomeIcon icon={faArrowRight} /></i></Link>
              </div>
            </div>
          </section>

          <section className="featured-tools">
            <h2>Featured Tools</h2>
            <div className="featured-grid">
              <Link href="/unix-timestamp" className="featured-card">
                <div className="featured-icon">
                  <i><FontAwesomeIcon icon={faClock} /></i>
                </div>
                <h3>Unix Timestamp Converter</h3>
                <p>Convert between Unix timestamps and human-readable dates. Includes current timestamp, date conversion, and timestamp operations.</p>
              </Link>

              <Link href="/json-formatter" className="featured-card">
                <div className="featured-icon">
                  <i><FontAwesomeIcon icon={faCode} /></i>
                </div>
                <h3>JSON Formatter</h3>
                <p>Format, validate, and beautify JSON data. Minify JSON for production or expand it for readability.</p>
              </Link>

              <Link href="/base64-encoder" className="featured-card">
                <div className="featured-icon">
                  <i><FontAwesomeIcon icon={faExchangeAlt} /></i>
                </div>
                <h3>Base64 Encoder/Decoder</h3>
                <p>Encode text to Base64 or decode Base64 to text. Supports file encoding and URL-safe Base64.</p>
              </Link>
            </div>
          </section>

          <section className="recent-tools">
            <h2>Recently Added Tools</h2>
            <div className="recent-grid">
              <Link href="/color-picker" className="recent-card">
                <h3>Color Picker <span className="new-badge">New</span></h3>
                <p>Interactive color picker with RGB, HEX, HSL, and CMYK values. Save your color palettes.</p>
              </Link>

              <Link href="/markdown-editor" className="recent-card">
                <h3>Markdown Editor <span className="new-badge">New</span></h3>
                <p>Live markdown editor with preview and export options. Perfect for README files.</p>
              </Link>

              <Link href="/password-generator" className="recent-card">
                <h3>Password Generator <span className="new-badge">New</span></h3>
                <p>Generate secure, random passwords with customizable options.</p>
              </Link>

              <Link href="/image-compressor" className="recent-card">
                <h3>Image Compressor <span className="new-badge">New</span></h3>
                <p>Compress and resize images for web use without losing quality.</p>
              </Link>
            </div>
          </section>

          {/* <!-- Ad Space: Bottom Banner -->
          <div className="ad-container ad-horizontal">
            <div className="ad-placeholder">
              <p>Advertisement</p>
              <p className="ad-size">728x90</p>
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
}
