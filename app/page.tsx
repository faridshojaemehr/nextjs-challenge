'use client';

import { useState } from 'react';
import { SearchContainer } from './_components/SearchContainer';
import { StatsDashboard } from './_components/StatsDashboard';
import { Sidebar } from './_components/Sidebar';
import { ActionBox } from './_components/ActionBox';
import { PerformanceGuide } from './_components/PerformanceGuide';
import { generateHeavyData } from './_lib/dataGenerator';
import { calculateStats } from './_lib/statsCalculator';
import styles from './style.module.scss';

export default function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [data] = useState(() => generateHeavyData());

  // Filter data based on search
  const filteredData = !searchQuery ? data : data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats - expensive operation
  const stats = calculateStats(filteredData);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !searchHistory.includes(query)) {
      setSearchHistory((prev) => [query, ...prev].slice(0, 10));
    }
  };

  // Use history item
  const handleUseHistoryItem = (query: string) => {
    setSearchQuery(query);
  };

  // Toggle favorite
  const handleToggleFavorite = (query: string) => {
    setFavorites((prev) =>
      prev.includes(query)
        ? prev.filter((fav) => fav !== query)
        : [...prev, query]
    );
  };

  // Add favorite to search
  const handleAddFavoriteToSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>React Performance Interview Challenge</h1>
        <p>
          Explore performance optimization techniques and deep JavaScript concepts
        </p>
      </div>

      <div className={styles.mainLayout}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.searchWrapper}>
            <SearchContainer
              query={searchQuery}
              onSearch={handleSearch}
              resultCount={filteredData.length}
            />
            {/* Action Box - Compact */}
            <ActionBox
              currentQuery={searchQuery}
              isFavorited={favorites.includes(searchQuery)}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Heavy List */}
          <div className={styles.listContainer}>
            <h2>Results ({filteredData.length})</h2>
            <div className={styles.list}>
              {filteredData.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <div className={styles.itemHeader}>
                    <h3>{item.title}</h3>
                    <span className={styles.category}>{item.category}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className={styles.itemFooter}>
                    <span>Value: ${item.value.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <Sidebar
            searchHistory={searchHistory}
            favorites={favorites}
            onUseHistory={handleUseHistoryItem}
            onToggleFavorite={handleToggleFavorite}
            onAddFavoriteToSearch={handleAddFavoriteToSearch}
            currentQuery={searchQuery}
          />

          {/* Stats Dashboard */}
          <StatsDashboard stats={stats} itemCount={filteredData.length} />
        </aside>
      </div>

      {/* Performance Guide */}
      <PerformanceGuide />
    </div>
  );
}