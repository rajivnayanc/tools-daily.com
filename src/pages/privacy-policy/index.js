import Head from "next/head";

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Privacy Policy - DailyTools</title>
                <meta name="description" content="DailyTools Privacy Policy - Learn how we protect your privacy and handle your data when using our free online utility tools." />
                <meta name="keywords" content="privacy policy, dailytools privacy, data protection, online tools privacy" />

                {/* <!-- Favicon --> */}
                <link rel="icon" href="favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />

                {/* <!-- Open Graph / Social Media Meta Tags --> */}
                <meta property="og:title" content="Privacy Policy - DailyTools" />
                <meta property="og:description" content="Learn how DailyTools protects your privacy and handles your data when using our free online utility tools." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tools-daily.com/privacy-policl" />

                {/* <!-- Twitter Card Meta Tags --> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Privacy Policy - DailyTools" />
                <meta name="twitter:description" content="Learn how DailyTools protects your privacy and handles your data when using our free online utility tools." />

                {/* <!-- Canonical URL --> */}
                <link rel="canonical" href="https://tools-daily.com/privacy-policy" />

            </Head>
            <main id="main-content">
                <div className="container">
                    <section className="policy-section">
                        <h1>Privacy Policy</h1>

                        <div className="policy-content">
                            <p><strong>Last Updated:</strong> March 2, 2024</p>

                            <h2>Introduction</h2>
                            <p>Welcome to DailyTools. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>

                            <h2>Important Information</h2>
                            <p>DailyTools is a collection of free online utility tools that process data entirely within your browser. We have designed our services with privacy in mind.</p>

                            <h2>The Data We Collect</h2>
                            <p>We are committed to minimizing data collection. Here is what we collect and do not collect:</p>

                            <h3>We DO NOT Collect:</h3>
                            <ul>
                                <li>The content you input into our tools (timestamps, text, etc.)</li>
                                <li>Personal identification information</li>
                                <li>Payment information (our services are free)</li>
                            </ul>

                            <h3>We DO Collect:</h3>
                            <ul>
                                <li><strong>Anonymous Usage Data:</strong> We use standard analytics tools to collect anonymous information about how our website is used, including:
                                    <ul>
                                        <li>Pages visited</li>
                                        <li>Time spent on the website</li>
                                        <li>Referring websites</li>
                                        <li>General geographic location (country/city level only)</li>
                                        <li>Browser type and operating system</li>
                                    </ul>
                                </li>
                                <li><strong>Cookies:</strong> We use essential cookies to ensure the website functions properly.</li>
                            </ul>

                            <h2>How We Use Your Data</h2>
                            <p>The limited data we collect is used for:</p>
                            <ul>
                                <li>Improving our website and tools</li>
                                <li>Understanding which tools are most useful to our users</li>
                                <li>Diagnosing technical issues</li>
                                <li>Analyzing usage patterns to guide future development</li>
                            </ul>

                            <h2>Client-Side Processing</h2>
                            <p>All our tools process data entirely within your browser. This means:</p>
                            <ul>
                                <li>The data you input (timestamps, text, etc.) never leaves your device</li>
                                <li>We do not store, access, or transmit your input data to our servers</li>
                                <li>Your data is not shared with third parties</li>
                            </ul>

                            <h2>Third-Party Services</h2>
                            <p>We use the following third-party services:</p>
                            <ul>
                                <li><strong>Google Analytics:</strong> For anonymous usage statistics</li>
                                <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                            </ul>
                            <p>These services may use cookies and collect anonymous usage data according to their own privacy policies.</p>

                            <h2>Your Rights</h2>
                            <p>Under data protection laws, you have rights including:</p>
                            <ul>
                                <li><strong>Right to Access:</strong> You can request copies of your personal data.</li>
                                <li><strong>Right to Rectification:</strong> You can request that we correct inaccurate information.</li>
                                <li><strong>Right to Erasure:</strong> You can request that we delete your personal data.</li>
                                <li><strong>Right to Restriction:</strong> You can request that we restrict the processing of your data.</li>
                                <li><strong>Right to Object:</strong> You can object to our processing of your personal data.</li>
                                <li><strong>Right to Data Portability:</strong> You can request transfer of your data.</li>
                            </ul>

                            <h2>Changes to This Privacy Policy</h2>
                            <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the <b><i>Last Updated</i></b> date.</p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default PrivacyPolicy;
