import Head from 'next/head';
import { useState, useMemo } from 'react';
import moment from 'moment-timezone';
import styles from './TimezoneConverter.module.css';

const timezones = moment.tz.names();

export default function TimezoneConverter() {
  const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DDTHH:mm'));
  const [fromTimezone, setFromTimezone] = useState(moment.tz.guess()); // User's timezone
  const [toTimezone, setToTimezone] = useState('America/New_York'); // Default timezone
  const [convertedTime, setConvertedTime] = useState('');

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleFromTimezoneChange = (event) => {
    setFromTimezone(event.target.value);
  };

  const handleToTimezoneChange = (event) => {
    setToTimezone(event.target.value);
  };

  const convertTime = () => {
    const time = moment.tz(dateTime, fromTimezone);

    if (!time.isValid()) {
      setConvertedTime('Invalid date or time format.');
      return;
    }

    const converted = time.tz(toTimezone).format('YYYY-MM-DD HH:mm:ss z');
    setConvertedTime(converted);
  };

  const timezoneOptions = useMemo(() => {
    return timezones.map((timezone) => (
      <option key={timezone} value={timezone}>
        {timezone}
      </option>
    ));
  }, []);

  return (
    <>
      <Head>
        <title>Time Zone Converter - DailyTools</title>
        <meta name="description" content="Convert time between different time zones with ease." />
        <meta name="keywords" content="time zone converter, time converter, convert time zones, time zone calculator" />
      </Head>
      <main>
        <div className="container">
          <h1>Time Zone Converter</h1>
          <p>Convert times from one time zone to another.</p>

          <div className={styles.inputGroup}>
            <label htmlFor="dateTime" className={styles.label}>Date and Time:</label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={handleDateTimeChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fromTimezone" className={styles.label}>From Time Zone:</label>
            <select
              id="fromTimezone"
              value={fromTimezone}
              onChange={handleFromTimezoneChange}
              className={styles.select}
            >
              {timezoneOptions}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="toTimezone" className={styles.label}>To Time Zone:</label>
            <select
              id="toTimezone"
              value={toTimezone}
              onChange={handleToTimezoneChange}
              className={styles.select}
            >
              {timezoneOptions}
            </select>
          </div>

          <button onClick={convertTime} className={styles.convertButton}>
            Convert Time
          </button>

          {convertedTime && (
            <div className={styles.result}>
              Converted Time:
              <span className={styles.convertedTime}>{convertedTime}</span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
