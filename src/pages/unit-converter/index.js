import Head from 'next/head';
import { useState } from 'react';
import styles from './UnitConverter.module.css';
import SEO from '../../components/SEO';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState('');

  const conversionTypes = {
    meters: 'length',
    feet: 'length',
    kilograms: 'weight',
    pounds: 'weight',
    celsius: 'temperature',
    fahrenheit: 'temperature',
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleFromUnitChange = (event) => {
    setFromUnit(event.target.value);
  };

  const handleToUnitChange = (event) => {
    setToUnit(event.target.value);
  };

  const convertUnits = () => {
    const inputValue = parseFloat(value);

    if (isNaN(inputValue)) {
      setResult('Invalid input value.');
      return;
    }

    if (conversionTypes[fromUnit] !== conversionTypes[toUnit]) {
      setResult('Invalid conversion: Cannot convert between different unit types.');
      return;
    }

    let baseValue = 0;

    // Convert to base unit (meters, kilograms, celsius)
    switch (fromUnit) {
      case 'meters':
        baseValue = inputValue;
        break;
      case 'feet':
        baseValue = inputValue * 0.3048;
        break;
      case 'kilograms':
        baseValue = inputValue;
        break;
      case 'pounds':
        baseValue = inputValue * 0.453592;
        break;
      case 'celsius':
        baseValue = inputValue;
        break;
      case 'fahrenheit':
        baseValue = (inputValue - 32) * 5 / 9;
        break;
      default:
        setResult('Unsupported from unit.');
        return;
    }

    let convertedValue = 0;

    // Convert from base unit to target unit
    switch (toUnit) {
      case 'meters':
        convertedValue = baseValue;
        break;
      case 'feet':
        convertedValue = baseValue / 0.3048;
        break;
      case 'kilograms':
        convertedValue = baseValue;
        break;
      case 'pounds':
        convertedValue = baseValue / 0.453592;
        break;
       case 'celsius':
        convertedValue = baseValue;
        break;
      case 'fahrenheit':
        convertedValue = (baseValue * 9 / 5) + 32;
        break;
      default:
        setResult('Unsupported to unit.');
        return;
    }

    setResult(`${inputValue} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`);
  };

  return (
    <>
      <SEO
        title="Unit Converter - DailyTools"
        description="Convert between various units (length, weight, temperature, etc.)."
        keywords="unit converter, length converter, weight converter, temperature converter"
      />
      <main>
        <div className="container">
          <h1>Unit Converter</h1>
          <p>Easily convert between various units of measurement for length, weight, and temperature. Whether you&apos;re working with metric and imperial systems or need to switch between Celsius and Fahrenheit, this tool provides quick and accurate conversions.</p>
          <p>Unit converters are essential tools in various fields, including science, engineering, and everyday life. They allow for seamless translation between different measurement systems, ensuring accuracy and consistency in calculations and comparisons. Whether you&apos;re a student, a professional, or simply need to convert units for a recipe, this tool provides a convenient solution.</p>
          <p><strong>How to use:</strong> Enter the value you want to convert, select the unit you are converting from, select the unit you want to convert to, and click the &quot;Convert&quot; button. The result will be displayed below.</p>

          <div className={styles.inputContainer}>
            <label htmlFor="value" className={styles.label}>
              Value:
            </label>
            <input
              type="number"
              id="value"
              className={styles.input}
              value={value}
              onChange={handleValueChange}
            />
          </div>

          <div className={styles.selectContainer}>
            <label htmlFor="fromUnit" className={styles.label}>
              From:
            </label>
            <select
              id="fromUnit"
              className={styles.select}
              value={fromUnit}
              onChange={handleFromUnitChange}
            >
              <option value="meters">Meters</option>
              <option value="feet">Feet</option>
              <option value="kilograms">Kilograms</option>
              <option value="pounds">Pounds</option>
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
            </select>
          </div>

          <div className={styles.selectContainer}>
            <label htmlFor="toUnit" className={styles.label}>
              To:
            </label>
            <select
              id="toUnit"
              className={styles.select}
              value={toUnit}
              onChange={handleToUnitChange}
            >
              <option value="meters">Meters</option>
              <option value="feet">Feet</option>
               <option value="kilograms">Kilograms</option>
              <option value="pounds">Pounds</option>
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
            </select>
          </div>

          <button onClick={convertUnits} className={styles.convertButton}>
            Convert
          </button>

          {result && <div className={styles.result}>{result}</div>}
        </div>
      </main>
    </>
  );
}
