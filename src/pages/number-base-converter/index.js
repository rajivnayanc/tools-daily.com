import Head from 'next/head';
import { useState } from 'react';
import styles from './NumberBaseConverter.module.css';

export default function NumberBaseConverter() {
  const [number, setNumber] = useState('');
  const [fromBase, setFromBase] = useState('decimal');
  const [toBase, setToBase] = useState('binary');
  const [result, setResult] = useState('');

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFromBaseChange = (event) => {
    setFromBase(event.target.value);
  };

  const handleToBaseChange = (event) => {
    setToBase(event.target.value);
  };

  const convertNumber = () => {
    try {
      let parsedNumber;
      switch (fromBase) {
        case 'binary':
          parsedNumber = parseInt(number, 2);
          break;
        case 'decimal':
          parsedNumber = parseInt(number, 10);
          break;
        case 'hexadecimal':
          parsedNumber = parseInt(number, 16);
          break;
        default:
          setResult('Invalid input base.');
          return;
      }

      if (isNaN(parsedNumber)) {
        setResult('Invalid input number.');
        return;
      }

      let convertedNumber;
      switch (toBase) {
        case 'binary':
          convertedNumber = parsedNumber.toString(2);
          break;
        case 'decimal':
          convertedNumber = parsedNumber.toString(10);
          break;
        case 'hexadecimal':
          convertedNumber = parsedNumber.toString(16).toUpperCase();
          break;
        default:
          setResult('Invalid output base.');
          return;
      }

      setResult(convertedNumber);
    } catch (error) {
      setResult('Conversion error.');
    }
  };

  return (
    <>
      <Head>
        <title>Number Base Converter - DailyTools</title>
        <meta name="description" content="Convert numbers between different bases (binary, octal, decimal, hexadecimal)." />
        <meta name="keywords" content="number base converter, binary to decimal, decimal to hex, hex to binary" />
      </Head>
      <main>
        <div className="container">
          <h1>Number Base Converter</h1>
          <p>Convert numbers between binary, decimal, and hexadecimal bases.</p>

          <div className={styles.inputContainer}>
            <label htmlFor="number" className={styles.label}>
              Number:
            </label>
            <input
              type="text"
              id="number"
              className={styles.input}
              value={number}
              onChange={handleNumberChange}
            />
          </div>

          <div className={styles.selectContainer}>
            <label htmlFor="fromBase" className={styles.label}>
              From Base:
            </label>
            <select
              id="fromBase"
              className={styles.select}
              value={fromBase}
              onChange={handleFromBaseChange}
            >
              <option value="binary">Binary</option>
              <option value="decimal">Decimal</option>
              <option value="hexadecimal">Hexadecimal</option>
            </select>
          </div>

          <div className={styles.selectContainer}>
            <label htmlFor="toBase" className={styles.label}>
              To Base:
            </label>
            <select
              id="toBase"
              className={styles.select}
              value={toBase}
              onChange={handleToBaseChange}
            >
              <option value="binary">Binary</option>
              <option value="decimal">Decimal</option>
              <option value="hexadecimal">Hexadecimal</option>
            </select>
          </div>

          <button onClick={convertNumber} className={styles.convertButton}>
            Convert
          </button>

          {result && (
            <div className={styles.result}>
              Result: <span className={styles.convertedNumber}>{result}</span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
