import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Link from "next/link";

/**
 * Initialize Unix Timestamp Tool
 */
function initUnixTimestampTool() {
    // Elements
    const currentUnixTimeEl = document.getElementById('current-unix-time');
    const copyTimestampBtn = document.getElementById('copy-timestamp');
    const refreshTimestampBtn = document.getElementById('refresh-timestamp');
    const copyGmtDateBtn = document.getElementById('copy-gmt-date');
    const copyLocalDateBtn = document.getElementById('copy-local-date');

    const unixInputEl = document.getElementById('unix-input');
    const convertToDateBtn = document.getElementById('convert-to-date');

    const dateInputEl = document.getElementById('date-input');
    const convertToUnixBtn = document.getElementById('convert-to-unix');
    const unixFromDateEl = document.getElementById('unix-from-date');
    const unixMsFromDateEl = document.getElementById('unix-ms-from-date');
    const copyUnixResultBtn = document.getElementById('copy-unix-result');
    const copyUnixMsResultBtn = document.getElementById('copy-unix-ms-result');

    const timestampOperationInputEl = document.getElementById('timestamp-operation-input');
    const operationTypeEl = document.getElementById('operation-type');
    const operationValueEl = document.getElementById('operation-value');
    const operationUnitEl = document.getElementById('operation-unit');
    const calculateOperationBtn = document.getElementById('calculate-operation');

    // Initialize current timestamp
    updateCurrentTimestamp();
    const timestampInterval = setInterval(updateCurrentTimestamp, 1000);

    // Set default date input to current date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (dateInputEl) {
        dateInputEl.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // Event Listeners
    if (copyTimestampBtn) {
        copyTimestampBtn.addEventListener('click', function () {
            copyToClipboard(currentUnixTimeEl.textContent);
        });
    }

    if (copyGmtDateBtn) {
        copyGmtDateBtn.addEventListener('click', function () {
            const gmtDateEl = document.getElementById('current-gmt-date');
            if (gmtDateEl) {
                copyToClipboard(gmtDateEl.textContent);
            }
        });
    }

    if (copyLocalDateBtn) {
        copyLocalDateBtn.addEventListener('click', function () {
            const localDateEl = document.getElementById('current-local-date');
            if (localDateEl) {
                copyToClipboard(localDateEl.textContent);
            }
        });
    }

    if (refreshTimestampBtn) {
        refreshTimestampBtn.addEventListener('click', updateCurrentTimestamp);
    }

    if (convertToDateBtn) {
        convertToDateBtn.addEventListener('click', function () {
            const timestamp = parseInt(unixInputEl.value);
            if (isNaN(timestamp)) {
                showError(unixInputEl, 'Please enter a valid Unix timestamp');
                return;
            }

            convertUnixToDate(timestamp);

            // Update URL with the timestamp for bookmarking
            updateUrlWithTimestamp(timestamp);
        });
    }

    if (convertToUnixBtn) {
        convertToUnixBtn.addEventListener('click', function () {
            const dateValue = dateInputEl.value;
            if (!dateValue) {
                showError(dateInputEl, 'Please select a date and time');
                return;
            }

            convertDateToUnix(dateValue);
        });
    }

    if (copyUnixResultBtn) {
        copyUnixResultBtn.addEventListener('click', function () {
            copyToClipboard(unixFromDateEl.textContent);
        });
    }

    if (copyUnixMsResultBtn) {
        copyUnixMsResultBtn.addEventListener('click', function () {
            copyToClipboard(unixMsFromDateEl.textContent);
        });
    }

    if (calculateOperationBtn) {
        calculateOperationBtn.addEventListener('click', function () {
            const timestamp = parseInt(timestampOperationInputEl.value);
            if (isNaN(timestamp)) {
                showError(timestampOperationInputEl, 'Please enter a valid Unix timestamp');
                return;
            }

            const value = parseInt(operationValueEl.value);
            if (isNaN(value)) {
                showError(operationValueEl, 'Please enter a valid value');
                return;
            }

            performTimestampOperation(timestamp, operationTypeEl.value, value, operationUnitEl.value);
        });
    }

    // Input validation
    if (unixInputEl) {
        unixInputEl.addEventListener('input', function () {
            this.classList.remove('error');
        });
    }

    if (dateInputEl) {
        dateInputEl.addEventListener('input', function () {
            this.classList.remove('error');
        });
    }

    if (timestampOperationInputEl) {
        timestampOperationInputEl.addEventListener('input', function () {
            this.classList.remove('error');
        });
    }

    if (operationValueEl) {
        operationValueEl.addEventListener('input', function () {
            this.classList.remove('error');
        });
    }

    // Use current timestamp for operation
    if (currentUnixTimeEl) {
        currentUnixTimeEl.addEventListener('click', function () {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (timestampOperationInputEl) {
                timestampOperationInputEl.value = currentTimestamp;
            }
            if (unixInputEl) {
                unixInputEl.value = currentTimestamp;
            }
            showToast('Current timestamp copied to input fields');
        });
    }

    // Check for timestamp in URL and auto-convert if found
    checkUrlForTimestamp();
}

/**
 * Initialize popular timestamps section
 */
function initPopularTimestamps() {
    const timestampLinks = document.querySelectorAll('.timestamp-link');

    timestampLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const timestamp = parseInt(this.getAttribute('data-timestamp'));

            // Fill the input field
            const unixInputEl = document.getElementById('unix-input');
            if (unixInputEl) {
                unixInputEl.value = timestamp;

                // Trigger conversion
                const convertToDateBtn = document.getElementById('convert-to-date');
                if (convertToDateBtn) {
                    convertToDateBtn.click();
                }

                // Scroll to the tool section
                const toolSection = document.getElementById('unix-timestamp-tool');
                if (toolSection) {
                    toolSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Update the current Unix timestamp display
 */
function updateCurrentTimestamp() {
    const currentUnixTimeEl = document.getElementById('current-unix-time');
    const currentGmtDateEl = document.getElementById('current-gmt-date');
    const currentLocalDateEl = document.getElementById('current-local-date');

    if (currentUnixTimeEl) {
        const now = Math.floor(Date.now() / 1000);
        const date = new Date(now * 1000);

        // Update timestamp
        currentUnixTimeEl.textContent = now;

        // Update GMT/UTC date
        if (currentGmtDateEl) {
            currentGmtDateEl.textContent = date.toUTCString();
        }

        // Update local date
        if (currentLocalDateEl) {
            currentLocalDateEl.textContent = date.toString();
        }
    }
}

/**
 * Convert Unix timestamp to human-readable date
 * @param {number} timestamp - Unix timestamp in seconds
 */
function convertUnixToDate(timestamp) {
    const date = new Date(timestamp * 1000);

    // UTC date
    const utcString = date.toUTCString();
    const utcDateEl = document.getElementById('utc-date');
    if (utcDateEl) {
        utcDateEl.textContent = utcString;
    }

    // Local date
    const localString = date.toString();
    const localDateEl = document.getElementById('local-date');
    if (localDateEl) {
        localDateEl.textContent = localString;
    }

    // Relative time
    const relativeTime = getRelativeTimeString(timestamp * 1000);
    const relativeDateEl = document.getElementById('relative-date');
    if (relativeDateEl) {
        relativeDateEl.textContent = relativeTime;
    }

    // Update page title with the timestamp info for better SEO
    document.title = `Unix Timestamp ${timestamp} - ${utcString} | DailyTools`;
}

/**
 * Convert date to Unix timestamp
 * @param {string} dateString - Date string from datetime-local input
 */
function convertDateToUnix(dateString) {
    const date = new Date(dateString);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const unixTimestampMs = date.getTime();

    const unixFromDateEl = document.getElementById('unix-from-date');
    if (unixFromDateEl) {
        unixFromDateEl.textContent = unixTimestamp;
    }

    const unixMsFromDateEl = document.getElementById('unix-ms-from-date');
    if (unixMsFromDateEl) {
        unixMsFromDateEl.textContent = unixTimestampMs;
    }

    // Update URL with the timestamp for bookmarking
    updateUrlWithTimestamp(unixTimestamp);
}

/**
 * Perform timestamp operation (add/subtract time)
 * @param {number} timestamp - Base Unix timestamp
 * @param {string} operation - 'add' or 'subtract'
 * @param {number} value - Amount to add/subtract
 * @param {string} unit - Time unit (seconds, minutes, hours, etc.)
 */
function performTimestampOperation(timestamp, operation, value, unit) {
    const date = new Date(timestamp * 1000);

    // Convert value to milliseconds based on unit
    let milliseconds = 0;
    switch (unit) {
        case 'seconds':
            milliseconds = value * 1000;
            break;
        case 'minutes':
            milliseconds = value * 60 * 1000;
            break;
        case 'hours':
            milliseconds = value * 60 * 60 * 1000;
            break;
        case 'days':
            milliseconds = value * 24 * 60 * 60 * 1000;
            break;
        case 'weeks':
            milliseconds = value * 7 * 24 * 60 * 60 * 1000;
            break;
        case 'months':
            // Approximate - using 30 days per month
            const newDate = new Date(date);
            if (operation === 'add') {
                newDate.setMonth(date.getMonth() + value);
            } else {
                newDate.setMonth(date.getMonth() - value);
            }
            const resultTimestamp = Math.floor(newDate.getTime() / 1000);

            const operationTimestampEl = document.getElementById('operation-timestamp');
            if (operationTimestampEl) {
                operationTimestampEl.textContent = resultTimestamp;
            }

            const operationDateEl = document.getElementById('operation-date');
            if (operationDateEl) {
                operationDateEl.textContent = newDate.toUTCString();
            }
            return;
        case 'years':
            // Using 365 days per year
            const yearDate = new Date(date);
            if (operation === 'add') {
                yearDate.setFullYear(date.getFullYear() + value);
            } else {
                yearDate.setFullYear(date.getFullYear() - value);
            }
            const yearTimestamp = Math.floor(yearDate.getTime() / 1000);

            const yearOperationTimestampEl = document.getElementById('operation-timestamp');
            if (yearOperationTimestampEl) {
                yearOperationTimestampEl.textContent = yearTimestamp;
            }

            const yearOperationDateEl = document.getElementById('operation-date');
            if (yearOperationDateEl) {
                yearOperationDateEl.textContent = yearDate.toUTCString();
            }
            return;
    }

    // Perform operation
    let newTimestamp;
    if (operation === 'add') {
        newTimestamp = timestamp + (milliseconds / 1000);
    } else {
        newTimestamp = timestamp - (milliseconds / 1000);
    }

    const newDate = new Date(newTimestamp * 1000);

    const operationTimestampEl = document.getElementById('operation-timestamp');
    if (operationTimestampEl) {
        operationTimestampEl.textContent = Math.floor(newTimestamp);
    }

    const operationDateEl = document.getElementById('operation-date');
    if (operationDateEl) {
        operationDateEl.textContent = newDate.toUTCString();
    }
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param {number} timestamp - Timestamp in milliseconds
 * @return {string} Relative time string
 */
function getRelativeTimeString(timestamp) {
    const now = Date.now();
    const diffMs = timestamp - now;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffSec < 0) {
        // Past
        if (diffSec > -60) return `${Math.abs(diffSec)} seconds ago`;
        if (diffMin > -60) return `${Math.abs(diffMin)} minutes ago`;
        if (diffHour > -24) return `${Math.abs(diffHour)} hours ago`;
        if (diffDay > -30) return `${Math.abs(diffDay)} days ago`;

        const diffMonth = Math.round(diffDay / 30);
        if (diffMonth > -12) return `${Math.abs(diffMonth)} months ago`;

        const diffYear = Math.round(diffDay / 365);
        return `${Math.abs(diffYear)} years ago`;
    } else {
        // Future
        if (diffSec < 60) return `in ${diffSec} seconds`;
        if (diffMin < 60) return `in ${diffMin} minutes`;
        if (diffHour < 24) return `in ${diffHour} hours`;
        if (diffDay < 30) return `in ${diffDay} days`;

        const diffMonth = Math.round(diffDay / 30);
        if (diffMonth < 12) return `in ${diffMonth} months`;

        const diffYear = Math.round(diffDay / 365);
        return `in ${diffYear} years`;
    }
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showToast('Copied to clipboard!');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
            showToast('Failed to copy to clipboard', 'error');

            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showToast('Copied to clipboard!');
                } else {
                    showToast('Failed to copy to clipboard', 'error');
                }
            } catch (err) {
                console.error('Fallback: Could not copy text: ', err);
                showToast('Failed to copy to clipboard', 'error');
            }

            document.body.removeChild(textArea);
        });
}

/**
 * Show error on input element
 * @param {HTMLElement} element - Input element
 * @param {string} message - Error message
 */
function showError(element, message) {
    element.classList.add('error');
    showToast(message, 'error');

    // Set focus to the element with error
    element.focus();

    // Add aria-invalid attribute for screen readers
    element.setAttribute('aria-invalid', 'true');

    // Remove aria-invalid when input changes
    element.addEventListener('input', function onInput() {
        element.removeAttribute('aria-invalid');
        element.removeEventListener('input', onInput);
    }, { once: true });
}

let toastContainer;
/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error)
 */
function showToast(message, type = 'success') {
    // Check if toast container exists, if not create it
    if (!document.querySelector('.toast-container')) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.setAttribute('role', 'status');
        toastContainer.setAttribute('aria-live', 'polite');
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Add toast to container
    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/**
 * Update URL with timestamp for bookmarking and sharing
 * @param {number} timestamp - Unix timestamp
 */
function updateUrlWithTimestamp(timestamp) {
    if (!timestamp) return;

    const url = new URL(window.location.href);
    url.searchParams.set('timestamp', timestamp);

    // Update URL without reloading the page
    window.history.replaceState({}, '', url.toString());
}

/**
 * Check URL for timestamp parameter and auto-convert if found
 */
function checkUrlForTimestamp() {
    const urlParams = new URLSearchParams(window.location.search);
    const timestamp = urlParams.get('timestamp');

    if (timestamp) {
        const parsedTimestamp = parseInt(timestamp);
        if (!isNaN(parsedTimestamp)) {
            // Fill the input field
            const unixInputEl = document.getElementById('unix-input');
            if (unixInputEl) {
                unixInputEl.value = parsedTimestamp;

                // Trigger conversion
                const convertToDateBtn = document.getElementById('convert-to-date');
                if (convertToDateBtn) {
                    convertToDateBtn.click();
                }
            }
        }
    }
}

const init = () => {
    initUnixTimestampTool();
    initPopularTimestamps();
}

const Page = () => {
    useEffect(() => {
        init();
    }, [])
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Unix Timestamp Converter & Tools | DailyTools</title>
                <meta name="description" content="Free online Unix timestamp converter tool. Convert between Unix timestamps and human-readable dates, perform timestamp calculations, and more. No ads, no signup required." />
                <meta name="keywords" content="unix timestamp, timestamp converter, epoch converter, unix time, timestamp calculator, online tools" />
                <meta name="author" content="DailyTools" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Unix Timestamp Converter & Tools | DailyTools" />
                <meta property="og:description" content="Free online Unix timestamp converter tool. Convert between Unix timestamps and human-readable dates, perform timestamp calculations, and more." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tools-daily.com/unix-timestamp" />
                <meta property="og:image" content="https://tools-daily.com/images/unix-timestamp-tool.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Unix Timestamp Converter & Tools | DailyTools" />
                <meta name="twitter:description" content="Free online Unix timestamp converter tool. Convert between Unix timestamps and human-readable dates, perform timestamp calculations, and more." />
                <link rel="canonical" href="https://tools-daily.com/unix-timestamp" />
            </Head>
            <main>
                <div className="container">
                    {/* <!-- Ad Space: Top Banner --> */}
                    {/* <div className="ad-container ad-horizontal">
                        <div className="ad-placeholder">
                            <p>Advertisement</p>
                            <p className="ad-size">728x90</p>
                        </div>
                    </div> */}

                    <div className="content-wrapper">
                        <div className="main-content">
                            <article className="tool-section" id="unix-timestamp-tool">
                                <h2>Unix Timestamp Converter</h2>
                                <p className="tool-description">
                                    Convert between Unix timestamps and human-readable dates. Unix time is the number of seconds that have elapsed since January 1, 1970 (UTC), not counting leap seconds.
                                </p>

                                <div className="tool-container">
                                    <section className="tool-panel">
                                        <h3>Current Unix Timestamp</h3>
                                        <div className="current-timestamp">
                                            <span id="current-unix-time">1234567890</span>
                                            <button id="copy-timestamp" className="btn-copy" title="Copy to clipboard" aria-label="Copy current timestamp to clipboard">
                                                <i aria-hidden="true"><FontAwesomeIcon icon={faCopy} /></i>
                                            </button>
                                            <button id="refresh-timestamp" className="btn-refresh" title="Refresh" aria-label="Refresh current timestamp">
                                                <i aria-hidden="true"><FontAwesomeIcon icon={faSyncAlt} /></i>
                                            </button>
                                        </div>
                                        <p className="timestamp-info">Updates automatically</p>

                                        <div className="current-date-info">
                                            <div className="result-item">
                                                <span className="result-label">UTC:</span>
                                                <span className="result-value" id="current-gmt-date">-</span>
                                                <button id="copy-gmt-date" className="btn-copy" title="Copy to clipboard" aria-label="Copy UGC date to clipboard">
                                                    <i aria-hidden="true"><FontAwesomeIcon icon={faCopy} /></i>
                                                </button>
                                            </div>
                                            <div className="result-item">
                                                <span className="result-label">Local:</span>
                                                <span className="result-value" id="current-local-date">-</span>
                                                <button id="copy-local-date" className="btn-copy" title="Copy to clipboard" aria-label="Copy local date to clipboard">
                                                    <i aria-hidden="true"><FontAwesomeIcon icon={faCopy} /></i>
                                                </button>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="tool-panel">
                                        <h3>Convert Unix Timestamp to Date</h3>
                                        <div className="input-group">
                                            <label htmlFor="unix-input" className="sr-only">Enter Unix timestamp</label>
                                            <input type="number" id="unix-input" placeholder="Enter Unix timestamp" aria-describedby="unix-input-help" />
                                            <button id="convert-to-date" className="btn">Convert</button>
                                        </div>
                                        <p id="unix-input-help" className="sr-only">Enter a Unix timestamp in seconds to convert to a human-readable date</p>
                                        <div className="result-container" id="date-result" aria-live="polite">
                                            <div className="result-item">
                                                <span className="result-label">UTC:</span>
                                                <span className="result-value" id="utc-date">-</span>
                                            </div>
                                            <div className="result-item">
                                                <span className="result-label">Local:</span>
                                                <span className="result-value" id="local-date">-</span>
                                            </div>
                                            <div className="result-item">
                                                <span className="result-label">Relative:</span>
                                                <span className="result-value" id="relative-date">-</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="tool-panel">
                                        <h3>Convert Date to Unix Timestamp</h3>
                                        <div className="input-group">
                                            <label htmlFor="date-input" className="sr-only">Select date and time</label>
                                            <input type="datetime-local" id="date-input" aria-describedby="date-input-help" />
                                            <button id="convert-to-unix" className="btn">Convert</button>
                                        </div>
                                        <p id="date-input-help" className="sr-only">Select a date and time to convert to Unix timestamp</p>
                                        <div className="result-container" id="unix-result" aria-live="polite">
                                            <div className="result-item">
                                                <span className="result-label">Unix Timestamp:</span>
                                                <span className="result-value" id="unix-from-date">-</span>
                                                <button id="copy-unix-result" className="btn-copy" title="Copy to clipboard" aria-label="Copy Unix timestamp to clipboard">
                                                    <i aria-hidden="true"><FontAwesomeIcon icon={faCopy} /></i>
                                                </button>
                                            </div>
                                            <div className="result-item">
                                                <span className="result-label">Milliseconds:</span>
                                                <span className="result-value" id="unix-ms-from-date">-</span>
                                                <button id="copy-unix-ms-result" className="btn-copy" title="Copy to clipboard" aria-label="Copy Unix timestamp in milliseconds to clipboard">
                                                    <i aria-hidden="true"><FontAwesomeIcon icon={faCopy} /></i>
                                                </button>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="tool-panel">
                                        <h3>Timestamp Operations</h3>
                                        <div className="input-group">
                                            <label htmlFor="timestamp-operation-input" className="sr-only">Enter Unix timestamp for operation</label>
                                            <input type="number" id="timestamp-operation-input" placeholder="Enter Unix timestamp" aria-describedby="timestamp-operation-help" />
                                            <label htmlFor="operation-type" className="sr-only">Select operation type</label>
                                            <select id="operation-type" aria-describedby="timestamp-operation-help">
                                                <option value="add">Add time</option>
                                                <option value="subtract">Subtract time</option>
                                            </select>
                                        </div>
                                        <p id="timestamp-operation-help" className="sr-only">Enter a Unix timestamp and select an operation to perform</p>
                                        <div className="input-group">
                                            <label htmlFor="operation-value" className="sr-only">Enter value for operation</label>
                                            <input type="number" id="operation-value" placeholder="Value" aria-describedby="operation-value-help" />
                                            <label htmlFor="operation-unit" className="sr-only">Select time unit</label>
                                            <select id="operation-unit" aria-describedby="operation-value-help">
                                                <option value="seconds">Seconds</option>
                                                <option value="minutes">Minutes</option>
                                                <option value="hours">Hours</option>
                                                <option value="days">Days</option>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                                <option value="years">Years</option>
                                            </select>
                                            <button id="calculate-operation" className="btn">Calculate</button>
                                        </div>
                                        <p id="operation-value-help" className="sr-only">Enter a value and select a time unit for the operation</p>
                                        <div className="result-container" id="operation-result" aria-live="polite">
                                            <div className="result-item">
                                                <span className="result-label">Result Timestamp:</span>
                                                <span className="result-value" id="operation-timestamp">-</span>
                                            </div>
                                            <div className="result-item">
                                                <span className="result-label">Result Date (UTC):</span>
                                                <span className="result-value" id="operation-date">-</span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </article>

                            <section className="tool-info">
                                <h3>About Unix Timestamps</h3>
                                <p>
                                    A Unix timestamp (also known as Epoch time, POSIX time, or Unix time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds.
                                    It is widely used in computer systems and programming for representing dates and times in a standardized format.
                                </p>
                                <h4>Common Uses:</h4>
                                <ul>
                                    <li>Database record timestamps for tracking when records were created or modified</li>
                                    <li>File modification times in operating systems</li>
                                    <li>Session expiration times for web applications</li>
                                    <li>API request signatures and authentication tokens</li>
                                    <li>Scheduling tasks and events in software applications</li>
                                </ul>
                                <h4>Advantages:</h4>
                                <ul>
                                    <li>Compact representation of date and time as a single integer</li>
                                    <li>Easy to compare and calculate time differences</li>
                                    <li>Independent of time zones and daylight saving time</li>
                                    <li>Widely supported across programming languages and platforms</li>
                                    <li>Efficient for storage and processing in databases</li>
                                </ul>

                                <h4>Unix Timestamp Limitations</h4>
                                <p>
                                    The standard Unix timestamp is stored as a signed 32-bit integer, which will overflow on January 19, 2038 (known as the &quot;Year 2038 problem&quot;).
                                    Modern systems often use 64-bit integers for timestamps to avoid this limitation, extending the usable time range to billions of years.
                                </p>

                                <h4>Related Concepts</h4>
                                <p>
                                    <strong>Millisecond Timestamps:</strong> Some systems use milliseconds instead of seconds, resulting in timestamps that are 1000 times larger than standard Unix timestamps.
                                </p>
                                <p>
                                    <strong>ISO 8601:</strong> An international standard for representing dates and times as text strings, often used alongside Unix timestamps in APIs and data exchange.
                                </p>
                            </section>

                            <section className="faq-section">
                                <h3>Frequently Asked Questions</h3>

                                <div className="faq-item">
                                    <h4>What is a Unix timestamp?</h4>
                                    <p>A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds. It&apos;s a way to represent a specific point in time as a single number.</p>
                                </div>

                                <div className="faq-item">
                                    <h4>How do I convert a Unix timestamp to a readable date?</h4>
                                    <p>You can use our Unix Timestamp Converter tool above. Simply enter the timestamp in the &quot;Convert Unix Timestamp to Date&quot; section and click &quot;Convert&quot;. The tool will show you the date in UTC, your local time, and as a relative time.</p>
                                </div>

                                <div className="faq-item">
                                    <h4>What is the current Unix timestamp?</h4>
                                    <p>The current Unix timestamp is displayed in the &quot;Current Unix Timestamp&quot; section of our tool. It updates automatically every second.</p>
                                </div>

                                <div className="faq-item">
                                    <h4>Why do some systems use millisecond timestamps?</h4>
                                    <p>Millisecond timestamps provide more precision for applications that need to track events occurring within the same second. JavaScript&apos;s <code>Date.now()</code>, for example, returns the number of milliseconds since the Unix epoch.</p>
                                </div>

                                <div className="faq-item">
                                    <h4>What is the Year 2038 problem?</h4>
                                    <p>It refers to the time when 32-bit signed Unix timestamps (counting seconds) will overflow, potentially causing issues on older systems. Systems using 64-bit timestamps are not affected.</p>
                                </div>

                                <div className="faq-item">
                                    <h4>How can I get the Unix timestamp in different programming languages?</h4>
                                    <p>Here are examples in common programming languages:</p>
                                    <ul>
                                        <li><strong>JavaScript:</strong> <code>Math.floor(Date.now() / 1000)</code></li>
                                        <li><strong>PHP:</strong> <code>time()</code></li>
                                        <li><strong>Python:</strong> <code>import time; int(time.time())</code></li>
                                        <li><strong>Java:</strong> <code>System.currentTimeMillis() / 1000</code></li>
                                        <li><strong>Ruby:</strong> <code>Time.now.to_i</code></li>
                                    </ul>
                                </div>
                            </section>
                        </div>

                        <aside className="sidebar">
                            {/* <!-- Ad Space: Sidebar --> */}
                            {/* <div className="ad-container ad-vertical">
                                <div className="ad-placeholder">
                                    <p>Advertisement</p>
                                    <p className="ad-size">300x600</p>
                                </div>
                            </div> */}

                            <div className="related-tools">
                                <h3>Related Tools</h3>
                                <ul>
                                    <li><Link href="/date-difference">Date Difference Calculator</Link></li>
                                    <li><Link href="/world-clock">World Clock</Link></li>
                                    <li><Link href="/calendar-generator">Calendar Generator</Link></li>
                                    <li><Link href="/timezone-converter">Time Zone Converter</Link></li>
                                </ul>
                            </div>

                            <div className="popular-timestamps">
                                <h3>Popular Timestamps</h3>
                                <ul>
                                    <li><a href="#" className="timestamp-link" data-timestamp="0">0 - Unix Epoch (1970-01-01)</a></li>
                                    <li><a href="#" className="timestamp-link" data-timestamp="1000000000">1 Billion (2001-09-09)</a></li>
                                    <li><a href="#" className="timestamp-link" data-timestamp="1500000000">1.5 Billion (2017-07-14)</a></li>
                                    <li><a href="#" className="timestamp-link" data-timestamp="2147483647">2^31-1 (2038-01-19)</a></li>
                                </ul>
                            </div>

                            {/* <!-- Ad Space: Sidebar Small --> */}
                            {/* <div className="ad-container ad-square">
                                <div className="ad-placeholder">
                                    <p>Advertisement</p>
                                    <p className="ad-size">300x250</p>
                                </div>
                            </div> */}
                        </aside>
                    </div>

                    {/* <!-- Ad Space: Bottom Banner --> */}
                    {/* <div className="ad-container ad-horizontal">
                        <div className="ad-placeholder">
                            <p>Advertisement</p>
                            <p className="ad-size">728x90</p>
                        </div>
                    </div> */}
                </div>
            </main></>)
}

export default Page;