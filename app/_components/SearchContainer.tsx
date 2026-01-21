"use client";

import React from "react";
import styles from "../_styles/style.module.scss";

import { SearchContainerProps } from "../_types/searchcontainer.interface";

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
