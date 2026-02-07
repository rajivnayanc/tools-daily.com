import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faClock, faGlobe, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

const commonTimezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Pacific/Auckland"
];

const allTimezones = moment.tz.names();

export default function TimezoneConverter() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('America/New_York');
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Initialize with current time/date
    const now = moment();
    setDate(now.format('YYYY-MM-DD'));
    setTime(now.format('HH:mm'));
    setSourceZone(moment.tz.guess());
  }, []);

  const handleConvert = () => {
    if (!date || !time) return;

    const sourceDateTime = moment.tz(`${date} ${time}`, sourceZone);
    const targetDateTime = sourceDateTime.clone().tz(targetZone);

    setResult({
      source: {
        time: sourceDateTime.format('h:mm A'),
        date: sourceDateTime.format('ddd, MMM D, YYYY'),
        zone: sourceZone,
        abbr: sourceDateTime.format('z'),
        offset: sourceDateTime.format('Z')
      },
      target: {
        time: targetDateTime.format('h:mm A'),
        date: targetDateTime.format('ddd, MMM D, YYYY'),
        zone: targetZone,
        abbr: targetDateTime.format('z'),
        offset: targetDateTime.format('Z')
      },
      diff: targetDateTime.utcOffset() - sourceDateTime.utcOffset()
    });
  };

  // Auto-convert when inputs change
  useEffect(() => {
    handleConvert();
  }, [date, time, sourceZone, targetZone]);

  const handleSwap = () => {
    setSourceZone(targetZone);
    setTargetZone(sourceZone);
  };

  const formatOffset = (diffMinutes) => {
    const hours = Math.floor(Math.abs(diffMinutes) / 60);
    const mins = Math.abs(diffMinutes) % 60;
    const sign = diffMinutes >= 0 ? '+' : '-';
    return `${sign}${hours}h ${mins > 0 ? mins + 'm' : ''}`;
  };

  const faqData = [
    {
      question: "How do I handle Daylight Saving Time?",
      answer: "Our converter automatically handles Daylight Saving Time (DST) rules for all supported time zones. Just select the date, and we'll apply the correct offset."
    },
    {
      question: "What is UTC?",
      answer: "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time. It is effectively a successor to Greenwich Mean Time (GMT)."
    }
  ];

  const schemaData = {
    name: "Time Zone Converter",
    description: "Convert time between different time zones with automatic DST adjustment.",
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
        title="Time Zone Converter - Convert Time Between Zones | DailyTools"
        description="Easily convert times between any two time zones. Accurate adjustments for Daylight Saving Time. Meeting planner and travel utility."
        keywords="timezone converter, time zone map, convert time, pst to est, utc conversion"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Time Zone Converter</h1>
            <p className="tool-description">
              Convert times instantly between time zones. Perfect for scheduling international meetings or planning travel.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <div className="tool-grid-2-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'start' }}>

                {/* Source Column */}
                <div className="zone-column">
                  <h3><FontAwesomeIcon icon={faGlobe} /> From</h3>
                  <div className="input-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Time Zone</label>
                    <select value={sourceZone} onChange={(e) => setSourceZone(e.target.value)}>
                      <optgroup label="Common">
                        {commonTimezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                      </optgroup>
                      <optgroup label="All">
                        {allTimezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="swap-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <button onClick={handleSwap} className="btn secondary" title="Swap Timezones" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}>
                    <FontAwesomeIcon icon={faExchangeAlt} />
                  </button>
                </div>

                {/* Target Column */}
                <div className="zone-column">
                  <h3><FontAwesomeIcon icon={faGlobe} /> To</h3>
                  <div className="input-group">
                    <label>Time Zone</label>
                    <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)}>
                      <optgroup label="Common">
                        {commonTimezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                      </optgroup>
                      <optgroup label="All">
                        {allTimezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                      </optgroup>
                    </select>
                  </div>

                  {result && (
                    <div className="result-preview" style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '5px' }}>
                        {result.target.time}
                      </div>
                      <div style={{ color: 'var(--text-main)' }}>{result.target.date}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                        {result.target.abbr} ({result.target.offset})
                      </div>
                      <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-highlight)' }}>
                        Difference: {formatOffset(result.diff)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Understanding Time Zones</h2>
              <p>
                The world is divided into time zones to facilitate standard time keeping.
                Each time zone is approximately 15 degrees of longitude wide.
                Most time zones deviate from Coordinated Universal Time (UTC) by a whole number of hours (UTC-12 to UTC+14),
                but a few zones are offset by 30 or 45 minutes (e.g., India Standard Time is UTC+05:30).
              </p>
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
              <li style={{ marginBottom: '10px' }}><Link href="/date-difference">Date Difference</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
