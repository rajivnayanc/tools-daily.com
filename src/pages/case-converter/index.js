import Head from 'next/head';
import { useState } from 'react';
import styles from './CaseConverter.module.css';
import SEO from '../../components/SEO';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [convertedText, setConvertedText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const convertCase = (caseType) => {
    switch (caseType) {
      case 'upper':
        setConvertedText(text.toUpperCase());
        break;
      case 'lower':
        setConvertedText(text.toLowerCase());
        break;
      case 'title':
        setConvertedText(
          text
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        );
        break;
      case 'sentence':
        setConvertedText(
          text
            .split('. ')
            .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase())
            .join('. ')
        );
        break;
      case 'inverse':
        setConvertedText(
          text
            .split('')
            .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
            .join('')
        );
        break;
      default:
        setConvertedText(text);
    }
  };

  return (
    <>
      <SEO
        title="Case Converter - DailyTools"
        description="Convert text between different cases (uppercase, lowercase, title case, etc.)."
        keywords="case converter, uppercase, lowercase, title case, sentence case, inverse case"
      />
      <main>
        <div className="container">
          <h1>Case Converter</h1>
          <p>Easily change the capitalization of your text between various common formats like uppercase, lowercase, title case (capitalizing the first letter of each word), sentence case (capitalizing only the first letter of each sentence), and inverse case (swapping the case of each letter).</p>
          <p>Case conversion is an essential tool for ensuring consistency and readability in written content. Whether you're preparing documents, formatting code, or creating web content, the ability to quickly and easily change the case of text can save time and improve the overall quality of your work.</p>
          <p>This tool is useful for formatting headlines, standardizing text input, or simply adjusting text to meet specific style requirements.</p>
          <p><strong>How to use:</strong> Paste or type your text into the text area below. Click one of the buttons (e.g., "Uppercase", "Lowercase") to convert the text to the desired case. The converted text will appear below the buttons.</p>

          <textarea
            className={styles.input}
            placeholder="Enter your text here"
            value={text}
            onChange={handleInputChange}
          />

          <div className={styles.buttonContainer}>
            <button onClick={() => convertCase('upper')} className={styles.button}>
              Uppercase
            </button>
            <button onClick={() => convertCase('lower')} className={styles.button}>
              Lowercase
            </button>
            <button onClick={() => convertCase('title')} className={styles.button}>
              Title Case
            </button>
            <button onClick={() => convertCase('sentence')} className={styles.button}>
              Sentence Case
            </button>
            <button onClick={() => convertCase('inverse')} className={styles.button}>
              Inverse Case
            </button>
          </div>

          {convertedText && (
            <div className={styles.result}>
              Converted Text:
              <p className={styles.convertedText}>{convertedText}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
