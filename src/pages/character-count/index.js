import Head from 'next/head';
import { useState } from 'react';
import styles from './CharacterCount.module.css';
import SEO from '../../components/SEO';

export default function CharacterCount() {
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const characterCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text.split('\n').length;

  return (
    <>
      <SEO
        title="Character Count - DailyTools"
        description="Count characters, words, and lines in your text."
        keywords="character count, word count, line count, text analysis"
      />
      <main>
        <div className="container">
          <h1>Character Count</h1>
          <p>Analyze your text to determine the number of characters, words, and lines it contains. This tool is useful for writers, editors, and anyone who needs to keep track of text length for various purposes.</p>
          <p>Character count tools are essential for meeting specific length requirements in various contexts, such as social media posts, meta descriptions, and academic papers. They help users ensure that their text adheres to the prescribed limits, optimizing communication and avoiding truncation or rejection.</p>
          <p><strong>How to use:</strong> Simply paste or type your text into the text area below. The tool will automatically calculate and display the number of characters, words, and lines in your text.</p>

          <textarea
            className={styles.input}
            placeholder="Enter your text here"
            value={text}
            onChange={handleInputChange}
          />

          <div className={styles.results}>
            <p>
              Characters: <span className={styles.count}>{characterCount}</span>
            </p>
            <p>
              Words: <span className={styles.count}>{wordCount}</span>
            </p>
            <p>
              Lines: <span className={styles.count}>{lineCount}</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
