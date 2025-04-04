import Head from 'next/head';
import Link from 'next/link';

export default function TextTools() {
  return (
    <>
      <Head>
        <title>Text Tools - DailyTools</title>
        <meta name="description" content="Collection of tools for text manipulation and analysis." />
      </Head>
      <main>
        <div className="container">
          <h1>Text Tools</h1>
          <p>Browse our collection of text utilities:</p>
          <ul>
            <li><Link href="/case-converter">Case Converter</Link></li>
            <li><Link href="/text-diff">Text Diff Checker</Link></li>
            <li><Link href="/character-count">Character Count</Link></li>
            <li><Link href="/lorem-ipsum">Lorem Ipsum Generator</Link></li>
            {/* Add more tools as they are created */}
          </ul>
        </div>
      </main>
    </>
  );
}
