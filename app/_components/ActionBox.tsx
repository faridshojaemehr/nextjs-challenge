'use client';

import React from 'react';
import styles from '../style.module.scss';

interface ActionBoxProps {
  currentQuery: string;
  isFavorited: boolean;
  onToggleFavorite: (query: string) => void;
}

export const ActionBox: React.FC<ActionBoxProps> = 
  ({ currentQuery, isFavorited, onToggleFavorite }) => {
    const handleFavoriteClick = () => {
      if (currentQuery.trim()) {
        onToggleFavorite(currentQuery);
      }
    };

    return (
      <div className={styles.actionBox}>
        <button
          onClick={handleFavoriteClick}
          disabled={!currentQuery.trim()}
          className={`${styles.favoriteButton} ${
            isFavorited ? styles.favorited : ''
          }`}
          title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <span className={styles.icon}>★</span>
        </button>
      </div>
    );
  }
  


ActionBox.displayName = 'ActionBox';
