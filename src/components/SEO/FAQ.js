import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const FAQ = ({ questions }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section" itemScope itemType="https://schema.org/FAQPage">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
                {questions.map((q, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                        style={{ marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}
                    >
                        <h4
                            onClick={() => toggleQuestion(index)}
                            itemProp="name"
                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-highlight)' }}
                        >
                            {q.question}
                            <FontAwesomeIcon icon={activeIndex === index ? faChevronUp : faChevronDown} style={{ fontSize: '0.8rem', opacity: 0.7 }} />
                        </h4>
                        <div
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                            style={{
                                display: activeIndex === index ? 'block' : 'none',
                                marginTop: '10px',
                                color: 'var(--text-muted)',
                                lineHeight: '1.6'
                            }}
                        >
                            <div itemProp="text" dangerouslySetInnerHTML={{ __html: q.answer }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
