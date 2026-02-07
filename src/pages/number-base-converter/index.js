import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faCopy, faEraser, faCalculator } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

const bases = [
  { name: 'Binary', value: 2 },
  { name: 'Octal', value: 8 },
  { name: 'Decimal', value: 10 },
  { name: 'Hexadecimal', value: 16 }
];

export default function NumberBaseConverter() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    convert();
  }, [input, fromBase, toBase]);

  const convert = () => {
    setError('');
    if (!input) {
      setResult('');
      return;
    }

    try {
      // Validate input for the fromBase
      const validChars = getValidChars(fromBase);
      const regex = new RegExp(`^[${validChars}]+$`, 'i');

      if (!regex.test(input)) {
        setError(`Invalid characters for Base ${fromBase}`);
        setResult('');
        return;
      }

      const decValue = parseInt(input, fromBase);
      const converted = decValue.toString(toBase).toUpperCase();
      setResult(converted);
    } catch (e) {
      setError('Conversion Error');
    }
  };

  const getValidChars = (base) => {
    if (base === 2) return '01';
    if (base === 8) return '0-7';
    if (base === 10) return '0-9';
    if (base === 16) return '0-9a-fA-F';
    return '';
  };

  const handleSwap = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    setInput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const faqData = [
    {
      question: "What is a number base?",
      answer: "A number base is the number of digits or combination of digits that a system of counting uses to represent numbers. The most common is the decimal system (base 10)."
    },
    {
      question: "Why use Hexadecimal?",
      answer: "Hexadecimal (base 16) is human-friendly representation of binary values, making it easier to read and write large binary numbers."
    }
  ];

  const schemaData = {
    name: "Number Base Converter",
    description: "Convert numbers between Binary, Octal, Decimal, and Hexadecimal systems.",
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
        title="Number Base Converter - Binary, Hex, Decimal | DailyTools"
        description="Free online number base converter. Convert between Binary, Octal, Decimal, and Hexadecimal (Hex). Instant and accurate conversion."
        keywords="number base converter, binary converter, hex converter, decimal to binary, hex to decimal"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Number Base Converter</h1>
            <p className="tool-description">
              Convert numbers between different bases including Binary (2), Octal (8), Decimal (10), and Hexadecimal (16).
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              <div className="converter-grid" style={{
                display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) auto minmax(200px, 1fr)',
                gap: '20px', alignItems: 'center'
              }}>

                <div className="input-group">
                  <label>From</label>
                  <select
                    value={fromBase}
                    onChange={(e) => setFromBase(parseInt(e.target.value))}
                    className="glass-select"
                    style={{ marginBottom: '10px' }}
                  >
                    {bases.map(b => <option key={b.value} value={b.value}>{b.name} (Base {b.value})</option>)}
                  </select>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Enter ${bases.find(b => b.value === fromBase)?.name} number...`}
                    className={`glass-input ${error ? 'error' : ''}`}
                    style={{ fontSize: '1.2rem' }}
                  />
                  {error && <div style={{ color: 'var(--danger)', marginTop: '5px', fontSize: '0.9rem' }}>{error}</div>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button onClick={handleSwap} className="btn round secondary" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
                    <FontAwesomeIcon icon={faExchangeAlt} />
                  </button>
                </div>

                <div className="input-group">
                  <label>To</label>
                  <select
                    value={toBase}
                    onChange={(e) => setToBase(parseInt(e.target.value))}
                    className="glass-select"
                    style={{ marginBottom: '10px' }}
                  >
                    {bases.map(b => <option key={b.value} value={b.value}>{b.name} (Base {b.value})</option>)}
                  </select>
                  <div className="result-display" style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    minHeight: '48px',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    overflowX: 'auto'
                  }}>
                    {result}
                  </div>
                </div>

              </div>

              <div className="action-row" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                <button onClick={handleCopy} className="btn" disabled={!result}>
                  <FontAwesomeIcon icon={faCopy} /> Copy Result
                </button>
                <button onClick={handleClear} className="btn danger">
                  <FontAwesomeIcon icon={faEraser} /> Clear
                </button>
              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Supported Systems</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <li><strong>Binary (Base 2):</strong> Used by computers (0s and 1s).</li>
                <li><strong>Octal (Base 8):</strong> Uses digits 0-7.</li>
                <li><strong>Decimal (Base 10):</strong> Standard system for humans.</li>
                <li><strong>Hexadecimal (Base 16):</strong> Uses 0-9 and A-F. Common in web colors.</li>
              </ul>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/unit-converter">Unit Converter</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/html-encoder">HTML Encoder</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
