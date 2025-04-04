import Head from 'next/head';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function DateTimeTools() {
  return (
    <>
      <SEO
        title="Date & Time Tools - DailyTools"
        description="Collection of tools for date and time calculations and conversions."
        keywords="date tools, time tools, date calculator, time converter"
      />
      <main>
        <div className="container">
          <h1>Date & Time Tools</h1>
          <p>Browse our collection of date and time utilities:</p>
          <ul>
            <li><Link href="/unix-timestamp">Unix Timestamp Converter</Link></li>
            <li><Link href="/date-difference">Date Difference Calculator</Link></li>
            <li><Link href="/world-clock">World Clock</Link></li>
            <li><Link href="/timezone-converter">Time Zone Converter</Link></li>
            {/* Add more tools as they are created */}
          </ul>
        </div>
      </main>
    </>
  );
}
