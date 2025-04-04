import Head from 'next/head';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import styles from './ImageCompressor.module.css'; // We'll create this CSS module

export default function ImageCompressor() {
  const [resetKey, setResetKey] = useState(0);
  const [originalImage, setOriginalImage] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [compressedWidth, setCompressedWidth] = useState(0);
  const [compressedHeight, setCompressedHeight] = useState(0);
  const [compressionOptions, setCompressionOptions] = useState({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.7,
  });
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      resetState();
      return;
    }

    setOriginalImage(file);
    setOriginalSize(file.size);

    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
    };
    img.src = URL.createObjectURL(file);

    const imageUrl = URL.createObjectURL(file);
    setOriginalImageUrl(imageUrl);
    setCompressedImage(null);
    setCompressedImageUrl('');
    setCompressedSize(0);
    setCompressedWidth(0);
    setCompressedHeight(0);
    setError('');
  };

  const handleCompress = async () => {
    if (!originalImage) {
    setError('Please select an image first.');
      return;
    }

    console.log('handleCompress called - this should not be visible');
    setIsCompressing(true);
    setError('');

    try {
      console.log(`Original file size: ${originalSize / 1024 / 1024} MB`);
      console.log('Compression options:', compressionOptions);

      const compressedFile = await imageCompression(originalImage, compressionOptions);

      console.log(`Compressed file size: ${compressedFile.size / 1024 / 1024} MB`);

      setCompressedImage(compressedFile);
      const compressedImageUrl = URL.createObjectURL(compressedFile);
      setCompressedImageUrl(compressedImageUrl);
      setCompressedSize(compressedFile.size);

      const img = new Image();
      img.onload = () => {
        setCompressedWidth(img.width);
        setCompressedHeight(img.height);
      };
      img.src = compressedImageUrl;

    } catch (err) {
      console.error('Compression Error:', err);
      setError(`Compression failed: ${err.message || 'Unknown error'}`);
      setCompressedImage(null);
      setCompressedImageUrl('');
      setCompressedSize(0);
      setCompressedWidth(0);
      setCompressedHeight(0);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleOptionChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCompressionOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || value,
    }));
  };

  const resetState = () => {
    setOriginalImage(null);
    setOriginalImageUrl('');
    setCompressedImage(null);
    setCompressedImageUrl('');
    setOriginalSize(0);
    setCompressedSize(0);
    setIsCompressing(false);
    setError('');
    setResetKey(prevKey => prevKey + 1);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <>
      <Head>
        <title>Image Compressor - DailyTools</title>
        <meta name="description" content="Compress and optimize images (JPEG, PNG, WebP) online. Reduce file size while maintaining quality." />
        <meta name="keywords" content="image compressor, image optimizer, reduce image size, compress jpeg, compress png, compress webp, online tool" />
      </Head>
      <main>
        <div className='container'>
          <h1>Image Compressor</h1>
          <p>Reduce the file size of your images (JPEG, PNG, WebP) directly in your browser.</p>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.uploadSection}>
            <label htmlFor="imageInput" className={styles.uploadButton}>
              {originalImage ? 'Change Image' : 'Select Image'}
            </label>
           <input
              key={resetKey}
              type="file"
              id="imageInput"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            {originalImage && <span className={styles.fileName}>{originalImage.name}</span>}
          </div>

          {originalImage && (
            <div className={styles.optionsSection}>
              <h2>Compression Options</h2>
             <div className={styles.optionItem}>
                <label htmlFor="maxSizeMB">Max Size (MB):</label>
                <input
                  type="range"
                  id="maxSizeMB"
                  name="maxSizeMB"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={compressionOptions.maxSizeMB}
                  onChange={handleOptionChange}
                />
                <input
                  type="number"
                  id="maxSizeMB-value"
                  name="maxSizeMB"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={compressionOptions.maxSizeMB}
                  onChange={handleOptionChange}
                />
              </div>
              <div className={styles.optionItem}>
                <label htmlFor="maxWidthOrHeight">Max Width/Height (px):</label>
                <input
                  type="range"
                  id="maxWidthOrHeight"
                  name="maxWidthOrHeight"
                  min="100"
                  max="2048"
                  step="1"
                  value={compressionOptions.maxWidthOrHeight}
                  onChange={handleOptionChange}
                />
                <input
                  type="number"
                  id="maxWidthOrHeight-value"
                  name="maxWidthOrHeight"
                  min="100"
                  max="2048"
                  step="1"
                  value={compressionOptions.maxWidthOrHeight}
                  onChange={handleOptionChange}
                />
              </div>
              <div className={styles.optionItem}>
                <label htmlFor="initialQuality">Initial Quality (0-1):</label>
                <input
                  type="range"
                  id="initialQuality"
                  name="initialQuality"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={compressionOptions.initialQuality}
                  onChange={handleOptionChange}
                />
                 <input
                  type="number"
                  id="initialQuality-value"
                  name="initialQuality"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={compressionOptions.initialQuality}
                  onChange={handleOptionChange}
                />
              </div>
              {/* Add more options as needed */}
             <button
                onClick={handleCompress}
                disabled={isCompressing || !originalImage}
               style={{
                  display: 'inline-block',
                  padding: '0.8rem 1.5rem',
                  backgroundColor: '#4a6cf7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  fontSize: '1rem',
                  marginTop: '1rem'
                }}
              >
                {isCompressing ? 'Compressing...' : 'Compress Image'}
              </button>
            </div>
          )}

          {isCompressing && <p>Compressing, please wait...</p>}

          <div className={styles.resultsSection}>
            {originalImageUrl && (
              <div className={styles.imageContainer}>
                <h2>Original Image</h2>
                <img src={originalImageUrl} alt="Original" className={styles.previewImage} />
                <p>Size: {formatBytes(originalSize)}</p>
                <p>Dimensions: {originalWidth} x {originalHeight}</p>
              </div>
            )}
            {compressedImageUrl && (
              <div className={styles.imageContainer}>
                <h2>Compressed Image</h2>
                <img src={compressedImageUrl} alt="Compressed" className={styles.previewImage} />
                <p>Size: {formatBytes(compressedSize)}</p>
                <p>Dimensions: {compressedWidth} x {compressedHeight}</p>
                <p className={styles.reduction}>
                  Reduction: {formatBytes(originalSize - compressedSize)} (
                  {(((originalSize - compressedSize) / originalSize) * 100).toFixed(1)}%)
                </p>
                <button
                  onClick={() => downloadImage(compressedImageUrl, `compressed_${originalImage?.name || 'image'}`)}
                  className={styles.downloadButton}
                >
                  Download Compressed Image
                </button>
              </div>
            )}
          </div>
           {originalImage && (
             <button onClick={resetState} className={styles.resetButton}>Reset</button>
           )}
        </div>
      </main>
    </>
  );
}

function downloadImage(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
