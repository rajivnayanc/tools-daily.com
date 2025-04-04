import Head from 'next/head';
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import styles from './WorldClock.module.css';
import SEO from '../../components/SEO';

const cities = [
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Dubai', timezone: 'Asia/Dubai' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'Rio de Janeiro', timezone: 'America/Rio_de_Janeiro' },
  { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
];
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
export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <SEO
        title="World Clock - DailyTools"
        description="Check the current time in cities around the world."
        keywords="world clock, time in different cities, current time around the world"
      />
      <main>
        <div className="container">
          <h1>World Clock</h1>
          <p>See the current time in major cities around the world.</p>

          <ul className={styles.clockList}>
            <li key="local" className={styles.clockItem}>
              <span className={styles.cityName}>Local Time:</span>
              <span className={styles.time}>
                {currentTime.format('MMMM D, YYYY h:mm:ss A (Z z)')}
              </span>
              <button
                className={styles.copyButton}
                onClick={() => {
                  navigator.clipboard.writeText(
                    currentTime.format('MMMM D, YYYY h:mm:ss A (Z z)')
                  );
                  showToast("Copied to clipboard");
                }}
              >
                Copy
              </button>
            </li>
            {cities.map((city) => (
              <li key={city.timezone} className={styles.clockItem}>
                <span className={styles.cityName}>{city.name}:</span>
                <span className={styles.time}>
                  {currentTime.tz(city.timezone).format('MMMM D, YYYY h:mm:ss A (Z z)')}
                </span>
                <button
                  className={styles.copyButton}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      currentTime.tz(city.timezone).format('MMMM D, YYYY h:mm:ss A (Z z)')
                    );
                    showToast("Copied to clipboard");
                  }}
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
