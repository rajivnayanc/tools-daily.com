import Head from 'next/head';
import { useState } from 'react';
import styles from './CssMinifier.module.css';

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
      <Head>
        <title>CSS Minifier - DailyTools</title>
        <meta name="description" content="Minify CSS code to reduce file size." />
        <meta name="keywords" content="css minifier, minify css, css compressor, clean css" />
      </Head>
      <main>
        <div className="container">
          <h1>CSS Minifier</h1>
          <p>Paste your CSS code to minify it and reduce file size.</p>

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
