import Head from 'next/head';
import Link from 'next/link';

export default function ConverterTools() {
  return (
    <>
      <Head>
        <title>Converter Tools - DailyTools</title>
        <meta name="description" content="Collection of tools for various data conversions." />
      </Head>
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
