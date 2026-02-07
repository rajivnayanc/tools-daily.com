import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faCopy, faEraser, faCode, faFileCode } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function HtmlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // encode | decode

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    if (mode === 'encode') {
      // Robust way to encode HTML entities
      const textArea = document.createElement('textarea');
      textArea.innerText = input;
      setOutput(textArea.innerHTML);
    } else {
      // Robust way to decode HTML entities
      const textArea = document.createElement('textarea');
      textArea.innerHTML = input;
      setOutput(textArea.value);
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  const faqData = [
    {
      question: "Why do I need to encode HTML?",
      answer: "HTML encoding prevents browsers from interpreting special characters as code. This is crucial for security (preventing XSS attacks) and correctly displaying code snippets."
    },
    {
      question: "What characters are encoded?",
      answer: "Characters like <, >, &, \", and ' are converted to their corresponding HTML entities (e.g., &lt;, &gt;, &amp;)."
    }
  ];

  const schemaData = {
    name: "HTML Encoder/Decoder",
    description: "Online HTML entity encoder and decoder. Convert special characters to HTML entities safely.",
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
        title="HTML Encoder & Decoder - Escape HTML Entities | DailyTools"
        description="Free online HTML encoder and decoder. Convert text to HTML entities and vice versa. Escape special characters for web safety."
        keywords="html encoder, html decoder, html escape, html entities, xml encoder"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>HTML Encoder/Decoder</h1>
            <p className="tool-description">
              Safe and fast HTML entity conversion. Encode special characters or decode HTML entities back to text.
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
                    <FontAwesomeIcon icon={faCode} /> Encode
                  </button>
                  <button
                    onClick={() => setMode('decode')}
                    className={`btn round ${mode === 'decode' ? 'primary' : 'ghost'}`}
                    style={{ padding: '10px 25px' }}
                  >
                    <FontAwesomeIcon icon={faFileCode} /> Decode
                  </button>
                </div>
              </div>

              <div className="tool-grid-2-col" style={{ display: 'grid', gap: '30px' }}>
                <div className="input-group">
                  <label>{mode === 'encode' ? 'Plain Text / HTML Code' : 'Encoded HTML'}</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? "<h1>Hello World & more</h1>" : "&lt;h1&gt;Hello World &amp; more&lt;/h1&gt;"}
                    className="glass-input"
                    style={{ minHeight: '150px', width: '100%', padding: '15px', fontFamily: 'monospace' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={toggleMode} className="btn round secondary" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }} title="Swap Input/Output">
                    <FontAwesomeIcon icon={faExchangeAlt} style={{ transform: 'rotate(90deg)' }} />
                  </button>
                </div>

                <div className="input-group">
                  <label>{mode === 'encode' ? 'Encoded Output' : 'Decoded Text'}</label>
                  <textarea
                    value={output}
                    readOnly
                    placeholder="Result will appear here..."
                    className="glass-input"
                    style={{ minHeight: '150px', width: '100%', padding: '15px', fontFamily: 'monospace' }}
                  />
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
              <h2>About HTML Entities</h2>
              <p>
                Some characters are reserved in HTML. For example, you cannot use the less than (&lt;)
                or greater than (&gt;) signs within your text, because the browser might mix them with tags.
                To display these characters, you must use entities.
              </p>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/url-encoder">URL Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/markdown-editor">Markdown Editor</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
