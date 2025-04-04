import Head from 'next/head';
import { useState } from 'react';
import styles from './JsonFormatter.module.css';

export default function JsonFormatter() {
  const [json, setJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setJson(event.target.value);
    setError('');
  };

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(json);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setError('');
    } catch (err) {
      setFormattedJson('');
      setError('Invalid JSON: ' + err.message);
    }
  };

  return (
    <>
      <Head>
        <title>JSON Formatter - DailyTools</title>
        <meta name="description" content="Format and validate JSON data easily." />
        <meta name="keywords" content="json formatter, json validator, format json, json beautifier" />
      </Head>
      <main>
        <div className="container">
          <h1>JSON Formatter</h1>
          <p>Paste your JSON data to format and validate it.</p>

          <textarea
            className={styles.input}
            placeholder="Enter your JSON data here"
            value={json}
            onChange={handleInputChange}
          />

          <button onClick={formatJson} className={styles.formatButton}>
            Format JSON
          </button>

          {error && <div className={styles.error}>Error: {error}</div>}

          {formattedJson && (
            <div className={styles.result}>
              Formatted JSON:
              <pre className={styles.formattedJson}>{formattedJson}</pre>
              <div className={styles.buttonContainer}>
                <button onClick={saveJson} className={styles.saveButton}>
                  Save JSON
                </button>
                <button onClick={copyJson} className={styles.copyButton}>
                  Copy JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );

  function saveJson() {
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(formattedJson);
      alert('JSON copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy JSON to clipboard: ' + err.message);
    }
  }
}
