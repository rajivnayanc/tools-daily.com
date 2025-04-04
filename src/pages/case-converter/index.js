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
          <p>Enter your text and choose a case to convert it to.</p>

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
