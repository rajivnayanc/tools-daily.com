import Head from 'next/head';
import { useState, useMemo, useCallback } from 'react';
import styles from './RegexTester.module.css';
import SEO from '../../components/SEO';

export default function RegexTester() {
  const [regexString, setRegexString] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('The quick brown fox jumps over the lazy dog.');
  const [regexError, setRegexError] = useState('');
  const [matchResults, setMatchResults] = useState([]);
  const [highlightedText, setHighlightedText] = useState(testString);

  const handleRegexChange = (event) => {
    setRegexString(event.target.value);
    setRegexError('');
    updateMatches(event.target.value, flags, testString);
  };

  const handleFlagsChange = (event) => {
    const newFlags = event.target.value.replace(/[^gimyus]/g, '');
    setFlags(newFlags);
    setRegexError('');
    updateMatches(regexString, newFlags, testString);
  };

  const handleTestStringChange = (event) => {
    setTestString(event.target.value);
    updateMatches(regexString, flags, event.target.value);
  };

  const updateMatches = useCallback((currentRegex, currentFlags, currentTestString) => {
    if (!currentRegex) {
      setMatchResults([]);
      setHighlightedText(currentTestString);
      setRegexError('');
      return;
    }

    try {
      const regex = new RegExp(currentRegex, currentFlags);
      setRegexError('');

      let matches = [];
      let match;
      let highlighted = currentTestString;
      let lastIndex = 0;
      const parts = [];

      if (currentFlags.includes('g')) {
        while ((match = regex.exec(currentTestString)) !== null) {
          matches.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.slice(1),
          });

          if (match.index > lastIndex) {
            parts.push(currentTestString.substring(lastIndex, match.index));
          }
          parts.push(<mark key={`match-${match.index}`} className={styles.highlight}>{match[0]}</mark>);
          lastIndex = regex.lastIndex;

           if (match[0].length === 0) {
             regex.lastIndex++;
           }
        }
         if (lastIndex < currentTestString.length) {
            parts.push(currentTestString.substring(lastIndex));
         }
         setHighlightedText(parts.length > 0 ? <>{parts}</> : currentTestString);

      } else {
        match = currentTestString.match(regex);
        if (match) {
          matches.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.slice(1),
          });
           parts.push(currentTestString.substring(0, match.index));
           parts.push(<mark key={`match-${match.index}`} className={styles.highlight}>{match[0]}</mark>);
           parts.push(currentTestString.substring(match.index + match[0].length));
           setHighlightedText(<>{parts}</>);
        } else {
           setHighlightedText(currentTestString);
        }
      }

      setMatchResults(matches);

    } catch (error) {
      setRegexError(`Invalid Regex: ${error.message}`);
      setMatchResults([]);
      setHighlightedText(currentTestString);
    }
  }, []);

  useState(() => {
      updateMatches(regexString, flags, testString);
  }, [updateMatches]);


  return (
    <>
      <SEO
        title="Regex Tester - DailyTools"
        description="Test and debug regular expressions (RegExp) online in real-time. Check matches, capture groups, and flags."
        keywords="regex tester, regular expression tester, regex debugger, javascript regex, online regex tool, regexp tester"
      />
      <main>
        <div className="container">
          <h1>Regex Tester</h1>
          <p>Regular expressions (regex) are powerful patterns used to match character combinations in strings. They are used in programming languages, text editors, and other tools to search, replace, and validate text.</p>
          <p>Regular expressions are widely used in software development, data analysis, and network security. They enable developers to perform complex text manipulations, validate user input, and extract valuable information from large datasets. Whether you're building a web application, analyzing log files, or securing a network, regular expressions provide a versatile and efficient way to work with text.</p>
          <p>This tool allows you to test your regular expressions against a test string and see the matches in real-time.</p>
          <p><strong>How to use:</strong> Enter your regular expression pattern in the top input field, and any flags you want to use (like 'g' for global, 'i' for case-insensitive) in the flags field. Then, enter the text you want to test against in the "Test String" area. The highlighted matches and a list of matches will be displayed below.</p>

          <div className={styles.regexInputContainer}>
            <span className={styles.regexDelimiter}>/</span>
            <input
              type="text"
              value={regexString}
              onChange={handleRegexChange}
              className={styles.regexInput}
              placeholder="Enter your regex pattern here"
              aria-label="Regular Expression Pattern"
            />
            <span className={styles.regexDelimiter}>/</span>
            <input
              type="text"
              value={flags}
              onChange={handleFlagsChange}
              className={styles.flagsInput}
              placeholder="flags (e.g., gi)"
              aria-label="Regular Expression Flags"
              maxLength="6"
            />
          </div>

          {regexError && <p className={styles.error}>{regexError}</p>}

          <div className={styles.testStringContainer}>
            <label htmlFor="testString" className={styles.label}>Test String:</label>
            <textarea
              id="testString"
              value={testString}
              onChange={handleTestStringChange}
              className={styles.testTextarea}
              rows="8"
              aria-label="Test String Input"
              placeholder="Enter the text to test your regex against..."
            />
          </div>

          <div className={styles.resultsContainer}>
            <h2>Results</h2>
            <div className={styles.highlightedTextContainer}>
              <h3>Highlighted Matches:</h3>
              <pre className={styles.highlightedText}>{highlightedText}</pre>
            </div>

            <div className={styles.matchListContainer}>
              <h3>Match List ({matchResults.length} found):</h3>
              {matchResults.length > 0 ? (
                <ul className={styles.matchList}>
                  {matchResults.map((match, index) => (
                    <li key={index} className={styles.matchItem}>
                      <span className={styles.matchIndex}>Match {index + 1}:</span>
                      <code className={styles.matchCode}>{match.fullMatch || '(empty match)'}</code>
                      <span className={styles.matchPosition}>(at index {match.index})</span>
                      {match.groups && match.groups.length > 0 && (
                        <div className={styles.captureGroups}>
                          <strong>Groups:</strong>
                          <ol>
                            {match.groups.map((group, groupIndex) => (
                              <li key={groupIndex}>
                                <code className={styles.matchCode}>{group === undefined ? 'undefined' : group || '(empty group)'}</code>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No matches found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
