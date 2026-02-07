import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faHeading, faLink, faListUl, faCode, faQuoteRight, faFileDownload, faCopy, faEraser } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

const initialMarkdown = `# Welcome to the Markdown Editor

This is a **live playground** for your markdown.

## Features
- Real-time preview
- GitHub Flavored Markdown (GFM)
- Export to .md file

> "Code is like humor. When you have to explain it, it’s bad." – Cory House

\`\`\`javascript
console.log('Hello World');
\`\`\`

| Feature | Status |
| :--- | :--- |
| Tables | ✅ |
| Code Blocks | ✅ |
`;

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const textAreaRef = useRef(null);

  const insertText = (before, after = '') => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    setMarkdown(newText);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "document.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const faqData = [
    {
      question: "What is Markdown?",
      answer: "Markdown is a lightweight markup language for creating formatted text using a plain-text editor."
    },
    {
      question: "Does this support GitHub Flavored Markdown?",
      answer: "Yes, we use 'remark-gfm' to support tables, strikethrough, task lists, and more."
    }
  ];

  const schemaData = {
    name: "Markdown Editor",
    description: "Online Markdown Editor with real-time preview and GFM support.",
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
        title="Online Markdown Editor - Real-time Preview | DailyTools"
        description="Free online Markdown editor with live preview. Supports GitHub Flavored Markdown (GFM). Write, edit, and download MD files."
        keywords="markdown editor, online markdown, gfm editor, markdown preview, readme generator"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Markdown Editor</h1>
            <p className="tool-description">
              Write and preview Markdown in real-time. The perfect tool for creating READMEs, blog posts, and documentation.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              <div className="toolbar" style={{
                display: 'flex', gap: '5px', padding: '10px',
                background: 'rgba(255,255,255,0.05)', borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid var(--border-color)',
                flexWrap: 'wrap'
              }}>
                <button onClick={() => insertText('**', '**')} className="btn text-sm ghost" title="Bold"><FontAwesomeIcon icon={faBold} /></button>
                <button onClick={() => insertText('*', '*')} className="btn text-sm ghost" title="Italic"><FontAwesomeIcon icon={faItalic} /></button>
                <button onClick={() => insertText('## ')} className="btn text-sm ghost" title="Heading"><FontAwesomeIcon icon={faHeading} /></button>
                <button onClick={() => insertText('[', '](url)')} className="btn text-sm ghost" title="Link"><FontAwesomeIcon icon={faLink} /></button>
                <button onClick={() => insertText('- ')} className="btn text-sm ghost" title="List"><FontAwesomeIcon icon={faListUl} /></button>
                <button onClick={() => insertText('`', '`')} className="btn text-sm ghost" title="Inline Code"><FontAwesomeIcon icon={faCode} /></button>
                <button onClick={() => insertText('> ')} className="btn text-sm ghost" title="Quote"><FontAwesomeIcon icon={faQuoteRight} /></button>

                <div style={{ flex: 1 }}></div>

                <button onClick={() => setMarkdown('')} className="btn text-sm ghost danger" title="Clear"><FontAwesomeIcon icon={faEraser} /></button>
              </div>

              <div className="editor-container" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                minHeight: '500px', border: '1px solid var(--border-color)',
                borderRadius: '0 0 8px 8px', overflow: 'hidden'
              }}>
                <textarea
                  ref={textAreaRef}
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="glass-input"
                  style={{
                    border: 'none', borderRadius: 0, resize: 'none',
                    padding: '20px', fontFamily: 'monospace', lineHeight: '1.6',
                    background: 'rgba(0,0,0,0.2)', height: '100%'
                  }}
                  placeholder="Type markdown here..."
                />
                <div className="preview-pane" style={{
                  padding: '20px', overflowY: 'auto', background: 'rgba(255,255,255,0.02)',
                  borderLeft: '1px solid var(--border-color)', height: '100%'
                }}>
                  <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                  </div>
                </div>
              </div>

              <div className="action-row" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={handleCopy} className="btn">
                  <FontAwesomeIcon icon={faCopy} /> Copy Markdown
                </button>
                <button onClick={handleDownload} className="btn">
                  <FontAwesomeIcon icon={faFileDownload} /> Download .md
                </button>
              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Why use Markdown?</h2>
              <p>
                Markdown is fast, portable, and widely supported. It allows you to write formatted text
                without taking your hands off the keyboard. It&apos;s the standard for developers on GitHub,
                Stack Overflow, and Reddit.
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
              <li style={{ marginBottom: '10px' }}><Link href="/lorem-ipsum">Lorem Ipsum Generator</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/character-count">Character Count</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>

      {/* Basic Markdown Styles for Preview */}
      <style jsx global>{`
        .markdown-body h1, .markdown-body h2, .markdown-body h3 { margin-top: 1.5em; margin-bottom: 0.5em; color: var(--text-highlight); }
        .markdown-body p { margin-bottom: 1em; line-height: 1.6; }
        .markdown-body ul, .markdown-body ol { margin-left: 1.5em; margin-bottom: 1em; }
        .markdown-body blockquote { border-left: 4px solid var(--primary); padding-left: 1em; color: var(--text-muted); font-style: italic; }
        .markdown-body code { background: rgba(255,255,255,0.1); padding: 2px 4px; borderRadius: 4px; font-family: monospace; }
        .markdown-body pre { background: rgba(0,0,0,0.3); padding: 15px; borderRadius: 8px; overflow-x: auto; margin-bottom: 1em; }
        .markdown-body pre code { background: transparent; padding: 0; }
        .markdown-body table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
        .markdown-body th, .markdown-body td { border: 1px solid var(--border-color); padding: 8px; text-align: left; }
        .markdown-body th { background: rgba(255,255,255,0.05); }
        .markdown-body a { color: var(--primary); text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body img { max-width: 100%; border-radius: 8px; }
      `}</style>
    </>
  );
}
