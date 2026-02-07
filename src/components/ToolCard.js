import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock, faCode, faExchangeAlt, faFont, faHammer, faImage, faLock
} from "@fortawesome/free-solid-svg-icons";

// Map category/names to icons for better visuals
const getIconForTool = (category, name) => {
    const n = name.toLowerCase();
    const c = category.toLowerCase();

    if (n.includes('clock') || n.includes('time') || n.includes('date')) return faClock;
    if (n.includes('json') || n.includes('html') || n.includes('css') || c.includes('dev')) return faCode;
    if (n.includes('text') || n.includes('word') || n.includes('case')) return faFont;
    if (n.includes('image') || n.includes('photo')) return faImage;
    if (n.includes('password') || n.includes('encrypt')) return faLock;
    if (n.includes('convert') || n.includes('encoder')) return faExchangeAlt;

    return faHammer; // Default
};

const ToolCard = ({ tool }) => {
    const icon = getIconForTool(tool.category, tool.name);

    return (
        <Link href={`/${tool.url}`} className="tool-card">
            <div className="tool-icon">
                <FontAwesomeIcon icon={icon} />
            </div>
            <h3>{tool.name}</h3>
            <p>{tool.category}</p>
        </Link>
    );
};

export default ToolCard;
