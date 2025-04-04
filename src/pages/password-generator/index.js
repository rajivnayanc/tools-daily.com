import Head from 'next/head';
import { useState } from 'react';
import styles from './PasswordGenerator.module.css';
import SEO from '../../components/SEO';

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const handleGeneratePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;<>,.?/';

    let allowedChars = '';
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    if (!allowedChars) {
      setPassword('Please select at least one character set.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      newPassword += allowedChars[randomIndex];
    }
    setPassword(newPassword);
  };

  return (
    <>
      <SEO
        title="Password Generator - DailyTools"
        description="Generate secure, random passwords."
        keywords="password generator, random password, secure password"
      />
      <main>
        <div className="container">
          <h1>Password Generator</h1>
          <p>Generate secure, random passwords based on your criteria.</p>

          <div className={styles.options}>
            <div className={styles.option}>
              <label htmlFor="passwordLength" className={styles.label}>Password Length:</label>
              <input
                type="number"
                id="passwordLength"
                className={styles.input}
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                min="8"
                max="32"
              />
            </div>

            <div className={styles.option}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Include Uppercase
              </label>
            </div>

            <div className={styles.option}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Include Lowercase
              </label>
            </div>

            <div className={styles.option}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers
              </label>
            </div>

            <div className={styles.option}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>
            </div>
          </div>

          <button onClick={handleGeneratePassword} className={styles.generateButton}>
            Generate Password
          </button>

          {password && (
            <div className={styles.result}>
              Generated Password:
              <p className={styles.generatedPassword}>{password}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
