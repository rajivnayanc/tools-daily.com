import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFlag, faCheckCircle, faTimesCircle, faCopy } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function RegexTester() {
  const [regexStr, setRegexStr] = useState('([A-Z])\\w+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Welcome to the ToolsDaily Regex Tester. Try matching Words like This.');

  const { matches, error, highlightedText } = useMemo(() => {
    try {
      if (!regexStr) return { matches: [], error: null, highlightedText: text };

      const regex = new RegExp(regexStr, flags);
      let match;
      const matches = [];

      // Execute regex to find all matches
      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(text)) !== null) {
          matches.push(match);
        }
      } else {
        match = regex.exec(text);
        if (match) matches.push(match);
      }

      // Create highlighted text elements
      // This is a naive implementation, good enough for simple cases but not nested buffers
      let lastIndex = 0;
      const parts = [];

      // Re-run for highlighting logic which needs careful index tracking
      const highlightRegex = new RegExp(regexStr, flags);
      let hMatch;

      if (flags.includes('g')) {
        while ((hMatch = highlightRegex.exec(text)) !== null) {
          if (hMatch.index > lastIndex) {
            parts.push(text.substring(lastIndex, hMatch.index));
          }
          parts.push(<mark key={hMatch.index} style={{ background: 'rgba(0, 123, 255, 0.4)', borderRadius: '4px', color: 'white' }}>{hMatch[0]}</mark>);
          lastIndex = highlightRegex.lastIndex;
          if (hMatch[0].length === 0) highlightRegex.lastIndex++; // Avoid infinite loop
        }
      } else {
        hMatch = highlightRegex.exec(text);
        if (hMatch) {
          if (hMatch.index > lastIndex) {
            parts.push(text.substring(lastIndex, hMatch.index));
          }
          parts.push(<mark key={hMatch.index} style={{ background: 'rgba(0, 123, 255, 0.4)', borderRadius: '4px', color: 'white' }}>{hMatch[0]}</mark>);
          lastIndex = hMatch.index + hMatch[0].length;
        }
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      return { matches, error: null, highlightedText: parts };

    } catch (e) {
      return { matches: [], error: e.message, highlightedText: text };
    }
  }, [regexStr, flags, text]);

  const faqData = [
    {
      question: "What are Regex flags?",
      answer: "Flags change how the regex engine interprets the pattern. 'g' (global) finds all matches, 'i' (case insensitive) ignores case, 'm' (multiline) matches per line."
    },
    {
      question: "Is this tool compatible with all Regex flavors?",
      answer: "This tool uses the browser's JavaScript RegExp engine. It supports standard JS regex syntax."
    }
  ];

  const schemaData = {
    name: "Regex Tester",
    description: "Online Regular Expression tester and debugger for JavaScript.",
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
        title="Regex Tester & Debugger - Online Regular Expressions | DailyTools"
        description="Free online Regex Tester. Test regular expressions against text in real-time with highlighting. Supports JavaScript Regex flavors."
        keywords="regex tester, regex debugger, regular expression test, js regex, online regex match"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Regex Tester</h1>
            <p className="tool-description">
              Test and debug regular expressions in real-time. Highlights matches and captures groups.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label>Regular Expression</label>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  border: error ? '1px solid var(--danger)' : '1px solid var(--border-color)',
                  overflow: 'hidden'
                }}>
                  <span style={{ padding: '0 15px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>/</span>
                  <input
                    type="text"
                    value={regexStr}
                    onChange={(e) => setRegexStr(e.target.value)}
                    placeholder="pattern"
                    style={{
                      flex: 1,
                      minWidth: '200px',
                      background: 'transparent', border: 'none',
                      padding: '15px 0', fontSize: '1.2rem', fontFamily: 'monospace', color: 'inherit'
                    }}
                  />
                  <span style={{ padding: '0 5px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>/</span>
                  <input
                    type="text"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    placeholder="g"
                    style={{
                      width: '60px', background: 'transparent', border: 'none',
                      padding: '15px 10px 15px 0', fontSize: '1.2rem', fontFamily: 'monospace', color: 'var(--highlight)'
                    }}
                  />
                </div>
                {error && <div style={{ color: 'var(--danger)', marginTop: '5px', fontSize: '0.9rem' }}>{error}</div>}
              </div>

              <div className="tool-grid-2-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

                <div className="input-group">
                  <label>Test String</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="glass-input"
                    style={{ minHeight: '300px', width: '100%', padding: '15px', fontFamily: 'monospace', fontSize: '1.1rem' }}
                  />
                </div>

                <div className="input-group">
                  <label>Match Preview</label>
                  <div
                    className="glass-panel"
                    style={{
                      minHeight: '300px', padding: '15px',
                      fontFamily: 'monospace', fontSize: '1.1rem',
                      whiteSpace: 'pre-wrap', overflowY: 'auto'
                    }}
                  >
                    {highlightedText}
                  </div>
                </div>

              </div>

              <div className="match-details" style={{ marginTop: '30px' }}>
                <h3>Matches Found: {matches.length}</h3>
                {matches.length > 0 && (
                  <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '10px' }}>#</th>
                          <th style={{ padding: '10px' }}>Match</th>
                          <th style={{ padding: '10px' }}>Index</th>
                          <th style={{ padding: '10px' }}>Groups</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map((m, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '10px' }}>{i + 1}</td>
                            <td style={{ padding: '10px', fontFamily: 'monospace' }}>{m[0]}</td>
                            <td style={{ padding: '10px' }}>{m.index}</td>
                            <td style={{ padding: '10px', fontFamily: 'monospace' }}>
                              {m.length > 1 ? Array.from(m).slice(1).map((g, gi) => (
                                <span key={gi} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', marginRight: '5px', fontSize: '0.9rem' }}>
                                  ${gi + 1}: {g}
                                </span>
                              )) : <span style={{ color: 'var(--text-muted)' }}>-</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Quick Reference</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <li><code>[abc]</code> - A single character: a, b or c</li>
                <li><code>[^abc]</code> - Any single character but a, b, or c</li>
                <li><code>[a-z]</code> - Any single character in the range a-z</li>
                <li><code>a+</code> - One or more of a</li>
                <li><code>a*</code> - Zero or more of a</li>
              </ul>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/text-diff">Text Diff Checker</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/lorem-ipsum">Lorem Ipsum Generator</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/html-encoder">Html Encoder</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
