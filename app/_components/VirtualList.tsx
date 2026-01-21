"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import styles from "../style.module.scss"; // We'll reuse/add styles here
import { Item } from "../_types/state.interface";

interface VirtualListProps {
  items: Item[];
  itemHeight: number;
  containerHeight: number;
}

export const VirtualList: React.FC<VirtualListProps> = ({
  items,
  itemHeight,
  containerHeight,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll to update visible range
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Calculate the visible range
  const { startIndex, endIndex, startOffset, visibleItems } = useMemo(() => {
    const totalItems = items.length;

    // Number of items that can fit in the container
    const visibleCount = Math.ceil(containerHeight / itemHeight);

    // Overscan (buffer) to prevent flickering when scrolling fast
    const overscan = 5;

    // First visible item index based on scroll position
    let start = Math.floor(scrollTop / itemHeight);
    start = Math.max(0, start - overscan);

    // Last visible item index
    let end = start + visibleCount + 2 * overscan;
    end = Math.min(totalItems, end);

    // The pixel offset for the first rendered item to push it down correctly
    const offset = start * itemHeight;

    // The subset of items to actually render
    const visible = items.slice(start, end);

    return {
      startIndex: start,
      endIndex: end,
      startOffset: offset,
      visibleItems: visible,
    };
  }, [items, scrollTop, itemHeight, containerHeight]);

  const totalContentHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflowY: "auto",
        position: "relative",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      {/* 
        This div forces the scrollbar to be the correct height 
        total items * height per item 
      */}
      <div style={{ height: totalContentHeight, position: "relative" }}>
        {/* 
          Items container positioned absolutely with top offset 
          to simulate being "further down" the list
        */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${startOffset}px)`,
          }}
        >
          {visibleItems.map((item) => (
            <div
              key={item.id}
              style={{
                height: itemHeight,
                padding: "10px",
                boxSizing: "border-box",
                borderBottom: "1px solid #f0f0f0",
              }}
              className={styles.listItem}
            >
              <div className={styles.itemHeader}>
                <h3 style={{ margin: "0 0 5px", fontSize: "1rem" }}>
                  {item.title}
                </h3>
                <span
                  className={styles.category}
                  style={{ fontSize: "0.8rem" }}
                >
                  {item.category}
                </span>
              </div>
              <p
                style={{
                  margin: "5px 0",
                  fontSize: "0.9rem",
                  color: "#666",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.description}
              </p>
              <div className={styles.itemFooter}>
                <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                  Value: ${item.value.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
