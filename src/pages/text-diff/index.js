import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { diffChars, diffWords, diffLines } from 'diff';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faCode, faFileAlt, faAlignLeft, faEraser } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function TextDiff() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffMode, setDiffMode] = useState('chars');
  const [diffResult, setDiffResult] = useState([]);
  const [stats, setStats] = useState({ additions: 0, deletions: 0 });

  const handleCompare = () => {
    let diffs;
    if (diffMode === 'chars') {
      diffs = diffChars(original, modified);
    } else if (diffMode === 'words') {
      diffs = diffWords(original, modified);
    } else {
      diffs = diffLines(original, modified);
    }

    setDiffResult(diffs);

    // Calculate stats
    let adds = 0;
    let dels = 0;
    diffs.forEach(part => {
      if (part.added) adds++;
      if (part.removed) dels++;
    });
    setStats({ additions: adds, deletions: dels });
  };

  const handleClear = () => {
    setOriginal('');
    setModified('');
    setDiffResult([]);
    setStats({ additions: 0, deletions: 0 });
  };

  const faqData = [
    {
      question: "What is the difference between Character and Word diff?",
      answer: "Character diff highlights every single character change, which is useful for fixing typos. Word diff highlights changed words, which is better for editing sentences."
    },
    {
      question: "Can I use this for code comparison?",
      answer: "Yes! Use the 'Line Diff' mode for comparing code snippets, as it highlights changes line by line."
    }
  ];

  const schemaData = {
    name: "Text Diff Checker",
    description: "Compare two texts and highlight differences. Support for character, word, and line comparison.",
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
        title="Text Diff Checker - Compare Text Differences Online | DailyTools"
        description="Free online text difference checker. Compare two text files and highlight changes. Supports character, word, and line diffs."
        keywords="text diff, diff checker, compare text, text comparison tool, diff tool"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Text Diff Checker</h1>
            <p className="tool-description">
              Compare two pieces of text and instantly spot the differences.
              Useful for developers, writers, and editors to track changes.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div className="mode-selector" style={{ display: 'flex', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '8px' }}>
                  <button
                    onClick={() => setDiffMode('chars')}
                    className={`btn text-sm ${diffMode === 'chars' ? 'primary' : 'ghost'}`}
                  >
                    <FontAwesomeIcon icon={faCode} /> Chars
                  </button>
                  <button
                    onClick={() => setDiffMode('words')}
                    className={`btn text-sm ${diffMode === 'words' ? 'primary' : 'ghost'}`}
                  >
                    <FontAwesomeIcon icon={faFileAlt} /> Words
                  </button>
                  <button
                    onClick={() => setDiffMode('lines')}
                    className={`btn text-sm ${diffMode === 'lines' ? 'primary' : 'ghost'}`}
                  >
                    <FontAwesomeIcon icon={faAlignLeft} /> Lines
                  </button>
                </div>

                <button onClick={handleClear} className="btn danger text-sm">
                  <FontAwesomeIcon icon={faEraser} /> Clear All
                </button>
              </div>

              <div className="tool-grid-2-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div className="input-group">
                  <label>Original Text</label>
                  <textarea
                    value={original}
                    onChange={(e) => setOriginal(e.target.value)}
                    placeholder="Paste original text here..."
                    className="glass-input"
                    style={{ minHeight: '200px', width: '100%', padding: '15px' }}
                  />
                </div>
                <div className="input-group">
                  <label>Modified Text</label>
                  <textarea
                    value={modified}
                    onChange={(e) => setModified(e.target.value)}
                    placeholder="Paste modified text here..."
                    className="glass-input"
                    style={{ minHeight: '200px', width: '100%', padding: '15px' }}
                  />
                </div>
              </div>

              <button onClick={handleCompare} className="btn w-full secondary" style={{ marginBottom: '30px' }}>
                <FontAwesomeIcon icon={faExchangeAlt} /> Compare Texts
              </button>

              {diffResult.length > 0 && (
                <div className="result-container" style={{ animation: 'fadeIn 0.5s ease' }}>
                  <div className="stats" style={{ marginBottom: '10px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--success)', marginRight: '15px' }}>+ {stats.additions} Additions</span>
                    <span style={{ color: 'var(--danger)' }}>- {stats.deletions} Deletions</span>
                  </div>
                  <div className="diff-output" style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '20px',
                    borderRadius: '8px',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace',
                    lineHeight: '1.6',
                    border: '1px solid var(--border-color)'
                  }}>
                    {diffResult.map((part, index) => {
                      const style = {
                        backgroundColor: part.added ? 'rgba(0, 255, 0, 0.2)' : part.removed ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                        color: part.added ? '#8aff8a' : part.removed ? '#ff8a8a' : 'inherit',
                        textDecoration: part.removed ? 'line-through' : 'none'
                      };
                      return <span key={index} style={style}>{part.value}</span>;
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>How to Compare Text</h2>
              <ol>
                <li>Paste the original Version of your text in the left box.</li>
                <li>Paste the new/modified version in the right box.</li>
                <li>Select the comparison mode (Characters, Words, or Lines).</li>
                <li>Click &quot;Compare Texts&quot; to see the differences highlighted.</li>
              </ol>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/case-converter">Case Converter</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/character-count">Character Count</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/markdown-editor">Markdown Editor</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
