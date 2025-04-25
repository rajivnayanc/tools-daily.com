import Head from "next/head";

const About = () => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>About DailyTools - Free Online Utility Tools</title>
                <meta name="description" content="Learn about DailyTools, a collection of free online utility tools designed to help with everyday tasks. No ads, no signups, just useful tools." />
                <meta name="keywords" content="about dailytools, online tools, web utilities, free tools, developer tools" />

                <link rel="icon" href="favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />

                <meta property="og:title" content="About DailyTools - Free Online Utility Tools" />
                <meta property="og:description" content="Learn about DailyTools, a collection of free online utility tools designed to help with everyday tasks." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tools-daily.com/about" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About DailyTools - Free Online Utility Tools" />
                <meta name="twitter:description" content="Learn about DailyTools, a collection of free online utility tools designed to help with everyday tasks." />

                <link rel="canonical" href="https://tools-daily.com/about" />
            </Head>
            <main id="main-content">
                <div className="container">
                    <section className="about-section">
                        <h1>About DailyTools</h1>

                        <div className="about-content">
                            <h2>Our Mission</h2>
                            <p>DailyTools was created with a simple mission: to provide free, easy-to-use, and accessible online utility tools that help people with their everyday tasks. We believe that useful tools should be available to everyone without barriers or signups.</p>

                            <h2>What We Offer</h2>
                            <p>Our collection of tools spans multiple categories:</p>
                            <ul>
                                <li><strong>Date & Time Tools:</strong> Unix timestamp converters, date calculators, and world clocks</li>
                                <li><strong>Text Tools:</strong> Case converters, text comparison tools, and character counters</li>
                                <li><strong>Developer Tools:</strong> JSON formatters, CSS minifiers, and color pickers</li>
                                <li><strong>Converters:</strong> Unit converters and various encoding/decoding tools</li>
                            </ul>

                            <h2>Our Values</h2>
                            <div className="values-grid">
                                <div className="value-card">
                                    <h3>Simplicity</h3>
                                    <p>We design our tools to be intuitive and straightforward, focusing on functionality without unnecessary complexity.</p>
                                </div>
                                <div className="value-card">
                                    <h3>Accessibility</h3>
                                    <p>We are committed to making our tools accessible to everyone, including users with disabilities.</p>
                                </div>
                                <div className="value-card">
                                    <h3>Privacy</h3>
                                    <p>Your data stays on your device. We do not store, track, or analyze your inputs or usage patterns.</p>
                                </div>
                                <div className="value-card">
                                    <h3>Free Forever</h3>
                                    <p>All our tools are and will always be completely free to use, with no hidden fees or premium features.</p>
                                </div>
                            </div>

                            <h2>Technical Details</h2>
                            <p>DailyTools is built with modern web technologies, focusing on performance, accessibility, and responsive design. All our tools work client-side, meaning your data never leaves your browser.</p>

                            <h2>Future Plans</h2>
                            <p>We are constantly working to improve DailyTools and expand our collection of utility tools. Our future plans include adding more advanced tools, improving the user interface, and enhancing the overall user experience. We are also committed to keeping DailyTools free and accessible to everyone.</p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default About;
