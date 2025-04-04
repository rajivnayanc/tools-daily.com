import Head from 'next/head';
import { useState } from 'react';
import styles from './Base64Encoder.module.css';
import SEO from '../../components/SEO';

export default function Base64Encoder() {
  const [text, setText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const encodeText = () => {
    try {
      const encoded = btoa(text);
      setEncodedText(encoded);
      setDecodedText(''); // Clear decoded text
    } catch (error) {
      setEncodedText('Encoding failed. Please use valid characters.');
      setDecodedText('');
    }
  };

  const decodeText = () => {
    try {
      const decoded = atob(text);
      setDecodedText(decoded);
      setEncodedText(''); // Clear encoded text
    } catch (error) {
      setDecodedText('Decoding failed. Please use valid Base64 string.');
      setEncodedText('');
    }
  };

  return (
    <>
      <SEO
        title="Base64 Encoder/Decoder - DailyTools"
        description="Encode text to Base64 or decode Base64 to text."
        keywords="base64 encoder, base64 decoder, encode base64, decode base64"
      />
      <main>
        <div className="container">
          <h1>Base64 Encoder/Decoder</h1>
          <p>Enter text to encode to Base64 or decode from Base64.</p>

          <textarea
            className={styles.input}
            placeholder="Enter your text here"
            value={text}
            onChange={handleInputChange}
          />

          <div className={styles.buttonContainer}>
            <button onClick={encodeText} className={styles.button}>
              Encode to Base64
            </button>
            <button onClick={decodeText} className={styles.button}>
              Decode from Base64
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
