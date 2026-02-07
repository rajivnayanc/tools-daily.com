import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressArrowsAlt, faCopy, faEraser, faFileCode, faCode } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState({ original: 0, minified: 0, savings: 0 });

  const minify = () => {
    if (!input) return;

    let minified = input
      .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, '$1') // Remove space around delimiters
      .replace(/;}/g, '}') // Remove last semicolon
      .trim();

    setOutput(minified);

    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    setStats({
      original: originalSize,
      minified: minifiedSize,
      savings: originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setStats({ original: 0, minified: 0, savings: 0 });
  };

  const faqData = [
    {
      question: "Is this safe for production?",
      answer: "Yes, our minifier uses standard regex patterns to remove whitespace and comments. It does not alter your class names or values."
    },
    {
      question: "Why minify CSS?",
      answer: "Minification removes unnecessary characters, reducing file size. This leads to faster page load times and better performance."
    }
  ];

  const schemaData = {
    name: "CSS Minifier",
    description: "Free online CSS minifier. Compress your CSS files to reduce file size and improve website speed.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <>
      <SEO
        title="CSS Minifier - Compress CSS Online | DailyTools"
        description="Free online CSS minifier and compressor. Reduce CSS file size instantly. Improve website load speed and performance."
        keywords="css minifier, css compressor, minify css, optimize css, css optimizer"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>CSS Minifier</h1>
            <p className="tool-description">
              Compress your CSS code to reduce file size and speed up your website.
              Removes comments, whitespace, and unnecessary formatting.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              <div className="tool-grid-2-col" style={{ display: 'grid', gap: '30px' }}>
                <div className="input-group">
                  <label>Original CSS</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste your CSS here..."
                    className="glass-input"
                    style={{ minHeight: '200px', width: '100%', padding: '15px', fontFamily: 'monospace' }}
                  />
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                    Size: {stats.original} bytes
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={minify} className="btn secondary" style={{ padding: '12px 30px' }}>
                    <FontAwesomeIcon icon={faCompressArrowsAlt} /> Minify CSS
                  </button>
                </div>

                <div className="input-group">
                  <label>Minified CSS</label>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      value={output}
                      readOnly
                      placeholder="Minified result..."
                      className="glass-input"
                      style={{ minHeight: '200px', width: '100%', padding: '15px', fontFamily: 'monospace', color: 'var(--success)' }}
                    />
                    {stats.savings > 0 && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--success)', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        -{stats.savings}%
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                    Size: {stats.minified} bytes
                  </div>
                </div>
              </div>

              <div className="action-row" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={handleCopy} className="btn" disabled={!output}>
                  <FontAwesomeIcon icon={faCopy} /> Copy Result
                </button>
                <button onClick={handleClear} className="btn danger">
                  <FontAwesomeIcon icon={faEraser} /> Clear All
                </button>
              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>What does this tool do?</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                <li>Removes comments (<code>{"/* ... */"}</code>)</li>
                <li>Removes unnecessary spaces and line breaks</li>
                <li>Removes last semicolons in blocks</li>
                <li>Optimizes delimiters</li>
              </ul>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/html-encoder">HTML Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/lorem-ipsum">Lorem Ipsum Generator</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
