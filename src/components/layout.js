import { useEffect } from "react";
import Header from './header';
import Footer from "./footer";
import Script from "next/script";
import Head from "next/head";

const addToastStyles = () => {
  // Add toast styles if not already in CSS
  if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
      }
      .toast {
          padding: 12px 20px;
          margin-top: 10px;
          border-radius: 4px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          opacity: 1;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .toast.success {
          background-color: var(--success-color, #28a745);
      }
      .toast.error {
          background-color: var(--danger-color, #dc3545);
      }
      .toast.hide {
          opacity: 0;
          transform: translateY(10px);
      }
      .error {
          border-color: var(--danger-color, #dc3545) !important;
      }
  `;
    document.head.appendChild(style);
  }
}

/**
* Initialize accessibility features
*/
function initAccessibility() {
  // Add keyboard navigation for buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

const init = () => {
  initAccessibility();
  addToastStyles();
}

export default function RootLayout({ children }) {
  useEffect(() => {
    init();
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments) }
    gtag('js', new Date());

    gtag('config', 'G-K4YGF9S6G3');
  });

  return (
    <>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-7329686430039536" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png"/>
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-K4YGF9S6G3"></Script>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7329686430039536"
        crossorigin="anonymous"></Script>
      <Header />
      {children}
      <Footer />
    </>
  );
}
