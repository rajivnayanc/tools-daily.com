import Head from 'next/head';
import { useState } from 'react';
import styles from './HtmlEncoder.module.css';
import SEO from '../../components/SEO';

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
      <SEO
        title="HTML Encoder/Decoder - DailyTools"
        description="Encode or decode text for safe use in HTML."
        keywords="html encoder, html decoder, encode html, decode html, html entities"
      />
      <main>
        <div className="container">
          <h1>HTML Encoder/Decoder</h1>
          <p>HTML encoding is the process of converting characters that have special meaning in HTML (like character code 60, character code 62, character code 38, character code 34) into their corresponding HTML entities. This is essential for displaying these characters correctly in a web page and preventing potential security vulnerabilities like cross-site scripting (XSS).</p>
          <p>HTML encoding and decoding are crucial for ensuring the security and proper rendering of web content. Encoding protects against malicious attacks by preventing the execution of unintended code, while decoding ensures that special characters are displayed correctly to the user. These processes are fundamental to maintaining a safe and user-friendly web experience.</p>
          <p>This tool allows you to easily encode plain text into HTML entities or decode HTML entities back into their original text format.</p>
          <p><strong>How to use:</strong> Enter the text you want to encode or decode into the text area below. Click "Encode to HTML" to convert plain text to HTML entities, or click "Decode from HTML" to convert HTML entities back to plain text. The result will appear below the buttons.</p>

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
