import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faSyncAlt, faClock, faCalendarAlt, faCalculator } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function UnixTimestamp() {
    // Current Timestamp State
    const [currentUnix, setCurrentUnix] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Converter States
    const [unixInput, setUnixInput] = useState('');
    const [dateResult, setDateResult] = useState(null);

    const [dateInput, setDateInput] = useState('');
    const [unixResult, setUnixResult] = useState(null);

    // Initialize
    useEffect(() => {
        setCurrentUnix(Math.floor(Date.now() / 1000));
        const interval = setInterval(() => {
            if (!isPaused) {
                setCurrentUnix(Math.floor(Date.now() / 1000));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPaused]);

    // Helpers
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
        alert("Copied to clipboard!");
    };

    const getRelativeTime = (timestamp) => {
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
        const diff = timestamp - Math.floor(Date.now() / 1000);

        if (Math.abs(diff) < 60) return rtf.format(diff, 'seconds');
        if (Math.abs(diff) < 3600) return rtf.format(Math.floor(diff / 60), 'minutes');
        if (Math.abs(diff) < 86400) return rtf.format(Math.floor(diff / 3600), 'hours');
        return rtf.format(Math.floor(diff / 86400), 'days');
    };

    // Handlers
    const handleConvertUnix = () => {
        if (!unixInput) return;
        const ts = parseInt(unixInput);
        if (isNaN(ts)) return; // Add error handling

        // Detect format (sec/ms/ns) - simple heuristic
        let date;
        let type = 'Seconds';
        if (String(ts).length > 11) {
            date = new Date(ts); // ms
            type = 'Milliseconds';
        } else {
            date = new Date(ts * 1000); // seconds
        }

        setDateResult({
            utc: date.toUTCString(),
            local: date.toString(),
            relative: getRelativeTime(Math.floor(date.getTime() / 1000)),
            type
        });
    };

    const handleConvertDate = () => {
        if (!dateInput) return;
        const date = new Date(dateInput);
        setUnixResult({
            seconds: Math.floor(date.getTime() / 1000),
            ms: date.getTime()
        });
    };

    // SEO Data
    const faqData = [
        {
            question: "What is a Unix Timestamp?",
            answer: "A Unix timestamp represents the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds."
        },
        {
            question: "Why does it start from 1970?",
            answer: "January 1, 1970, was arbitrarily chosen as the 'epoch' for Unix systems. It serves as a standard reference point for time calculation in computing."
        },
        {
            question: "When will the Unix timestamp overflow?",
            answer: "On 32-bit systems, the timestamp will overflow on January 19, 2038 (the Year 2038 problem). 64-bit systems will not have this issue for billions of years."
        }
    ];

    const schemaData = {
        name: "Unix Timestamp Converter",
        description: "Convert Unix timestamps to human-readable dates and vice versa. Free online tool for developers.",
        applicationCategory: "DeveloperTool",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
        }
    };

    const currentDate = new Date(currentUnix * 1000);

    return (
        <>
            <SEO
                title="Unix Timestamp Converter - Epoch Time Tool | DailyTools"
                description="Convert Unix timestamps to human-readable dates and vice-versa. Real-time epoch clock and timezone utilities for developers."
                keywords="unix timestamp, epoch converter, unix time, timestamp to date, date to timestamp"
            />
            <SchemaOrg type="SoftwareApplication" data={schemaData} />

            <main className="tool-dashboard container">
                <div className="tool-main">
                    <article className="tool-section">
                        <h1>Unix Timestamp Converter</h1>
                        <p className="tool-description">
                            The current Unix epoch time is <strong>{currentUnix}</strong>.
                            Use this tool to convert between epoch timestamps and human-readable dates.
                        </p>

                        <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

                        {/* Current Timestamp Card */}
                        <div className="tool-panel text-center">
                            <h3><FontAwesomeIcon icon={faClock} style={{ color: 'var(--primary)' }} /> Current Unix Time</h3>
                            <div className="current-timestamp" style={{ justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>
                                {currentUnix}
                            </div>
                            <div className="controls" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <button onClick={() => setIsPaused(!isPaused)} className="btn secondary">
                                    {isPaused ? 'Resume' : 'Pause'}
                                </button>
                                <button onClick={() => copyToClipboard(currentUnix)} className="btn">
                                    <FontAwesomeIcon icon={faCopy} /> Copy
                                </button>
                            </div>
                            <div className="result-container" style={{ marginTop: '20px' }}>
                                <div className="result-item">
                                    <span className="result-label">UTC:</span>
                                    <span className="result-value">{currentDate.toUTCString()}</span>
                                </div>
                                <div className="result-item">
                                    <span className="result-label">Local:</span>
                                    <span className="result-value">{currentDate.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="tool-grid-2-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

                            {/* Unix to Date */}
                            <div className="tool-panel">
                                <h3>timestamp <FontAwesomeIcon icon={faSyncAlt} /> date</h3>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        placeholder="Enter timestamp..."
                                        value={unixInput}
                                        onChange={(e) => setUnixInput(e.target.value)}
                                    />
                                </div>
                                <button onClick={handleConvertUnix} className="btn w-full">Convert</button>

                                {dateResult && (
                                    <div className="result-container" style={{ marginTop: '15px' }}>
                                        <div className="result-item">
                                            <span className="result-label">GMT:</span>
                                            <span className="result-value">{dateResult.utc}</span>
                                        </div>
                                        <div className="result-item">
                                            <span className="result-label">Local:</span>
                                            <span className="result-value">{dateResult.local}</span>
                                        </div>
                                        <div className="result-item">
                                            <span className="result-label">Relative:</span>
                                            <span className="result-value">{dateResult.relative}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Date to Unix */}
                            <div className="tool-panel">
                                <h3>date <FontAwesomeIcon icon={faSyncAlt} /> timestamp</h3>
                                <div className="input-group">
                                    <input
                                        type="datetime-local"
                                        value={dateInput}
                                        onChange={(e) => setDateInput(e.target.value)}
                                    />
                                </div>
                                <button onClick={handleConvertDate} className="btn w-full">Convert</button>

                                {unixResult && (
                                    <div className="result-container" style={{ marginTop: '15px' }}>
                                        <div className="result-item">
                                            <span className="result-label">Seconds:</span>
                                            <span className="result-value">{unixResult.seconds}</span>
                                            <button onClick={() => copyToClipboard(unixResult.seconds)} className="btn-copy">
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                        </div>
                                        <div className="result-item">
                                            <span className="result-label">Milliseconds:</span>
                                            <span className="result-value">{unixResult.ms}</span>
                                            <button onClick={() => copyToClipboard(unixResult.ms)} className="btn-copy">
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="tool-info">
                            <h2>Everything about Unix Timestamps</h2>
                            <p>
                                A Unix timestamp is a way to track time as a running total of seconds.
                                This count starts at the Unix Epoch on January 1st, 1970 at UTC.
                                Therefore, the Unix timestamp is merely the number of seconds between a particular date and the Unix Epoch.
                            </p>
                            <h3>Common programming languages:</h3>
                            <ul style={{ marginTop: '10px' }}>
                                <li><strong>JavaScript:</strong> <code>Math.floor(Date.now() / 1000)</code></li>
                                <li><strong>Python:</strong> <code>import time; time.time()</code></li>
                                <li><strong>PHP:</strong> <code>time()</code></li>
                                <li><strong>Java:</strong> <code>System.currentTimeMillis() / 1000</code></li>
                            </ul>
                        </div>

                        <FAQ questions={faqData} />
                    </article>
                </div>

                <aside className="tool-sidebar">
                    <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
                        <h3>Related Tools</h3>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '10px' }}><Link href="/date-difference">Date Difference</Link></li>
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
