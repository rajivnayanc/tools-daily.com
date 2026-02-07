import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faCompressArrowsAlt, faDownload, faImage, faTimes, faSlidersH, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import imageCompression from 'browser-image-compression';
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [error, setError] = useState('');

  // Advanced Options
  const [options, setOptions] = useState({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    initialQuality: 0.8,
    useWebWorker: true,
    fileType: 'original' // 'original', 'image/jpeg', 'image/png', 'image/webp'
  });

  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPG, PNG, WebP).');
        return;
      }
      processFile(file);
    }
  };

  const processFile = (file) => {
    setError('');
    setOriginalFile(file);
    setOriginalUrl(URL.createObjectURL(file));
    // Reset compressed state on new file
    setCompressedFile(null);
    setCompressedUrl('');
  };

  const compressImage = async () => {
    if (!originalFile) return;

    setIsCompressing(true);
    setError('');
    setCompressionProgress(0);

    try {
      const compressionConfig = {
        ...options,
        onProgress: (p) => setCompressionProgress(p)
      };

      // Handle file type selection
      if (options.fileType === 'original') {
        delete compressionConfig.fileType;
      } else {
        compressionConfig.fileType = options.fileType;
      }

      const compressed = await imageCompression(originalFile, compressionConfig);

      if (!compressed) {
        throw new Error("Compression resulted in empty file.");
      }

      setCompressedFile(compressed);
      setCompressedUrl(URL.createObjectURL(compressed));
    } catch (error) {
      console.error("Compression error:", error);
      setError(`Compression failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsCompressing(false);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalUrl('');
    setCompressedUrl('');
    setError('');
    setCompressionProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const faqData = [
    {
      question: "Is my image uploaded to a server?",
      answer: "No, all compression happens locally in your browser. Your images never leave your device."
    },
    {
      question: "Why did the file size increase?",
      answer: "Sometimes if you choose a very high quality or convert from a highly optimized format (like WebP) to JPEG, the size might increase. Try lowering the quality or max size."
    }
  ];

  const schemaData = {
    name: "Image Compressor",
    description: "Free online Image Compressor. Optimize JPEG, PNG, WebP images locally in browser with advanced controls.",
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
        title="Image Compressor - Optimize Images Online | DailyTools"
        description="Free online image compressor. Reduce image file size without losing quality. Supports JPG, PNG, WebP. Secure client-side compression."
        keywords="image compressor, compress jpeg, compress png, optimize image, reduce image size"
      />
      <SchemaOrg type="SoftwareApplication" data={schemaData} />

      <main className="tool-dashboard container">
        <div className="tool-main">
          <article className="tool-section">
            <h1>Image Compressor</h1>
            <p className="tool-description">
              Compress and optimize your images for the web. Fast, free, and secure (files stay on your device).
            </p>

            <AdUnit slot="1234567890" style={{ marginBottom: '20px', height: '90px' }} />

            <div className="tool-panel">

              {error && (
                <div style={{ background: 'rgba(220, 53, 69, 0.1)', border: '1px solid var(--danger)', padding: '15px', borderRadius: '8px', color: 'var(--danger)', marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              {!originalFile ? (
                <div
                  className="upload-zone"
                  style={{
                    border: '2px dashed var(--border-color)',
                    borderRadius: '12px',
                    padding: '50px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.02)'
                  }}
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('image/')) processFile(file);
                  }}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '15px' }} />
                  <h3>Click or Drag to Upload Image</h3>
                  <p style={{ color: 'var(--text-muted)' }}>JPG, PNG, WebP up to 10MB</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="compression-workspace">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0 }}>Compression Settings</h3>
                    <button onClick={reset} className="btn text-sm ghost danger">
                      <FontAwesomeIcon icon={faTimes} /> Reset
                    </button>
                  </div>

                  <div className="settings-panel glass-panel" style={{ padding: '20px', marginBottom: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>

                    <div className="input-group">
                      <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                        Max Size
                        <span style={{ color: 'var(--primary)' }}>{options.maxSizeMB} MB</span>
                      </label>
                      <input
                        type="range"
                        min="0.1" max="10" step="0.1"
                        value={options.maxSizeMB}
                        onChange={(e) => handleOptionChange('maxSizeMB', parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div className="input-group">
                      <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                        Max Dimension
                        <span style={{ color: 'var(--primary)' }}>{options.maxWidthOrHeight} px</span>
                      </label>
                      <input
                        type="range"
                        min="300" max="4096" step="100"
                        value={options.maxWidthOrHeight}
                        onChange={(e) => handleOptionChange('maxWidthOrHeight', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div className="input-group">
                      <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                        Quality
                        <span style={{ color: 'var(--primary)' }}>{Math.round(options.initialQuality * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0.1" max="1" step="0.05"
                        value={options.initialQuality}
                        onChange={(e) => handleOptionChange('initialQuality', parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div className="input-group">
                      <label>Output Format</label>
                      <select
                        value={options.fileType}
                        onChange={(e) => handleOptionChange('fileType', e.target.value)}
                        className="glass-select"
                        style={{ width: '100%', padding: '10px' }}
                      >
                        <option value="original">Keep Original</option>
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', gridColumn: '1 / -1' }}>
                      <button
                        onClick={compressImage}
                        className="btn primary"
                        style={{ width: '100%' }}
                        disabled={isCompressing}
                      >
                        {isCompressing ? <FontAwesomeIcon icon={faSyncAlt} spin /> : <FontAwesomeIcon icon={faCompressArrowsAlt} />}
                        {isCompressing ? ` Processing ${compressionProgress}%...` : ' Compress Image'}
                      </button>
                    </div>

                  </div>

                  <div className="image-comparison" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>

                    <div className="image-card glass-panel" style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                      <h4>Original</h4>
                      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', position: 'relative' }}>
                        <img src={originalUrl} alt="Original" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <span>Size: <strong style={{ color: 'var(--text-main)' }}>{formatSize(originalFile.size)}</strong></span>
                        <span>Type: {originalFile.type.split('/')[1].toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="image-card glass-panel" style={{ padding: '15px', display: 'flex', flexDirection: 'column', opacity: compressedUrl ? 1 : 0.6 }}>
                      <h4>Compressed Result</h4>
                      {compressedUrl ? (
                        <>
                          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', position: 'relative' }}>
                            <img src={compressedUrl} alt="Compressed" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>

                          <div style={{ marginTop: 'auto', paddingTop: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>New Size</span>
                                <strong style={{ color: 'var(--success)', fontSize: '1.2rem' }}>{formatSize(compressedFile.size)}</strong>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Savings</span>
                                <span style={{ backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                  -{Math.round((originalFile.size - compressedFile.size) / originalFile.size * 100)}%
                                </span>
                              </div>
                            </div>
                            <a
                              href={compressedUrl}
                              download={`compressed-${originalFile.name}`}
                              className="btn success"
                              style={{ width: '100%', textAlign: 'center', padding: '12px', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)', transition: 'all 0.3s ease' }}
                            >
                              <FontAwesomeIcon icon={faDownload} /> Download Image
                            </a>
                          </div>
                        </>
                      ) : (
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '10px', flexDirection: 'column', flex: 1 }}>
                          <FontAwesomeIcon icon={faImage} style={{ fontSize: '3rem', color: 'var(--text-muted)', opacity: 0.5 }} />
                          <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Ready to compress</p>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              )}

            </div>

            <div className="tool-info" style={{ marginTop: '40px' }}>
              <h2>How to use Image Compressor</h2>
              <ol style={{ listStyle: 'decimal', paddingLeft: '20px' }}>
                <li>Upload your image (JPG, PNG, or WebP).</li>
                <li>Adjust the <strong>compression settings</strong> (Max Size, Quality, Dimensions).</li>
                <li>Click <strong>Compress Image</strong>.</li>
                <li>Preview the result and click <strong>Download</strong> if satisfied.</li>
              </ol>
            </div>

            <FAQ questions={faqData} />
          </article>
        </div>

        <aside className="tool-sidebar">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3>Related Tools</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/color-picker">Color Picker</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/unit-converter">Unit Converter</Link></li>
            </ul>
          </div>
          <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
        </aside>
      </main>
    </>
  );
}
