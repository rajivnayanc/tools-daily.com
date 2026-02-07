import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGlobe, faSearch, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

const initialCities = [
  { name: 'New York', timezone: 'America/New_York', country: 'USA' },
  { name: 'London', timezone: 'Europe/London', country: 'UK' },
  { name: 'Paris', timezone: 'Europe/Paris', country: 'France' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
  { name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
  { name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
  { name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: 'China' },
  { name: 'Berlin', timezone: 'Europe/Berlin', country: 'Germany' },
  { name: 'Moscow', timezone: 'Europe/Moscow', country: 'Russia' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India' },
];

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(moment());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCities = initialCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDayOrNight = (timezone) => {
    const hour = parseInt(currentTime.tz(timezone).format('H'));
    return hour >= 6 && hour < 18 ? 'day' : 'night';
  };

  const faqData = [
    {
      question: "Why do some cities have the same time?",
      answer: "Cities within the same longitudinal range often share the same Time Zone. For example, many European countries use Central European Time (CET)."
    },
    {
      question: "Does this account for Daylight Saving Time (DST)?",
      answer: "Yes, this tool uses the Moment Timezone library which automatically adjusts for Daylight Saving Time rules for each specific location."
    }
  ];

  const schemaData = {
    name: "World Clock",
    description: "Current local time in major cities around the world.",
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
        title="World Clock - Current Time Around the World | DailyTools"
        description="Check current local time in major cities worldwide. Real-time world clock map with Daylight Saving Time adjustments."
        keywords="world clock, current time, time zones, global time, utc time"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>World Clock</h1>
            <p className="tool-description">
              Track current local times in major cities across the globe.
              Plan meetings and calls effectively with our precise world clock.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">
              <div className="current-location-time" style={{ textAlign: 'center', marginBottom: '30px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Your Local Time</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'monospace' }}>
                  {currentTime.format('HH:mm:ss')}
                </div>
                <div style={{ fontSize: '1.2rem' }}>{currentTime.format('dddd, MMMM Do YYYY')}</div>
                <div style={{ marginTop: '5px', fontSize: '0.9rem', color: 'var(--text-highlight)' }}>
                  {currentTime.format('z Z')}
                </div>
              </div>

              <div className="search-bar" style={{ marginBottom: '20px', position: 'relative' }}>
                <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search city or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }}
                />
              </div>

              <div className="clock-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {filteredCities.map((city, index) => (
                  <div key={index} className="clock-card" style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '15px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s'
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
                      background: getDayOrNight(city.timezone) === 'day' ? 'var(--warning)' : 'var(--primary)'
                    }}></div>

                    <div style={{ marginLeft: '10px' }}>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{city.name}</h4>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{city.country}</div>

                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '5px' }}>
                        {currentTime.tz(city.timezone).format('HH:mm')}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {currentTime.tz(city.timezone).format('ddd, MMM D')}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-highlight)', marginTop: '5px' }}>
                        {currentTime.tz(city.timezone).format('z')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredCities.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No cities found.</div>
              )}
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/unix-timestamp">Unix Timestamp</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/date-difference">Date Difference</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/timezone-converter">Time Zone Converter</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
