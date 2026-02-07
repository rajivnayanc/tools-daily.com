import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileDownload, faSyncAlt, faAlignLeft, faParagraph, faFont } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

const latinWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
  "est", "laborum"
];

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [text, setText] = useState('');

  const generate = () => {
    let result = '';

    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        result += generateParagraph() + '\n\n';
      }
    } else if (type === 'sentences') {
      for (let i = 0; i < count; i++) {
        result += generateSentence() + ' ';
      }
    } else {
      // words
      for (let i = 0; i < count; i++) {
        result += latinWords[Math.floor(Math.random() * latinWords.length)] + ' ';
      }
    }
    setText(result.trim());
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    let sentence = '';
    for (let i = 0; i < length; i++) {
      let word = latinWords[Math.floor(Math.random() * latinWords.length)];
      if (i === 0) word = word.charAt(0).toUpperCase() + word.slice(1);
      sentence += word + (i === length - 1 ? '.' : ' ');
    }
    return sentence;
  };

  const generateParagraph = () => {
    const length = Math.floor(Math.random() * 5) + 3;
    let paragraph = '';
    for (let i = 0; i < length; i++) {
      paragraph += generateSentence() + ' ';
    }
    return paragraph.trim();
  };

  // Initial generation
  useState(() => {
    generate();
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "lorem-ipsum.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const faqData = [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s."
    },
    {
      question: "Where does it come from?",
      answer: "It consists of a scrambled section of 'De finibus bonorum et malorum', a 1st-century BC Latin text by Cicero, with words altered, added, and removed."
    }
  ];

  const schemaData = {
    name: "Lorem Ipsum Generator",
    description: "Generate Lorem Ipsum placeholder text for your designs.",
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
        title="Lorem Ipsum Generator - Dummy Text Generator | DailyTools"
        description="Free online Lorem Ipsum generator. Create placeholder text for your design projects. Generate paragraphs, sentences, or words."
        keywords="lorem ipsum, dummy text, placeholder text, lipsum generator"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Lorem Ipsum Generator</h1>
            <p className="tool-description">
              Generate standard Lorem Ipsum placeholder text for your web design, graphic design,
              or layout projects.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <div className="controls" style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'end' }}>
                <div className="input-group" style={{ flex: '1', minWidth: '150px' }}>
                  <label>Count</label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="input-group" style={{ flex: '1', minWidth: '150px' }}>
                  <label>Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                  </select>
                </div>
                <button onClick={generate} className="btn secondary" style={{ marginBottom: '2px' }}>
                  <FontAwesomeIcon icon={faSyncAlt} /> Generate
                </button>
              </div>

              <div className="output-area" style={{ position: 'relative' }}>
                <textarea
                  value={text}
                  readOnly
                  className="glass-input"
                  style={{
                    width: '100%',
                    minHeight: '300px',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    fontFamily: 'serif',
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                  }}
                />
                <div className="action-row" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '-10px', marginBottom: '20px' }}>
                  <button onClick={handleCopy} className="btn">
                    <FontAwesomeIcon icon={faCopy} /> Copy
                  </button>
                  <button onClick={handleDownload} className="btn">
                    <FontAwesomeIcon icon={faFileDownload} /> Download
                  </button>
                </div>
              </div>
            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Details regarding Lorem Ipsum</h2>
              <p>
                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit...&quot; is the most famous placeholder text.
                It looks like Latin, but it&apos;s actually nonsense.
                Designers use it to show where text will go without distracting the viewer with readable content.
              </p>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/character-count">Character Count</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/case-converter">Case Converter</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/text-diff">Text Diff Checker</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
