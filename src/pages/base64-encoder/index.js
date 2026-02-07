import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faCopy, faEraser, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // encode | decode
  const [error, setError] = useState(null);

  useEffect(() => {
    // Auto-convert on input change
    setError(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      // Don't show error immediately for incomplete input during typing in decode mode
      // But if it's clearly invalid, we might want to hint
      if (mode === 'decode') {
        setError('Invalid Base64 string');
      }
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output); // Swap output to input for easy chaining
    setOutput('');
  };

  const faqData = [
    {
      question: "Is my data safe?",
      answer: "Yes, all conversion happens directly in your browser. We never send your data to any server."
    },
    {
      question: "What is Base64 used for?",
      answer: "Base64 is often used to embed binary data (like images) into HTML/CSS files, or to encode data for safe transmission over email and URLs."
    }
  ];

  const schemaData = {
    name: "Base64 Encoder/Decoder",
    description: "Online Base64 encoder and decoder tool. Convert text to Base64 and vice versa safely in your browser.",
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
        title="Base64 Encoder & Decoder - Online Base64 Converter | DailyTools"
        description="Free online Base64 encoder and decoder. Convert text to Base64 strings or decode Base64 back to text. Secure client-side conversion."
        keywords="base64 encode, base64 decode, base64 converter, string to base64, base64 to text"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Base64 Encoder/Decoder</h1>
            <p className="tool-description">
              Easily encode text to Base64 or decode Base64 strings.
              Simple, fast, and privacy-focused conversion.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              <div className="controls" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <div className="toggle-switch" style={{ background: 'rgba(255,255,255,0.1)', padding: '5px', borderRadius: '30px', display: 'flex' }}>
                  <button
                    onClick={() => setMode('encode')}
                    className={`btn round ${mode === 'encode' ? 'primary' : 'ghost'}`}
                    style={{ padding: '10px 25px' }}
                  >
                    <FontAwesomeIcon icon={faLock} /> Encode
                  </button>
                  <button
                    onClick={() => setMode('decode')}
                    className={`btn round ${mode === 'decode' ? 'primary' : 'ghost'}`}
                    style={{ padding: '10px 25px' }}
                  >
                    <FontAwesomeIcon icon={faUnlock} /> Decode
                  </button>
                </div>
              </div>

              <div className="tool-grid-2-col" style={{ display: 'grid', gap: '30px' }}>
                <div className="input-group">
                  <label>{mode === 'encode' ? 'Plain Text' : 'Base64 String'}</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? "Paste text to encode..." : "Paste Base64 to decode..."}
                    className="glass-input"
                    style={{ minHeight: '150px', width: '100%', padding: '15px' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={toggleMode} className="btn round secondary" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }} title="Swap Input/Output">
                    <FontAwesomeIcon icon={faExchangeAlt} style={{ transform: 'rotate(90deg)' }} />
                  </button>
                </div>

                <div className="input-group">
                  <label>{mode === 'encode' ? 'Base64 Result' : 'Decoded Text'}</label>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      value={output}
                      readOnly
                      placeholder="Result will appear here..."
                      className={`glass-input ${error ? 'error' : ''}`}
                      style={{ minHeight: '150px', width: '100%', padding: '15px', color: error ? 'var(--danger)' : 'inherit' }}
                    />
                    {error && <div style={{ color: 'var(--danger)', marginTop: '5px', fontSize: '0.9rem' }}>{error}</div>}
                  </div>
                </div>
              </div>

              <div className="action-row" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={handleCopy} className="btn" disabled={!output || !!error}>
                  <FontAwesomeIcon icon={faCopy} /> Copy Result
                </button>
                <button onClick={handleClear} className="btn danger">
                  <FontAwesomeIcon icon={faEraser} /> Clear All
                </button>
              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>What is Base64?</h2>
              <p>
                Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format.
                It is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data.
              </p>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/html-encoder">HTML Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/url-encoder">URL Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/character-count">Character Count</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
