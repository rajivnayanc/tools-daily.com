import { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';
import Link from 'next/link';

export default function JsonFormatter() {
  const [json, setJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setJson(event.target.value);
    setError('');
  };

  const formatJson = () => {
    try {
      if (!json.trim()) {
        setError('Please enter some JSON to format.');
        return;
      }
      const parsedJson = JSON.parse(json);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setError('');
    } catch (err) {
      setFormattedJson('');
      setError('Invalid JSON: ' + err.message);
    }
  };

  const clearAll = () => {
    setJson('');
    setFormattedJson('');
    setError('');
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      alert('JSON copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy JSON to clipboard: ' + err.message);
    }
  };

  const saveJson = () => {
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqData = [
    {
      question: "What is JSON?",
      answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate."
    },
    {
      question: "Why should I use a JSON Formatter?",
      answer: "Raw JSON data is often minified (compressed) to save space, making it hard to read. A JSON Formatter beautifies this data with proper indentation and spacing, making it easier to debug and understand."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all formatting is done client-side in your browser. Your data is never sent to our servers."
    }
  ];

  const schemaData = {
    name: "JSON Formatter & Validator",
    description: "Free online JSON formatter and validator. Beautify, debug, and validate your JSON data securely in your browser.",
    applicationCategory: "DeveloperApplication",
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
        title="JSON Formatter & Validator - Free Online Tool | DailyTools"
        description="Format, validate, and beautify your JSON data with our free online JSON Formatter. Secure, client-side processing with syntax highlighting and error detection."
        keywords="json formatter, json validator, json beautifier, online json tool, debug json, format json"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>JSON Formatter & Validator</h1>
            <p className="tool-description">
              Paste your JSON code below to format, validate, and beautify it.
              This tool runs entirely in your browser, so your data remains secure.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <div className="input-group">
                <textarea
                  placeholder="Paste your JSON here..."
                  value={json}
                  onChange={handleInputChange}
                  style={{ minHeight: '200px', fontFamily: 'monospace' }}
                  aria-label="JSON Input"
                ></textarea>
              </div>

              <div className="input-group" style={{ justifyContent: 'space-between' }}>
                <div>
                  <button onClick={formatJson} className="btn">Format JSON</button>
                  <button onClick={clearAll} className="btn" style={{ background: 'rgba(255,255,255,0.1)', marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faTrash} /> Clear
                  </button>
                </div>
              </div>

              {error && (
                <div className="result-container" style={{ borderColor: '#ff4d4d', background: 'rgba(255, 77, 77, 0.1)', marginTop: '20px' }}>
                  <p style={{ color: '#ff4d4d', margin: 0 }}><strong>Error:</strong> {error}</p>
                </div>
              )}

              {formattedJson && (
                <div className="tool-panel" style={{ marginTop: '30px', animation: 'fadeIn 0.5s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3>Formatted Result</h3>
                    <div>
                      <button onClick={copyJson} className="btn-copy" title="Copy to clipboard">
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                      <button onClick={saveJson} className="btn-copy" title="Download JSON">
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    </div>
                  </div>
                  <pre
                    className="result-value"
                    style={{
                      textAlign: 'left',
                      overflowX: 'auto',
                      padding: '15px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '8px'
                    }}
                  >
                    {formattedJson}
                  </pre>
                </div>
              )}
            </div>

            <div className="tool-info">
              <h2>How to use the JSON Formatter</h2>
              <ol style={{ marginLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <li>Paste your raw (minified) JSON data into the input box above.</li>
                <li>Click the <strong>Format JSON</strong> button.</li>
                <li>If your JSON is valid, the beautified version will appear below.</li>
                <li>If there are errors, a red message will indicate what went wrong.</li>
                <li>Use the Copy or Download buttons to save your formatted data.</li>
              </ol>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/xml-formatter">XML Formatter</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/html-encoder">HTML Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/yaml-to-json">YAML to JSON</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
