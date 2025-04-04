import Head from 'next/head';
import { useState } from 'react';
import styles from './CharacterCount.module.css';

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
      <Head>
        <title>Character Count - DailyTools</title>
        <meta name="description" content="Count characters, words, and lines in your text." />
        <meta name="keywords" content="character count, word count, line count, text analysis" />
      </Head>
      <main>
        <div className="container">
          <h1>Character Count</h1>
          <p>Enter your text to count the number of characters, words, and lines.</p>

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
