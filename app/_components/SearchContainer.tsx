"use client";

import React from "react";
import styles from "../style.module.scss";

interface SearchContainerProps {
  query: string;
  onSearch: (query: string) => void;
  resultCount: number;
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  query,
  onSearch,
  resultCount,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search items..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.resultInfo}>
        <p>Found {resultCount} results</p>
      </div>
    </div>
  );
};
