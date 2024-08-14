import React, { useState } from 'react';
import '../assets/css/Faq.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Is it easy to use?",
      answer: "Absolutely!User-friendly and intutive interface!"
    },
    {
      question: "What is ShelfLife?",
      answer: "ShelfLife is your ultimate grocery store management system."
    },
    {
      question: "Who can use Shelflife?",
      answer: "Store managers,cashiers and warehouse staff!"
    },
    {
      question: "What features does it offer?",
      answer: "Stock tracking,sales updates and more!"
    },
    {
      question: "How can I get started?",
      answer: "Sign up on our website today."
    }
  ];

  const toggle = index => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggle(index)}
            >
              {faq.question}
              <span className={`faq-icon ${activeIndex === index ? 'active' : ''}`}>+</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
