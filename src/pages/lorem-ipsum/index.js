import Head from 'next/head';
import { useState } from 'react';
import styles from './LoremIpsum.module.css';
import SEO from '../../components/SEO';

const defaultLoremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [loremIpsum, setLoremIpsum] = useState(generateLoremIpsum(paragraphs));

  const handleParagraphsChange = (event) => {
    const value = parseInt(event.target.value, 10) || 1;
    setParagraphs(value);
    setLoremIpsum(generateLoremIpsum(value));
  };

  function generateLoremIpsum(numParagraphs) {
    let result = '';
    for (let i = 0; i < numParagraphs; i++) {
      result += `<p>${defaultLoremIpsum}</p>`;
    }
    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  }

  return (
    <>
      <SEO
        title="Lorem Ipsum Generator - DailyTools"
        description="Generate placeholder text using Lorem Ipsum."
        keywords="lorem ipsum, placeholder text, generate lorem ipsum"
      />
      <main>
        <div className="container">
          <h1>Lorem Ipsum Generator</h1>
          <p>Generate placeholder text using the classic Lorem Ipsum passage.</p>

          <div className={styles.inputContainer}>
            <label htmlFor="paragraphs" className={styles.label}>
              Number of Paragraphs:
            </label>
            <input
              type="number"
              id="paragraphs"
              className={styles.input}
              value={paragraphs}
              onChange={handleParagraphsChange}
              min="1"
              max="10"
            />
          </div>

          <div className={styles.loremIpsum}>
            {loremIpsum}
          </div>
        </div>
      </main>
    </>
  );
}
