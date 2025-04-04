import Head from 'next/head';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function WebDevTools() {
  return (
    <>
      <SEO
        title="Web Development Tools - DailyTools"
        description="Collection of tools for web developers."
        keywords="web development tools, html encoder, css minifier, color picker, regex tester"
      />
      <main>
        <div className="container">
          <h1>Web Development Tools</h1>
          <p>Browse our collection of web development utilities:</p>
          <ul>
            <li><Link href="/html-encoder">HTML Encoder/Decoder</Link></li>
            <li><Link href="/css-minifier">CSS Minifier</Link></li>
            <li><Link href="/color-picker">Color Picker</Link></li>
            <li><Link href="/regex-tester">Regex Tester</Link></li>
            {/* Add more tools as they are created */}
          </ul>
        </div>
      </main>
    </>
  );
}
