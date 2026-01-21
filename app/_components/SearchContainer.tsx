'use client';

import React, { useTransition } from 'react';
import styles from '../style.module.scss';

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
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Use startTransition for non-urgent updates
    startTransition(() => {
      onSearch(value);
    });
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
        {isPending && <span className={styles.spinner}>Searching...</span>}
      </div>
      <div className={styles.resultInfo}>
        <p>Found {resultCount} results</p>
      </div>
    </div>
  );
};
