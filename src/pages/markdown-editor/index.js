import Head from 'next/head';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './MarkdownEditor.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Editor!

This is a simple **real-time** Markdown editor.

## Features
- Real-time preview
- Supports GitHub Flavored Markdown (GFM)
  - Tables
  - Strikethrough
  - Task lists
  - Autolinks

## Example

### Code Block
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`

### Table
| Feature    | Support |
|------------|---------|
| Basic MD   | Yes     |
| GFM        | Yes     |
| Real-time  | Yes     |

### Task List
- [x] Write Markdown text
- [ ] Add more features
- [x] Show preview

Start typing in the editor on the left!`);

  const [debouncedMarkdown, setDebouncedMarkdown] = useState(markdown);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMarkdown(markdown);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [markdown]);

  const handleInputChange = (event) => {
    setMarkdown(event.target.value);
  };

  const exportToPDF = () => {
    const element = document.querySelector(`.${styles.markdownPreview}`);
    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let margin = 5;
      let x = margin;
      let y = margin;
      pdf.addImage(imgData, 'PNG', x, y, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
      pdf.save('markdown.pdf');
    });
  };

  return (
    <>
      <Head>
        <title>Markdown Editor - DailyTools</title>
        <meta name="description" content="Write, edit, and preview Markdown text in real-time with GitHub Flavored Markdown (GFM) support." />
        <meta name="keywords" content="markdown editor, markdown preview, real-time markdown, GFM editor, online markdown tool" />
      </Head>
      <main>
        <div className="container">
          <h1>Markdown Editor <button onClick={exportToPDF}>Export to PDF</button></h1>
          <p>Write Markdown on the left and see the rendered HTML on the right.</p>

          <div className={styles.editorLayout}>
            <div className={styles.editorPane}>
              <textarea
                value={markdown}
                onChange={handleInputChange}
                className={styles.editorTextarea}
                aria-label="Markdown Input"
                placeholder="Enter your Markdown here..."
              />
            </div>
            <div className={`${styles.previewPane} ${styles.markdownPreview}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {debouncedMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MarkdownEditor;
