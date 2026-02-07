import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEraser, faFileDownload, fafont, faTextHeight } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setMessage('Copied to clipboard!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleClear = () => {
    setText('');
    setMessage('Cleared!');
    setTimeout(() => setMessage(''), 2000);
  };

  const toSentenceCase = () => {
    const res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    setText(res);
  };

  const toLowerCase = () => setText(text.toLowerCase());
  const toUpperCase = () => setText(text.toUpperCase());

  const toCapitalizedCase = () => {
    const res = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setText(res);
  };

  const toAlternatingCase = () => {
    let res = '';
    for (let i = 0; i < text.length; i++) {
      res += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
    }
    setText(res);
  };

  const toTitleCase = () => {
    // A simple title case implementation
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    const res = text.toLowerCase().split(' ').map((word, index) => {
      if (index > 0 && smallWords.test(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    setText(res);
  };

  const toInverseCase = () => {
    let res = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      res += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    }
    setText(res);
  };

  const toSnakeCase = () => {
    setText(text && text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('_'));
  };

  const toKebabCase = () => {
    setText(text && text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-'));
  };

  const toCamelCase = () => {
    setText(text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, ''));
  };


  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "converted-text.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  // Stats
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text.trim() === '' ? 0 : text.split(/\n/).length;

  const faqData = [
    {
      question: "What is Sentence Case?",
      answer: "Sentence case capitalizes the first letter of each sentence and leaves the rest in lowercase, except for proper nouns. It is commonly used in standard body text."
    },
    {
      question: "What is Title Case?",
      answer: "Title Case capitalizes the first letter of major words, while keeping minor words like 'and', 'in', 'on' lowercase. It is standard for headlines and titles."
    }
  ];

  const schemaData = {
    name: "Case Converter",
    description: "Convert text case online: Uppercase, Lowercase, Title Case, Sentence Case, and more.",
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
        title="Case Converter - Uppercase, Lowercase, Title Case | DailyTools"
        description="Free online case converter tool. Convert text to uppercase, lowercase, title case, sentence case, snake case, and more."
        keywords="case converter, text converter, uppercase, lowercase, title case, sentence case, snake case, camel case"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Case Converter</h1>
            <p className="tool-description">
              Easily convert text between different letter cases. Enter your text and choose the format you need.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your content here..."
                className="glass-input"
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontFamily: 'inherit'
                }}
              />

              <div className="text-stats" style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                <span>Charts: <strong>{charCount}</strong></span>
                <span>Words: <strong>{wordCount}</strong></span>
                <span>Lines: <strong>{lineCount}</strong></span>
              </div>

              <div className="button-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                <button onClick={toSentenceCase} className="btn secondary">Sentence case</button>
                <button onClick={toLowerCase} className="btn secondary">lower case</button>
                <button onClick={toUpperCase} className="btn secondary">UPPER CASE</button>
                <button onClick={toCapitalizedCase} className="btn secondary">Capitalized Case</button>
                <button onClick={toAlternatingCase} className="btn secondary">aLtErNaTiNg cAsE</button>
                <button onClick={toTitleCase} className="btn secondary">Title Case</button>
                <button onClick={toInverseCase} className="btn secondary">InVeRsE CaSe</button>
                <button onClick={toSnakeCase} className="btn secondary">snake_case</button>
                <button onClick={toKebabCase} className="btn secondary">kebab-case</button>
                <button onClick={toCamelCase} className="btn secondary">camelCase</button>
              </div>

              <div className="action-row" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={handleCopy} className="btn">
                  <FontAwesomeIcon icon={faCopy} /> Copy Text
                </button>
                <button onClick={downloadText} className="btn">
                  <FontAwesomeIcon icon={faFileDownload} /> Download Text
                </button>
                <button onClick={handleClear} className="btn danger">
                  <FontAwesomeIcon icon={faEraser} /> Clear
                </button>
                {message && <span style={{ marginLeft: 'auto', color: 'var(--primary)', alignSelf: 'center' }}>{message}</span>}
              </div>
            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Why use a Case Converter?</h2>
              <p>
                Manually capitalizing or formatting text can be tedious, especially for large documents.
                A case converter tool automates this process, ensuring consistency and saving time.
              </p>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/text-diff">Text Diff Checker</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/character-count">Character Count</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/lorem-ipsum">Lorem Ipsum Generator</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
