import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faCopy, faFileAlt, faAlignLeft, faKeyboard, faClock, faComment } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function CharacterCount() {
  const [text, setText] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText('');
  };

  // Metrics
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text.trim() === '' ? 0 : text.split(/\n/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphCount = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(Boolean).length;
  const spacesCount = (text.match(/\s/g) || []).length;
  const charCountNoSpaces = charCount - spacesCount;

  // Estimated Times
  const readingTime = Math.ceil(wordCount / 200); // 200 wpm
  const speakingTime = Math.ceil(wordCount / 130); // 130 wpm

  const faqData = [
    {
      question: "How is reading time calculated?",
      answer: "We use an average reading speed of 200 words per minute (WPM) to estimate how long it would take to read your text."
    },
    {
      question: "Does this count emojis as characters?",
      answer: "Yes, emojis and special characters are counted as characters."
    }
  ];

  const schemaData = {
    name: "Character Count Tool",
    description: "Analyze text for character count, word count, sentence count, and estimated reading time.",
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
        title="Character Count & Word Counter - Free Online Tool | DailyTools"
        description="Free online character counter and word counter. Calculate letters, words, sentences, paragraphs, and reading time instantly."
        keywords="character count, word count, letter counter, text analyzer, reading time calculator"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Character Count</h1>
            <p className="tool-description">
              Analyze your text instantly. Count characters, words, sentences, lines, and more.
              Perfect for writing tweets, blog posts, or essays.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="glass-input"
                style={{
                  width: '100%',
                  minHeight: '300px',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  fontFamily: 'inherit',
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}
              />

              <div className="action-row" style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'flex-end' }}>
                <button onClick={handleCopy} className="btn">
                  <FontAwesomeIcon icon={faCopy} /> Copy Text
                </button>
                <button onClick={handleClear} className="btn danger">
                  <FontAwesomeIcon icon={faEraser} /> Clear Text
                </button>
              </div>

              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                <div className="stat-card" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{wordCount}</div>
                  <div style={{ color: 'var(--text-muted)' }}>Words</div>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--highlight)' }}>{charCount}</div>
                  <div style={{ color: 'var(--text-muted)' }}>Characters</div>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>{sentenceCount}</div>
                  <div style={{ color: 'var(--text-muted)' }}>Sentences</div>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{paragraphCount}</div>
                  <div style={{ color: 'var(--text-muted)' }}>Paragraphs</div>
                </div>
              </div>

              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="detail-card" style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Details</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                      <span>Characters (no spaces)</span> <strong>{charCountNoSpaces}</strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                      <span>Spaces</span> <strong>{spacesCount}</strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                      <span>Lines</span> <strong>{lineCount}</strong>
                    </li>
                  </ul>
                </div>

                <div className="detail-card" style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Estimated Time</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                      <span><FontAwesomeIcon icon={faClock} /> Reading Time</span> <strong>{readingTime} min</strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                      <span><FontAwesomeIcon icon={faComment} /> Speaking Time</span> <strong>{speakingTime} min</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Details regarding Character Count Tool</h2>
              <p>
                Whether you are writing a tweet (280 characters), a meta description (160 characters),
                or a blog post (1000+ words), keeping track of your content length is crucial.
                Our tool runs entirely in your browser, so your text is never sent to any server.
              </p>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/case-converter">Case Converter</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/text-diff">Text Diff Checker</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/markdown-editor">Markdown Editor</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
