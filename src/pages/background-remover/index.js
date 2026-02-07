import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faDownload, faImage, faTimes, faMagic, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import SEO from '../../components/SEO';
import AdUnit from '../../components/AdUnit';
import FAQ from '../../components/SEO/FAQ';
import SchemaOrg from '../../components/SEO/SchemaOrg';

export default function BackgroundRemover() {
    const [originalFile, setOriginalFile] = useState(null);
    const [originalUrl, setOriginalUrl] = useState('');
    const [processedUrl, setProcessedUrl] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (originalUrl) URL.revokeObjectURL(originalUrl);
            if (processedUrl) URL.revokeObjectURL(processedUrl);
        };
    }, [originalUrl, processedUrl]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (event) => {
        if (event.target.files && event.target.files[0]) {
            processFile(event.target.files[0]);
        }
    };

    const processFile = async (file) => {
        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file (JPG, PNG, WebP).');
            return;
        }

        // Reset state
        setError('');
        setOriginalFile(file);
        const url = URL.createObjectURL(file);
        setOriginalUrl(url);
        setProcessedUrl('');
        setIsProcessing(true);

        try {
            // Dynamic import to avoid SSR issues with some libraries if needed, 
            // ensuring it runs on client side.
            // Handle both named and default exports for compatibility across versions
            const imgly = await import('@imgly/background-removal');
            const removeBackground = imgly.removeBackground || imgly.default;

            if (typeof removeBackground !== 'function') {
                throw new Error("Could not find removeBackground function in the loaded module.");
            }

            const blob = await removeBackground(file, {
                progress: (key, current, total) => {
                    // Optional: distinct progress tracking if desired
                    // const progress = Math.round((current / total) * 100);
                }
            });

            const processedBlobUrl = URL.createObjectURL(blob);
            setProcessedUrl(processedBlobUrl);
        } catch (err) {
            console.error("Background removal error:", err);
            setError(`Failed to remove background: ${err.message || "Unknown error"}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setOriginalFile(null);
        setOriginalUrl('');
        setProcessedUrl('');
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const faqData = [
        {
            question: "Is this free to use?",
            answer: "Yes, this tool is 100% free and runs entirely in your browser."
        },
        {
            question: "Are my images private?",
            answer: "Absolutely. All processing happens locally on your device using advanced AI. Your images are never uploaded to any server."
        },
        {
            question: "What formats are supported?",
            answer: "We support JPG, PNG, and WebP images."
        },
        {
            question: "Does it reduce image quality?",
            answer: "The foreground subject retains its original quality. Only the background is removed."
        }
    ];

    const schemaData = {
        name: "Background Remover",
        description: "Free online AI Background Remover. Remove image backgrounds instantly in your browser. Secure, private, and high quality.",
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
                title="Free Background Remover - Remove Background from Image Online | AAII"
                description="Remove background from images instantly for free. AI-powered tool runs in your browser. Secure, private, and high quality. Supports JPG, PNG, WebP."
                keywords="background remover, remove background, transparent background, ai background remover, free image tool"
            />
            <SchemaOrg type="SoftwareApplication" data={schemaData} />

            <main className="tool-dashboard container">
                <div className="tool-main">
                    <article className="tool-section">
                        <h1>In-Browser Background Remover</h1>
                        <p className="tool-description">
                            Instantly remove backgrounds from your photos using powerful AI.
                            100% free, private, and runs directly on your device.
                        </p>

                        <AdUnit slot="background-remover-top" style={{ marginBottom: '20px', height: '90px' }} />

                        <div className="tool-panel">
                            {error && (
                                <div style={{ background: 'rgba(220, 53, 69, 0.1)', border: '1px solid var(--danger)', padding: '15px', borderRadius: '8px', color: 'var(--danger)', marginBottom: '20px' }}>
                                    {error}
                                </div>
                            )}

                            {!originalUrl ? (
                                <div
                                    className={`upload-zone ${dragActive ? 'active' : ''}`}
                                    style={{
                                        border: '2px dashed var(--border-color)',
                                        borderRadius: '12px',
                                        padding: '60px 20px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        background: dragActive ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(255,255,255,0.02)',
                                        borderColor: dragActive ? 'var(--primary)' : 'var(--border-color)'
                                    }}
                                    onClick={() => fileInputRef.current.click()}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '20px' }} />
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Click or Drag Image Here</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>JPG, PNG, WebP supported</p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            ) : (
                                <div className="workspace">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <h3 style={{ margin: 0 }}>Result</h3>
                                        <button onClick={reset} className="btn ghost danger sm">
                                            <FontAwesomeIcon icon={faTimes} /> Start Over
                                        </button>
                                    </div>

                                    <div className="comparison-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px' }}>

                                        {/* Original Image */}
                                        <div className="glass-panel" style={{ padding: '20px' }}>
                                            <h4 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}><FontAwesomeIcon icon={faImage} style={{ marginRight: '10px' }} /> Original</h4>
                                            <div style={{
                                                height: '350px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(0,0,0,0.1)',
                                                borderRadius: '8px',
                                                overflow: 'hidden'
                                            }}>
                                                <img src={originalUrl} alt="Original" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                            </div>
                                        </div>

                                        {/* Processed Image */}
                                        <div className="glass-panel" style={{ padding: '20px', position: 'relative' }}>
                                            <h4 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}><FontAwesomeIcon icon={faMagic} style={{ marginRight: '10px', color: 'var(--primary)' }} /> No Background</h4>

                                            <div style={{
                                                height: '350px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABhJREFUOBFjYBgFoyEwGgKjITCaCYaAAQA7dwC73n0o7gAAAABJRU5ErkJggg==")', // Checkerboard pattern
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}>
                                                {isProcessing ? (
                                                    <div style={{ textAlign: 'center', color: 'var(--primary)' }}>
                                                        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                                                        <p style={{ marginTop: '15px', fontWeight: '500' }}>AI is removing background...</p>
                                                        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>(First run may verify models)</p>
                                                    </div>
                                                ) : (
                                                    <img src={processedUrl} alt="Processed" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                                )}
                                            </div>

                                            {!isProcessing && processedUrl && (
                                                <div style={{ marginTop: '20px' }}>
                                                    <a
                                                        href={processedUrl}
                                                        download={`nobg-${originalFile.name.split('.')[0]}.png`}
                                                        className="btn primary"
                                                        style={{ width: '100%', textAlign: 'center', padding: '15px', fontSize: '1.1rem', display: 'block' }}
                                                    >
                                                        <FontAwesomeIcon icon={faDownload} /> Download Transparent PNG
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="tool-content-text" style={{ marginTop: '50px', lineHeight: '1.8' }}>
                            <h2>Why Use Our Background Remover?</h2>
                            <p>
                                Removing backgrounds from images used to require complex software like Photoshop or expensive subscriptions.
                                Our <strong>In-Browser Background Remover</strong> changes that by leveraging state-of-the-art Artificial Intelligence (AI)
                                technology securely on your own device.
                            </p>

                            <h3>Features at a Glance</h3>
                            <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                                <li><strong>Instant Transparency:</strong> Create transparent PNGs in seconds.</li>
                                <li><strong>100% Free:</strong> No hidden costs, no credits system, no daily limits.</li>
                                <li><strong>Privacy First:</strong> Unlike other tools that upload your photos to a cloud server, our tool processes images locally in your browser. Your photos never leave your computer.</li>
                                <li><strong>High Quality Models:</strong> We use advanced segmentation models (like Segment Anything) to ensure edge precision, handling hair and complex objects with ease.</li>
                                <li><strong>No Sign-up Required:</strong> Just drop your image and get the result.</li>
                            </ul>

                            <h3>How the AI Works</h3>
                            <p>
                                This tool utilizes advanced machine learning models derived from technologies similar to <em>Segment Anything Model (SAM)</em>.
                                When you upload an image, the AI analyzes the pixels to distinguish the foreground subject (people, products, cars, animals)
                                from the background. It then creates a precise mask and effectively "erases" the background pixels, leaving you with a clean,
                                transparent image ready for use in presentations, e-commerce listings, or graphic design projects.
                            </p>

                            <h3>Perfect for E-Commerce and Marketing</h3>
                            <p>
                                If you run an online store, consistent product photography is key. Use this tool to remove distracting backgrounds
                                and replace them with pure white or brand colors. It's also excellent for creating marketing assets, stickers,
                                and social media content.
                            </p>
                        </div>

                        <FAQ questions={faqData} />
                    </article>
                </div>

                <aside className="tool-sidebar">
                    <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
                        <h3>Related Tools</h3>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '10px' }}><Link href="/image-compressor">Image Compressor</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/base64-encoder">Base64 Encoder</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/color-picker">Color Picker</Link></li>
                        </ul>
                    </div>
                    <AdUnit slot="9876543210" format="vertical" style={{ height: '600px' }} />
                </aside>
            </main>
        </>
    );
}
