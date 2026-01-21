'use client';

import React, { useState, memo } from 'react';
import styles from '../style.module.scss';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = 
  ({ title, content, isOpen, onToggle }) => (
    <div className={styles.accordionItem}>
      <button
        className={`${styles.accordionHeader} ${isOpen ? styles.open : ''}`}
        onClick={onToggle}
      >
        <span className={styles.accordionTitle}>{title}</span>
        <span className={styles.accordionIcon}>
          {isOpen ? '▼' : '▶'}
        </span>
      </button>
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  )


AccordionItem.displayName = 'AccordionItem';

export const PerformanceGuide: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const guides = [
    {
      title: '🎯 Current Issues in This Code',
      content: (
        <div className={styles.guideContent}>
          <h4>Performance Problems:</h4>
          <ul>
            <li>
              <strong>Unnecessary Re-renders:</strong> Search state changes cause
              entire component tree re-renders
            </li>
            <li>
              <strong>Heavy Computations:</strong> Stats recalculate on every
              search, even with debouncing
            </li>
            <li>
              <strong>Reference Instability:</strong> New objects/arrays created
              on each render break memoization
            </li>
          </ul>
          <p className={styles.codeBlock}>
            💡 <strong>How useDeferredValue Helps:</strong>
            <br />
            Instead of startTransition (urgent), useDeferredValue keeps expensive
            computations deferred, showing stale UI while React works in background
          </p>
        </div>
      ),
    },
    {
      title: '📊 How to Identify Re-renders (Important!)',
      content: (
        <div className={styles.guideContent}>
          <p>
            <strong>First Step:</strong> If you don't know where the problem is, use the Profiler!
          </p>
          <h4>🔧 Steps:</h4>
          <ol>
            <li>Open DevTools → Profiler tab</li>
            <li>Click the Record button (● red circle)</li>
            <li>Type on the page (search, favorites, etc)</li>
            <li>Click Record again to stop</li>
          </ol>
          <h4>🔍 How to Read the Results?</h4>
          <ul>
            <li><strong>Flamegraph:</strong> Which components rendered</li>
            <li><strong>Ranked Chart:</strong> Which ones are slow (red)</li>
            <li><strong>Renders Count:</strong> How many times each component re-rendered</li>
          </ul>
          <h4>❓ What to Look For?</h4>
          <ul>
            <li>❌ Components re-rendering without reason</li>
            <li>❌ Red bars (slow rendering)</li>
            <li>❌ Repeated calculations</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.performanceGuide}>
      <div className={styles.guideHeader}>
        <h2>📚 Performance Optimization Guide</h2>
      </div>
      <div className={styles.accordion}>
        {guides.map((guide, index) => (
          <AccordionItem
            key={index}
            title={guide.title}
            content={guide.content}
            isOpen={openItems.includes(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
};

PerformanceGuide.displayName = 'PerformanceGuide';
