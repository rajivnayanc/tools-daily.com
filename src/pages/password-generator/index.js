import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faCopy, faCheck, faShieldAlt, faKey } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const generate = () => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;<>,.?/'
    };

    let chars = '';
    if (options.uppercase) chars += charSets.uppercase;
    if (options.lowercase) chars += charSets.lowercase;
    if (options.numbers) chars += charSets.numbers;
    if (options.symbols) chars += charSets.symbols;

    if (!chars) return;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    checkStrength(newPassword);
  };

  const checkStrength = (pwd) => {
    if (pwd.length < 8) return setStrength('Weak');
    if (pwd.length < 12) return setStrength('Medium');
    setStrength('Strong');
  };

  // Initial generation
  useEffect(() => {
    generate();
  }, []); // Run on mount

  // Regenerate when options change? Maybe better manual to avoid jumps
  // But updating on length slide is nice
  useEffect(() => {
    generate();
  }, [length, options]);

  const handleOptionChange = (key) => {
    // Prevent unchecking the last option
    const activeCount = Object.values(options).filter(Boolean).length;
    if (activeCount === 1 && options[key]) return;

    setOptions({ ...options, [key]: !options[key] });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  const faqData = [
    {
      question: "Is this password generator safe?",
      answer: "Yes, the passwords are generated locally in your browser using JavaScript's random number generator. They are never sent to any server."
    },
    {
      question: "How long should a password be?",
      answer: "We recommend at least 12 characters, mixing uppercase, lowercase, numbers, and symbols for better security."
    }
  ];

  const schemaData = {
    name: "Password Generator",
    description: "Generate strong, secure, and random passwords instantly.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <>
      <SEO
        title="Strong Password Generator - Secure & Random | DailyTools"
        description="Free online password generator. Create strong, secure, random passwords instantly. customizable length and characters."
        keywords="password generator, strong password, random password, secure password maker"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Password Generator</h1>
            <p className="tool-description">
              Create strong, secure passwords to protect your online accounts.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              <div className="password-display glass-input" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '30px',
                padding: '10px 15px',
                gap: '10px'
              }}>
                <input
                  type="text"
                  value={password}
                  readOnly
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    fontFamily: 'monospace',
                    color: strength === 'Strong' ? 'var(--success)' : strength === 'Medium' ? 'var(--warning)' : 'var(--danger)',
                    padding: '10px 0',
                    width: '100%',
                    margin: 0 // Override global input margin
                  }}
                />
                <button
                  onClick={handleCopy}
                  className="btn primary"
                  style={{
                    borderRadius: '8px',
                    width: 'auto',
                    height: 'auto',
                    padding: '10px 15px',
                    minWidth: 'auto',
                    flexShrink: 0
                  }}
                  title="Copy Password"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>

              <div className="strength-bar" style={{ height: '5px', background: '#333', borderRadius: '5px', marginBottom: '30px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: strength === 'Strong' ? '100%' : strength === 'Medium' ? '60%' : '30%',
                  background: strength === 'Strong' ? 'var(--success)' : strength === 'Medium' ? 'var(--warning)' : 'var(--danger)',
                  transition: 'all 0.3s ease'
                }}></div>
              </div>

              <div className="controls-grid" style={{ display: 'grid', gap: '20px' }}>

                <div className="range-control">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <label>Password Length</label>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{length}</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  <label className={`glass-panel option-card ${options.uppercase ? 'active' : ''}`} style={{ padding: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: options.uppercase ? '1px solid var(--primary)' : '1px solid transparent' }}>
                    <input type="checkbox" checked={options.uppercase} onChange={() => handleOptionChange('uppercase')} style={{ width: '20px', height: '20px' }} />
                    <span>ABC Uppercase</span>
                  </label>
                  <label className={`glass-panel option-card ${options.lowercase ? 'active' : ''}`} style={{ padding: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: options.lowercase ? '1px solid var(--primary)' : '1px solid transparent' }}>
                    <input type="checkbox" checked={options.lowercase} onChange={() => handleOptionChange('lowercase')} style={{ width: '20px', height: '20px' }} />
                    <span>abc Lowercase</span>
                  </label>
                  <label className={`glass-panel option-card ${options.numbers ? 'active' : ''}`} style={{ padding: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: options.numbers ? '1px solid var(--primary)' : '1px solid transparent' }}>
                    <input type="checkbox" checked={options.numbers} onChange={() => handleOptionChange('numbers')} style={{ width: '20px', height: '20px' }} />
                    <span>123 Numbers</span>
                  </label>
                  <label className={`glass-panel option-card ${options.symbols ? 'active' : ''}`} style={{ padding: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: options.symbols ? '1px solid var(--primary)' : '1px solid transparent' }}>
                    <input type="checkbox" checked={options.symbols} onChange={() => handleOptionChange('symbols')} style={{ width: '20px', height: '20px' }} />
                    <span>!@# Symbols</span>
                  </label>
                </div>

                <button onClick={generate} className="btn secondary large" style={{ marginTop: '10px' }}>
                  <FontAwesomeIcon icon={faSyncAlt} /> Regenerate Password
                </button>

              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Password Security Tips</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                <li>Use a different password for every account.</li>
                <li>Use a password manager to store your passwords.</li>
                <li>Enable Two-Factor Authentication (2FA) whenever possible.</li>
              </ul>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/html-encoder">Html Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/character-count">Character Count</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
