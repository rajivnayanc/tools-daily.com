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
          <p>Enhance your text processing capabilities with our selection of text manipulation and analysis tools. From changing case and comparing differences to counting characters and generating placeholder text, these utilities are designed to assist with various text-related tasks.</p>
          <p>In the realm of content creation and digital communication, text tools play a vital role in refining and optimizing written material. Whether you&apos;re crafting compelling marketing copy, editing important documents, or analyzing textual data, these tools provide the functionality needed to achieve precision and clarity.</p>
          <p>Explore the available text utilities:</p>
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
