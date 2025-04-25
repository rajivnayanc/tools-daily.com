import Head from 'next/head';
import { useState } from 'react';
import styles from './NumberBaseConverter.module.css';
import SEO from '../../components/SEO';

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
      <SEO
        title="Number Base Converter - DailyTools"
        description="Convert numbers between different bases (binary, octal, decimal, hexadecimal)."
        keywords="number base converter, binary to decimal, decimal to hex, hex to binary"
      />
      <main>
        <div className="container">
          <h1>Number Base Converter</h1>
          <p>Different number systems (bases) are used in various computing and mathematical contexts. Common bases include Binary (base-2), Decimal (base-10), and Hexadecimal (base-16). This tool allows you to easily convert numbers between these different bases.</p>
          <p>Number base conversion is a fundamental concept in computer science and digital electronics. It is essential for understanding how computers represent and manipulate data. Converting between binary, decimal, and hexadecimal is crucial for tasks such as memory addressing, data representation, and low-level programming.</p>
          <p><strong>How to use:</strong> Enter the number you want to convert in the &quot;Number&quot; field. Select the base of the input number from the &quot;From Base&quot; dropdown. Select the desired output base from the &quot;To Base&quot; dropdown. Click the &quot;Convert&quot; button to see the result.</p>

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
