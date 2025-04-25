import Head from 'next/head';
import { useState } from 'react';
import { diffChars } from 'diff';
import styles from './TextDiff.module.css';
import SEO from '../../components/SEO';

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState([]);

  const handleText1Change = (event) => {
    setText1(event.target.value);
  };

  const handleText2Change = (event) => {
    setText2(event.target.value);
  };

  const compareTexts = () => {
    const changes = diffChars(text1, text2);
    setDiff(changes);
  };

  return (
    <>
      <SEO
        title="Text Diff Checker - DailyTools"
        description="Compare two texts and highlight the differences."
        keywords="text diff, text comparison, compare text, difference checker"
      />
      <main className={styles.root}>
        <div className="container">
          <h1>Text Diff Checker</h1>
          <p>This tool allows you to compare two pieces of text and visually identify the differences between them. It highlights additions and removals, making it easy to spot changes in documents, code, or any other text-based content.</p>
          <p>Text diff tools are invaluable for version control, code review, and document comparison. They enable users to quickly identify modifications, track changes, and merge different versions of text-based files. Whether you&apos;re a software developer, a writer, or a researcher, a text diff tool can streamline your workflow and improve collaboration.</p>
          <p><strong>How to use:</strong> Paste or type the first text into the &quot;Text 1&quot; area and the second text into the &quot;Text 2&quot; area. Click the Compare Texts&quot; button to highlight the differences. Additions are shown in green, and removals are shown in red.</p>

          <div className={styles.textContainer}>
            <label htmlFor="text1" className={styles.label}>Text 1:</label>
            <textarea
              id="text1"
              className={styles.input}
              placeholder="Enter the first text here"
              value={text1}
              onChange={handleText1Change}
            />
          </div>

          <div className={styles.textContainer}>
            <label htmlFor="text2" className={styles.label}>Text 2:</label>
            <textarea
              id="text2"
              className={styles.input}
              placeholder="Enter the second text here"
              value={text2}
              onChange={handleText2Change}
            />
          </div>

          <button onClick={compareTexts} className={styles.compareButton}>
            Compare Texts
          </button>

          <div className={styles.result}>
            {diff.length > 0 && (
              <div>
                <strong>Differences:</strong>
                <div className={styles.diffOutput}>
                  {diff.map((part, index) => {
                    const spanStyle = part.added
                      ? { backgroundColor: 'var(--diff-add-color)' }
                      : part.removed
                      ? { backgroundColor: 'var(--diff-remove-color)' }
                      : {};

                    return (
                      <span key={index} style={spanStyle}>
                        {part.value}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
