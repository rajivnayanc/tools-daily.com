import React, { useEffect } from 'react';

const AdUnit = ({ slot, format = 'auto', responsive = true, style = {} }) => {
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    // In development, show a placeholder if no AdSense ID is configured or just for visual layout
    const isDev = process.env.NODE_ENV === 'development';

    return (
        <div className="ad-unit" style={{ ...style, minHeight: style.height || '100px' }}>
            {isDev && (
                <div style={{ position: 'absolute', opacity: 0.3, pointerEvents: 'none' }}>
                    Ad Space ({format})
                </div>
            )}
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%', ...style }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with real ID later
                data-ad-slot={slot || "1234567890"}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
};

export default AdUnit;
