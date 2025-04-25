import Head from 'next/head';
import { useState } from 'react';
import moment from 'moment';
import styles from './DateDifference.module.css';
import SEO from '../../components/SEO';

export default function DateDifference() {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [difference, setDifference] = useState('');

  const calculateDifference = () => {
    const start = moment(startDate);
    const end = moment(endDate);

    if (!start.isValid() || !end.isValid()) {
      setDifference('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    const diffInDays = end.diff(start, 'days');
    const diffInMonths = end.diff(start, 'months');
    const diffInYears = end.diff(start, 'years');

    setDifference(
      `Difference: ${diffInDays} days / ${diffInMonths} months / ${diffInYears} years`
    );
  };

  return (
    <>
      <SEO
        title="Date Difference Calculator - DailyTools"
        description="Calculate the difference between two dates in days, months, and years."
        keywords="date difference, date calculator, days between dates, months between dates, years between dates"
      />
      <main>
        <div className="container">
          <h1>Date Difference Calculator</h1>
          <p>Find out the exact duration between two specific dates. This tool calculates the difference in terms of total days, months, and years, which can be useful for project planning, tracking milestones, calculating ages, or determining time spans.</p>
          <p>Calculating the difference between dates has numerous applications across various domains. From determining the duration of a project to calculating the age of a person or tracking the time elapsed since a significant event, this calculation provides valuable insights into the passage of time.</p>
          <p><strong>How to use:</strong> Select a "Start Date" and an "End Date" using the date pickers below. Click the "Calculate Difference" button to see the duration between the selected dates displayed in days, months, and years.</p>

          <div className={styles.dateInputContainer}>
            <label htmlFor="startDate" className={styles.label}>Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>

          <div className={styles.dateInputContainer}>
            <label htmlFor="endDate" className={styles.label}>End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>

          <button onClick={calculateDifference} className={styles.calculateButton}>
            Calculate Difference
          </button>

          {difference && <p className={styles.result}>{difference}</p>}
        </div>
      </main>
    </>
  );
}
