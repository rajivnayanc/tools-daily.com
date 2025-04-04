import Head from 'next/head';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function TextTools() {
  return (
    <>
      <SEO
        title="Text Tools - DailyTools"
        description="Collection of tools for text manipulation and analysis."
        keywords="text tools, text manipulation, text analysis, case converter, text diff, character count, lorem ipsum"
      />
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
