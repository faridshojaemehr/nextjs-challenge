"use client";

import React, { useState } from "react";
import styles from "../_styles/style.module.scss";

import { AccordionItemProps } from "../_types/performanceguide.interface";

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => (
  <div className={styles.accordionItem}>
    <button
      className={`${styles.accordionHeader} ${isOpen ? styles.active : ""}`}
      onClick={onToggle}
    >
      <h3>{title}</h3>
      <span className={styles.icon}>{isOpen ? "-" : "+"}</span>
    </button>
    {isOpen && <div className={styles.accordionContent}>{content}</div>}
  </div>
);

export default function PerformanceGuide() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "1. Virtualization (Virtual Scrolling)",
      content: (
        <>
          <p>
            Rendering 100,000 items directly into the DOM would crash the
            browser. We use <strong>Virtual Scrolling</strong> to solve this.
          </p>
          <ul>
            <li>Only renders items currently visible in the viewport.</li>
            <li>Calculates which items to show based on scroll position.</li>
            <li>
              Keeps DOM nodes constant (e.g., ~20 items) regardless of list
              size.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "2. Logic Splitting (Filtering & Stats)",
      content: (
        <>
          <p>
            Instead of looping through the data multiple times (once for filter,
            once for stats), we combine them.
          </p>
          <ul>
            <li>
              <strong>O(N)</strong> complexity instead of <strong>O(2N)</strong>
              .
            </li>
            <li>
              Reduced memory overhead by not creating intermediate arrays.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Memoization (useMemo & React.memo)",
      content: (
        <>
          <p>Prevents unnecessary re-computations and re-renders.</p>
          <ul>
            <li>
              <strong>First Step:</strong> If you don&apos;t know where the
              problem is, use the Profiler!/stats calculation.
            </li>
            <li>
              <strong>React.memo</strong>: Prevents child components (Sidebar,
              Stats) from re-rendering if props haven&apos;t changed.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Efficient Lookups (Set vs Array)",
      content: (
        <>
          <p>
            Checking if an item is favorited using an Array is{" "}
            <strong>O(N)</strong>. Inside a large list, this is a disaster.
          </p>
          <ul>
            <li>
              We convert the Favorites array to a <strong>Set</strong>.
            </li>
            <li>
              Lookups become <strong>O(1)</strong> (instant).
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "5. Search Optimization (Debounce)",
      content: (
        <>
          <p>
            Filtering 100k items on every keystroke is expensive. We optimized
            this with a debounce strategy along with specific criteria.
          </p>
          <ul>
            <li>
              <strong>Debounce (300ms)</strong>: The heavy calculation updates
              only after the user stops typing for 300ms.
            </li>
            <li>
              <strong>Character Limit (3 chars)</strong>: The comprehensive
              search logic is skipped until the user types at least 3
              characters, preventing massive result sets for single letters.
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className={styles.performanceGuide}>
      <h2>Performance Optimization Guide</h2>
      <div className={styles.accordionContainer}>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
}
