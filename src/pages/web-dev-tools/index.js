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
          <p>Streamline your web development workflow with our essential tools. Whether you need to encode HTML entities, minify CSS for better performance, pick the perfect color, or test regular expressions, these utilities are here to help you build and debug web projects more efficiently.</p>
          <p>Web development tools are indispensable for creating modern, interactive web applications. They empower developers to write clean, efficient code, optimize website performance, and ensure cross-browser compatibility. These tools are essential for both front-end and back-end development, enabling developers to build robust and user-friendly web experiences.</p>
          <p>Explore the available web development utilities:</p>
          <ul>
            <li><Link href="/html-encoder">HTML Encoder / Decoder</Link></li>
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
