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
          <p>Manage time effectively with our suite of date and time tools. Whether you need to convert timestamps, calculate differences between dates, check times across the globe, or convert between time zones, these utilities provide accurate and convenient solutions.</p>
          <p>Date and time tools are essential in a wide range of applications, from scheduling and project management to data analysis and scientific research. Accurate timekeeping and date calculations are crucial for coordinating events, tracking progress, and ensuring data integrity.</p>
          <p>Explore the available date and time utilities:</p>
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
