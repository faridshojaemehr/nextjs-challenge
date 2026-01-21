"use client";

import { memo } from "react";
import styles from "../_styles/style.module.scss";
import { ActionBoxProps } from "../_types/actionbox.interface";

export const ActionBox = memo<ActionBoxProps>(
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
            isFavorited ? styles.favorited : ""
          }`}
          title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          <span className={styles.icon}>★</span>
        </button>
      </div>
    );
  },
);

ActionBox.displayName = "ActionBox";
