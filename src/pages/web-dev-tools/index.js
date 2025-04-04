import Head from 'next/head';
import Link from 'next/link';

export default function WebDevTools() {
  return (
    <>
      <Head>
        <title>Web Development Tools - DailyTools</title>
        <meta name="description" content="Collection of tools for web developers." />
      </Head>
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
