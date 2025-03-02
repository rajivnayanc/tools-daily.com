import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect } from "react";

/**
 * Update copyright year in footer
 */
const updateCopyrightYear = () => {
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
}

const Footer = () => {
  useEffect(() => {
    updateCopyrightYear();
  }, []);

  return <footer>
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Daily<span>Tools</span></h3>
          <p>Free online tools for everyday tasks.</p>
          <div className="social-links">
            <Link target="_blank" href="https://twitter.com/rajivnayanc" aria-label="Follow us on Twitter"><i aria-hidden="true"><FontAwesomeIcon icon={faTwitter} /></i></Link>
            <Link target="_blank" href="https://github.com/rajivnayanc" aria-label="Follow us on GitHub"><i aria-hidden="true"><FontAwesomeIcon icon={faGithub} /></i></Link>
            <Link target="_blank" href="https://www.linkedin.com/in/rajivnayanc" aria-label="Follow us on LinkedIn"><i aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} /></i></Link>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Popular Tools</h3>
          <ul>
            <li><Link href="/unix-timestamp">Unix Timestamp</Link></li>
            <li><Link href="/json-formatter">JSON Formatter</Link></li>
            <li><Link href="/base64-encoder">Base64 Encoder</Link></li>
            <li><Link href="/text-case-converter">Text Case Converter</Link></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; <span id="current-year">2025</span> DailyTools. All rights reserved.</p>
      </div>
    </div>
  </footer>
}

export default Footer;