import Head from 'next/head';
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import styles from './WorldClock.module.css';

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
      <Head>
        <title>World Clock - DailyTools</title>
        <meta name="description" content="Check the current time in cities around the world." />
        <meta name="keywords" content="world clock, time in different cities, current time around the world" />
      </Head>
      <main>
        <div className="container">
          <h1>World Clock</h1>
          <p>See the current time in major cities around the world.</p>

          <ul className={styles.clockList}>
            {cities.map((city) => (
              <li key={city.timezone} className={styles.clockItem}>
                <span className={styles.cityName}>{city.name}:</span>
                <span className={styles.time}>
                  {currentTime.tz(city.timezone).format('h:mm:ss A')}
                </span>
                <span className={styles.timezone}>
                  ({currentTime.tz(city.timezone).format('z')})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
