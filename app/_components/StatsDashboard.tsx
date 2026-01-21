"use client";

import React, { memo } from "react";
import styles from "../style.module.scss";
import { Stats } from "../_types/state.interface";

interface StatsDashboardProps {
  stats: Stats;
}

const StatCard = memo<{ label: string; value: string }>(({ label, value }) => {
  return (
    <div className={styles.statCard}>
      <label>{label}</label>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
});

StatCard.displayName = "StatCard";

export const StatsDashboard = memo<StatsDashboardProps>(({ stats }) => {
  return (
    <div className={styles.statsDashboard}>
      <h2>Statistics</h2>
      <div className={styles.statsGrid}>
        <StatCard label="Total Items" value={stats.total.toString()} />
        <StatCard label="Sum" value={`$${stats.sum}`} />
        <StatCard label="Average" value={`$${stats.average}`} />
        <StatCard label="Max" value={`$${stats.max}`} />
        <StatCard label="Min" value={`$${stats.min}`} />
      </div>

      <div className={styles.categoriesSection}>
        <h3>Categories Distribution</h3>
        <div className={styles.categoriesGrid}>
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} className={styles.categoryItem}>
              <span className={styles.categoryName}>{category}</span>
              <span className={styles.categoryCount}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

StatsDashboard.displayName = "StatsDashboard";
