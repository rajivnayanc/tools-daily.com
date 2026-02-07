import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPalette, faEyeDropper, faRandom } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function ColorPicker() {
  const [color, setColor] = useState('#007bff');
  const [rgb, setRgb] = useState({ r: 0, g: 123, b: 255 });
  const [hsl, setHsl] = useState({ h: 211, s: 100, l: 50 });

  useEffect(() => {
    // Update RGB and HSL when hex changes
    const hex = color.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      setRgb({ r, g, b });

      // RGB to HSL
      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;
      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
          case gNorm: h = (bNorm - rNorm) / d + 2; break;
          case bNorm: h = (rNorm - gNorm) / d + 4; break;
        }
        h /= 6;
      }
      setHsl({ h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) });
    }
  }, [color]);

  const handleRandom = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const faqData = [
    {
      question: "What is HEX?",
      answer: "HEX is a 6-digit hexadecimal number used in HTML, CSS, and SVG to represent colors."
    },
    {
      question: "What is RGB?",
      answer: "RGB stands for Red, Green, Blue. It is an additive color model used for digital screens."
    }
  ];

  const schemaData = {
    name: "Color Picker Tool",
    description: "Online color picker and converter. Get HEX, RGB, and HSL values for any color.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <>
      <SEO
        title="Color Picker - HEX, RGB, HSL Converter | DailyTools"
        description="Free online color picker. Get HEX and RGB codes instantly. Convert between color formats and find the perfect shade for your project."
        keywords="color picker, hex code, rgb converter, hsl color, color palette"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Color Picker</h1>
            <p className="tool-description">
              Select a color to get its HEX, RGB, and HSL values. Perfect for web design and development.
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              <div className="color-display" style={{
                height: '200px',
                background: color,
                borderRadius: '12px',
                marginBottom: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  background: 'rgba(0,0,0,0.5)',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  letterSpacing: '1px'
                }}>
                  {color.toUpperCase()}
                </div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{
                    position: 'absolute', opacity: 0, width: '100%', height: '100%',
                    cursor: 'pointer', top: 0, left: 0
                  }}
                />
              </div>

              <div className="controls" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <button onClick={handleRandom} className="btn secondary">
                  <FontAwesomeIcon icon={faRandom} /> Random Color
                </button>
              </div>

              <div className="color-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>

                <div className="input-group">
                  <label>HEX</label>
                  <div style={{ display: 'flex' }}>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="glass-input"
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    />
                    <button onClick={() => copyToClipboard(color)} className="btn" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>
                </div>

                <div className="input-group">
                  <label>RGB</label>
                  <div style={{ display: 'flex' }}>
                    <input
                      type="text"
                      value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                      readOnly
                      className="glass-input"
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    />
                    <button onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="btn" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>
                </div>

                <div className="input-group">
                  <label>HSL</label>
                  <div style={{ display: 'flex' }}>
                    <input
                      type="text"
                      value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                      readOnly
                      className="glass-input"
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    />
                    <button onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} className="btn" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>Color Formats Explained</h2>
              <p>
                <strong>HEX:</strong> A hexadecimal code is a 6-digit code primarily used in HTML and CSS.<br />
                <strong>RGB:</strong> RGB (Red, Green, Blue) uses a value between 0 and 255 for each color.<br />
                <strong>HSL:</strong> HSL (Hue, Saturation, Lightness) is often more intuitive for humans to work with.
              </p>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/css-minifier">CSS Minifier</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/html-encoder">HTML Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
