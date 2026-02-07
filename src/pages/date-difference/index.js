import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCalculator, faClock, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function DateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Set default dates on client side to avoid hydration mismatch
    setStartDate(moment().format('YYYY-MM-DD'));
    setEndDate(moment().add(1, 'month').format('YYYY-MM-DD'));
  }, []);

  const calculateDifference = () => {
    const start = moment(startDate);
    const end = moment(endDate);

    if (!start.isValid() || !end.isValid()) {
      return;
    }

    // Difference in various units
    const years = end.diff(start, 'years');
    const months = end.diff(start, 'months');
    const days = end.diff(start, 'days');
    const weeks = end.diff(start, 'weeks');
    const hours = end.diff(start, 'hours');

    // Precise breakdown
    const tempEnd = moment(end);
    const bYears = tempEnd.diff(start, 'years');
    tempEnd.subtract(bYears, 'years');
    const bMonths = tempEnd.diff(start, 'months');
    tempEnd.subtract(bMonths, 'months');
    const bDays = tempEnd.diff(start, 'days');

    setResult({
      total: {
        years: parseFloat(end.diff(start, 'years', true).toFixed(2)),
        months,
        weeks,
        days,
        hours,
        minutes: end.diff(start, 'minutes'),
        seconds: end.diff(start, 'seconds'),
      },
      breakdown: {
        years: bYears,
        months: bMonths,
        days: bDays
      }
    });
  };

  const faqData = [
    {
      question: "How does this calculator handle leap years?",
      answer: "Yes, this calculator uses the Moment.js library which correctly accounts for leap years when calculating differences."
    },
    {
      question: "Does the end date count?",
      answer: "The calculation considers the time from the start of the first day to the start of the last day. It calculates the duration between the two points in time."
    }
  ];

  const schemaData = {
    name: "Date Difference Calculator",
    description: "Calculate the difference between two dates in years, months, weeks, days, hours, minutes, and seconds.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <>
      <SEO
        title="Date Difference Calculator - Duration Between Two Dates | DailyTools"
        description="Calculate the exact duration between two dates. Get results in days, weeks, months, and years. Free online date calculator."
        keywords="date difference, date calculator, days between dates, time duration, age calculator"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Date Difference Calculator</h1>
            <p className="tool-description">
              Calculate the duration between two dates. Perfect for planning events, tracking project timelines, or calculating your exact age.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <div className="tool-grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'end' }}>
                <div className="input-group">
                  <label><FontAwesomeIcon icon={faCalendarAlt} /> Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label><FontAwesomeIcon icon={faCalendarAlt} /> End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <button onClick={calculateDifference} className="btn w-full secondary" style={{ marginTop: '20px' }}>
                <FontAwesomeIcon icon={faCalculator} /> Calculate Duration
              </button>

              {result && (
                <div className="result-container" style={{ marginTop: '30px', animation: 'fadeIn 0.5s ease' }}>
                  <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>result</h3>

                  <div className="highlight-box" style={{ background: 'rgba(0, 243, 255, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid var(--primary)', textAlign: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.breakdown.years} Years, {result.breakdown.months} Months, {result.breakdown.days} Days</span>
                  </div>

                  <div className="result-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                    <div className="result-card" style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Days</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.total.days.toLocaleString()}</div>
                    </div>
                    <div className="result-card" style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Weeks</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.total.weeks.toLocaleString()}</div>
                    </div>
                    <div className="result-card" style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Months</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.total.months.toLocaleString()}</div>
                    </div>
                    <div className="result-card" style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Hours</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.total.hours.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>How to use the Date Difference Calculator</h2>
              <ol>
                <li>Enter the <strong>Start Date</strong>. This is the beginning of the period you want to measure.</li>
                <li>Enter the <strong>End Date</strong>. This is the end of the period.</li>
                <li>Click <strong>Calculate Duration</strong>.</li>
                <li>The tool will show you the exact duration in years, months, and days, as well as total days, weeks, and hours.</li>
              </ol>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/unix-timestamp">Unix Timestamp</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/world-clock">World Clock</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/timezone-converter">Time Zone Converter</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
