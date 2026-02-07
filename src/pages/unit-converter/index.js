import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faRuler, faWeightHanging, faThermometerHalf, faClock, faTachometerAlt, faCube, faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

const unitCategories = {
  length: { icon: faRuler, units: ['Meters', 'Kilometers', 'Centimeters', 'Millimeters', 'Miles', 'Yards', 'Feet', 'Inches'] },
  weight: { icon: faWeightHanging, units: ['Kilograms', 'Grams', 'Milligrams', 'Metric Tonnes', 'Pounds', 'Ounces'] },
  temperature: { icon: faThermometerHalf, units: ['Celsius', 'Fahrenheit', 'Kelvin'] },
  time: { icon: faClock, units: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'] },
  area: { icon: faVectorSquare, units: ['Square Meters', 'Square Kilometers', 'Square Miles', 'Square Yards', 'Square Feet', 'Acres', 'Hectares'] },
  volume: { icon: faCube, units: ['Liters', 'Milliliters', 'Cubic Meters', 'Gallons (US)', 'Quarts (US)', 'Pints (US)', 'Cups (US)'] },
  speed: { icon: faTachometerAlt, units: ['Meters per second', 'Kilometers per hour', 'Miles per hour', 'Knots'] }
};

// Conversion logic (simplified for brevity, ideal world uses a library or comprehensive map)
// Base units: Length=Meters, Weight=Kilograms, Time=Seconds, Area=SqMeters, Volume=Liters, Speed=m/s
const conversionRates = {
  length: {
    'Meters': 1, 'Kilometers': 0.001, 'Centimeters': 100, 'Millimeters': 1000,
    'Miles': 0.000621371, 'Yards': 1.09361, 'Feet': 3.28084, 'Inches': 39.3701
  },
  weight: {
    'Kilograms': 1, 'Grams': 1000, 'Milligrams': 1000000, 'Metric Tonnes': 0.001,
    'Pounds': 2.20462, 'Ounces': 35.274
  },
  // Temperature is special
  time: {
    'Seconds': 1, 'Minutes': 1 / 60, 'Hours': 1 / 3600, 'Days': 1 / 86400,
    'Weeks': 1 / 604800, 'Months': 1 / 2.628e+6, 'Years': 1 / 3.154e+7
  },
  area: {
    'Square Meters': 1, 'Square Kilometers': 1e-6, 'Square Miles': 3.861e-7,
    'Square Yards': 1.19599, 'Square Feet': 10.7639, 'Acres': 0.000247105, 'Hectares': 0.0001
  },
  volume: {
    'Liters': 1, 'Milliliters': 1000, 'Cubic Meters': 0.001,
    'Gallons (US)': 0.264172, 'Quarts (US)': 1.05669, 'Pints (US)': 2.11338, 'Cups (US)': 4.22675
  },
  speed: {
    'Meters per second': 1, 'Kilometers per hour': 3.6, 'Miles per hour': 2.23694, 'Knots': 1.94384
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Feet');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState('');

  // Update units when category changes
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setFromUnit(unitCategories[newCat].units[0]);
    setToUnit(unitCategories[newCat].units[1] || unitCategories[newCat].units[0]);
  };

  useEffect(() => {
    convert();
  }, [amount, fromUnit, toUnit, category]);

  const convert = () => {
    let val = parseFloat(amount);
    if (isNaN(val)) return setResult('');

    if (category === 'temperature') {
      let celsius;
      // To Celsius
      if (fromUnit === 'Celsius') celsius = val;
      else if (fromUnit === 'Fahrenheit') celsius = (val - 32) * 5 / 9;
      else if (fromUnit === 'Kelvin') celsius = val - 273.15;

      // From Celsius
      let final;
      if (toUnit === 'Celsius') final = celsius;
      else if (toUnit === 'Fahrenheit') final = (celsius * 9 / 5) + 32;
      else if (toUnit === 'Kelvin') final = celsius + 273.15;

      setResult(final.toFixed(4).replace(/\.?0+$/, '')); // Trim trailing zeros
    } else {
      // Standard conversion via base unit
      const rates = conversionRates[category];
      if (!rates) return;

      const baseValue = val / rates[fromUnit];
      const finalValue = baseValue * rates[toUnit];

      setResult(finalValue.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const faqData = [
    {
      question: "How accurate are the conversions?",
      answer: "Our conversions use standard international factors. Results are generally accurate to 6 decimal places."
    },
    {
      question: "Why isn't my unit listed?",
      answer: "We cover the most common units. If you need a specific unit added, please contact us."
    }
  ];

  const schemaData = {
    name: "Unit Converter Tool",
    description: "Convert units of length, weight, temperature, area, volume, speed, and time.",
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
        title="Unit Converter - Length, Weight, Temp & More | DailyTools"
        description="Free online unit converter. Convert metric to imperial and vice versa. Supports length, weight, temperature, volume, area, and speed."
        keywords="unit converter, metric converter, imperial converter, weight converter, length conversion"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Unit Converter</h1>
            <p className="tool-description">
              Convert between thousands of units of measurement. Select a category below to get started.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              {/* Category Selector */}
              <div className="category-scroll" style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '15px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                {Object.keys(unitCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`btn text-sm ${category === cat ? 'primary' : 'ghost'}`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <FontAwesomeIcon icon={unitCategories[cat].icon} /> {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="converter-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>

                <div className="input-group">
                  <label>From</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ fontSize: '1.2rem' }}
                  />
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} style={{ marginTop: '10px' }}>
                    {unitCategories[category].units.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button onClick={handleSwap} className="btn round secondary" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
                    <FontAwesomeIcon icon={faExchangeAlt} />
                  </button>
                </div>

                <div className="input-group">
                  <label>To</label>
                  <div className="result-display" style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    minHeight: '48px',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {result}
                  </div>
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} style={{ marginTop: '10px' }}>
                    {unitCategories[category].units.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Supported Conversions</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <li><strong>Length:</strong> Meters, Feet, Inches, Miles...</li>
                <li><strong>Weight:</strong> Kilograms, Pounds, Grams, Ounces...</li>
                <li><strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin</li>
                <li><strong>Area:</strong> Square Meters, Acres, Hectares...</li>
                <li><strong>Volume:</strong> Liters, Gallons, Cups...</li>
                <li><strong>Time:</strong> Seconds, Minutes, Days, Years...</li>
                <li><strong>Speed:</strong> MPH, KPH, Knots...</li>
              </ul>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/unix-timestamp">Unix Timestamp</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/date-difference">Date Difference</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/world-clock">World Clock</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
