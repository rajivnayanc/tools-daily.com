import Head from 'next/head';
import { useState } from 'react';
import styles from './HtmlEncoder.module.css';

export default function HtmlEncoder() {
  const [text, setText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const encodeText = () => {
    let encoded = '';
    for (let i = 0; i < text.length; i++) {
      encoded += '&#' + text.charCodeAt(i) + ';';
    }
    setEncodedText(encoded);
    setDecodedText('');
  };

  const decodeText = () => {
    let decoded = '';
    const regex = /&#(\d+);/g;
    let match;
    let tempText = text;

    while ((match = regex.exec(tempText)) !== null) {
      decoded += String.fromCharCode(match[1]);
    }
    setDecodedText(decoded);
    setEncodedText('');
  };

  return (
    <>
      <Head>
        <title>HTML Encoder/Decoder - DailyTools</title>
        <meta name="description" content="Encode or decode text for safe use in HTML." />
        <meta name="keywords" content="html encoder, html decoder, encode html, decode html, html entities" />
      </Head>
      <main>
        <div className="container">
          <h1>HTML Encoder/Decoder</h1>
          <p>Enter text to encode for safe use in HTML or decode HTML entities.</p>

          <textarea
            className={styles.input}
            placeholder="Enter your text here"
            value={text}
            onChange={handleInputChange}
          />

          <div className={styles.buttonContainer}>
            <button onClick={encodeText} className={styles.button}>
              Encode to HTML
            </button>
            <button onClick={decodeText} className={styles.button}>
              Decode from HTML
            </button>
          </div>

          {encodedText && (
            <div className={styles.result}>
              Encoded Text:
              <p className={styles.convertedText}>{encodedText}</p>
            </div>
          )}

          {decodedText && (
            <div className={styles.result}>
              Decoded Text:
              <p className={styles.convertedText}>{decodedText}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
