import Head from 'next/head';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function ConverterTools() {
  return (
    <>
      <SEO
        title="Converter Tools - DailyTools"
        description="Collection of tools for various data conversions."
        keywords="converter tools, unit converter, base64 encoder, json formatter, number base converter"
      />
      <main>
        <div className="container">
          <h1>Converter Tools</h1>
          <p>Browse our collection of converter utilities:</p>
          <ul>
            <li><Link href="/unit-converter">Unit Converter</Link></li>
            <li><Link href="/base64-encoder">Base64 Encoder/Decoder</Link></li>
            <li><Link href="/json-formatter">JSON Formatter</Link></li>
            <li><Link href="/number-base-converter">Number Base Converter</Link></li>
            {/* Add more tools as they are created */}
          </ul>
        </div>
      </main>
    </>
  );
}
