import Head from 'next/head';
import { useState } from 'react';
import styles from './CssMinifier.module.css';
import SEO from '../../components/SEO';

export default function CssMinifier() {
  const [css, setCss] = useState('');
  const [minifiedCss, setMinifiedCss] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCss(event.target.value);
    setError('');
  };

  const minifyCss = () => {
    try {
      // Basic CSS minification using regex
      let minified = css.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, ''); // Remove comments
      minified = minified.replace(/\s+/g, ' '); // Remove extra whitespace
      minified = minified.replace(/{\s+/g, '{'); // Remove whitespace after opening brace
      minified = minified.replace(/\s+}/g, '}'); // Remove whitespace before closing brace
      minified = minified.replace(/:\s+/g, ':'); // Remove whitespace after colon
      minified = minified.replace(/\s+;/g, ';'); // Remove whitespace before semicolon
      setMinifiedCss(minified);
      setError('');
    } catch (err) {
      setError('An error occurred during minification.');
      setMinifiedCss('');
    }
  };

  return (
    <>
      <SEO
        title="CSS Minifier - DailyTools"
        description="Minify CSS code to reduce file size."
        keywords="css minifier, minify css, css compressor, clean css"
      />
      <main>
        <div className="container">
          <h1>CSS Minifier</h1>
          <p>CSS minification is the process of removing unnecessary characters from CSS code without affecting its functionality. This includes removing whitespace, comments, and other non-essential elements, resulting in a smaller file size and improved website loading times.</p>
          <p>Minifying CSS code offers significant benefits for website performance and user experience. Smaller CSS files translate to faster loading times, reduced bandwidth consumption, and improved search engine rankings. By optimizing CSS code, developers can enhance website speed and deliver a smoother browsing experience for their users.</p>
          <p>This tool allows you to easily minify your CSS code, making it more efficient for production use.</p>
          <p><strong>How to use:</strong> Paste your CSS code into the text area below and click the &quot;Minify CSS&quot; button. The minified CSS code (or an error message) will appear below.</p>

          <textarea
            className={styles.input}
            placeholder="Enter your CSS code here"
            value={css}
            onChange={handleInputChange}
          />

          <button onClick={minifyCss} className={styles.minifyButton}>
            Minify CSS
          </button>

          {error && <div className={styles.error}>Error: {error}</div>}

          {minifiedCss && (
            <div className={styles.result}>
              Minified CSS:
              <textarea
                className={styles.minifiedInput}
                value={minifiedCss}
                readOnly
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
