import Head from 'next/head';
import { useState } from 'react';
import styles from './ColorPicker.module.css';
import SEO from '../../components/SEO';

export default function ColorPicker() {
  const [color, setColor] = useState('#007bff'); // Default color

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  return (
    <>
      <SEO
        title="Color Picker - DailyTools"
        description="Pick colors and get their HEX, RGB, HSL values."
        keywords="color picker, hex color, rgb color, hsl color"
      />
      <main>
        <div className="container">
          <h1>Color Picker</h1>
          <p>Choose the perfect color for your web projects with our easy-to-use color picker. This tool displays the HEX, RGB, and HSL values for any color you select, making it simple to integrate your chosen color into your code.</p>
          <p>Color pickers are indispensable tools for designers and developers, enabling them to select and manage colors effectively. They provide a visual interface for exploring the color spectrum and generating color palettes, ensuring consistency and harmony in design projects. Whether you're creating a website, a mobile app, or a marketing campaign, a color picker can help you find the perfect hues to convey your message and brand identity.</p>
          <p><strong>How to use:</strong> Click the color input below to open the color picker. Select a color, and the corresponding HEX, RGB, and HSL values will be displayed. You can then copy these values to use in your CSS or other design applications.</p>

          <div className={styles.colorInputContainer}>
            <label htmlFor="color" className={styles.label}>
              Pick a Color:
            </label>
            <input
              type="color"
              id="color"
              className={styles.colorInput}
              value={color}
              onChange={handleColorChange}
            />
          </div>

          <div className={styles.colorValues}>
            <h3>Color Values:</h3>
            <p>
              HEX: <span className={styles.value}>{color}</span>
            </p>
            {rgb && (
              <>
                <p>
                  RGB: <span className={styles.value}>rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
                </p>
                {hsl && (
                  <p>
                    HSL: <span className={styles.value}>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
                  </p>
                )}
              </>
            )}
          </div>

          <div
            className={styles.colorPreview}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </main>
    </>
  );
}
