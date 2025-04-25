import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTools } from "@fortawesome/free-solid-svg-icons";


export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | DailyTools</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Head>
      <main>
        <div className="container">
          <section className="not-found-section">
            <div className="not-found-content">
              <div className="not-found-icon">
                <FontAwesomeIcon icon={faTools} size="4x" />
              </div>
              <h1>Feature Coming Soon</h1>
              <p>We are working hard to bring this tool to you. Please check back later!</p>
              <p>A 404 error means that the page you are looking for could not be found on our server. This could be due to a broken link, a mistyped URL, or the page may have been removed.</p>
              <div className="not-found-actions">
                <Link href="/" className="btn btn-primary">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
