"use client";

import React, { memo } from "react";
import styles from "../style.module.scss";

import { SidebarProps, HistoryItemProps } from "../_types/sidebar.interface";

const HistoryItem = memo<HistoryItemProps>(
  ({ query, isFavorite, onUse, onToggleFavorite }) => {
    return (
      <div className={styles.historyItem}>
        <button onClick={() => onUse(query)} className={styles.historyText}>
          {query}
        </button>
        <button
          onClick={() => onToggleFavorite(query)}
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
        >
          ★
        </button>
      </div>
    );
  },
);

HistoryItem.displayName = "HistoryItem";

export const Sidebar = memo<SidebarProps>(
  ({
    searchHistory,
    favorites,
    onUseHistory,
    onToggleFavorite,
    onAddFavoriteToSearch,
  }) => {
    return (
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarContent}>
          <h3>Search History</h3>
          <div className={styles.historyList}>
            {searchHistory.length === 0 ? (
              <p className={styles.emptyState}>No search history yet</p>
            ) : (
              searchHistory.map((query) => (
                <HistoryItem
                  key={query}
                  query={query}
                  isFavorite={favorites.includes(query)}
                  onUse={onUseHistory}
                  onToggleFavorite={onToggleFavorite}
                />
              ))
            )}
          </div>
        </div>

        <div className={styles.sidebarContent}>
          <h3>Favorites ({favorites.length})</h3>
          <div className={styles.favoritesList}>
            {favorites.length === 0 ? (
              <p className={styles.emptyState}>No favorites yet</p>
            ) : (
              favorites.map((query) => (
                <button
                  key={query}
                  onClick={() => onAddFavoriteToSearch(query)}
                  className={styles.favoriteButton}
                >
                  {query}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
);

Sidebar.displayName = "Sidebar";
