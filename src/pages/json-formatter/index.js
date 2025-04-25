import Head from 'next/head';
import { useState } from 'react';
import styles from './JsonFormatter.module.css';
import SEO from '../../components/SEO';

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
      <SEO
        title="JSON Formatter - DailyTools"
        description="Format and validate JSON data easily."
        keywords="json formatter, json validator, format json, json beautifier"
      />
      <main>
        <div className="container">
          <h1>JSON Formatter</h1>
          <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. Formatting JSON makes it more readable and helps in debugging by structuring the data clearly with proper indentation.</p>
          <p>Using a JSON formatter offers several benefits, including improved readability, easier debugging, and enhanced collaboration. By presenting JSON data in a structured and organized manner, it becomes simpler to identify errors, understand complex data structures, and share information with others.</p>
          <p>This tool validates your JSON data and formats it into a clean, indented structure. If the JSON is invalid, it will display an error message.</p>
          <p><strong>How to use:</strong> Paste your raw JSON data into the text area below and click the &quot;Format JSON&quot; button. The formatted JSON (or an error message) will appear below. You can then copy the formatted JSON to your clipboard or save it as a file.</p>

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
