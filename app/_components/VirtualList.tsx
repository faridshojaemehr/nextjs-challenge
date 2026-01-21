"use client";

import React, { useRef, useState, useMemo } from "react";
import styles from "../style.module.scss";

import { VirtualListProps } from "../_types/virtuallist.interface";

export const VirtualList: React.FC<VirtualListProps> = ({
  items,
  itemHeight,
  containerHeight,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const { startOffset, visibleItems } = useMemo(() => {
    const totalItems = items.length;

    const visibleCount = Math.ceil(containerHeight / itemHeight);

    const overscan = 5;

    let start = Math.floor(scrollTop / itemHeight);
    start = Math.max(0, start - overscan);

    let end = start + visibleCount + 2 * overscan;
    end = Math.min(totalItems, end);

    const offset = start * itemHeight;

    const visible = items.slice(start, end);

    return {
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
      <div style={{ height: totalContentHeight, position: "relative" }}>
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
