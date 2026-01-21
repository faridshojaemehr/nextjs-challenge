"use client";

import React, { useState, useMemo, useCallback, useDeferredValue } from "react";
import { SearchContainer } from "./_components/SearchContainer";
import { StatsDashboard } from "./_components/StatsDashboard";
import { Sidebar } from "./_components/Sidebar";
import { ActionBox } from "./_components/ActionBox";
import { calculateStats } from "./_lib/statsCalculator";
import styles from "./style.module.scss";
import { Item } from "./_types/state.interface";
import dynamic from "next/dynamic";
import { VirtualList } from "./_components/VirtualList";

const PerformanceGuide = dynamic(
  () =>
    import("./_components/PerformanceGuide").then(
      (mod) => mod.PerformanceGuide,
    ),
  { ssr: false },
);

interface ClientPageProps {
  initialData: Item[];
}

export default function ClientPage({ initialData }: ClientPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Use deferred value for search to keep UI responsive
  // This helps prevents the input from freezing while the heavy list/stats update
  const deferredQuery = useDeferredValue(searchQuery);

  // Memoize filtered data
  // Using deferredQuery here ensures the heavy filter operation doesn't block the input update
  const filteredData = useMemo(() => {
    if (!deferredQuery) return initialData;

    const lowerQuery = deferredQuery.toLowerCase();
    return initialData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery),
    );
  }, [initialData, deferredQuery]);

  // Memoize stats calculation - this was an expensive operation running on every render
  const stats = useMemo(() => calculateStats(filteredData), [filteredData]);

  // Stable handlers with useCallback
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    // Use functional update to check previous state without adding it as a dependency
    setSearchHistory((prev) => {
      if (query && !prev.includes(query)) {
        return [query, ...prev].slice(0, 10);
      }
      return prev;
    });
  }, []);

  const handleUseHistoryItem = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleToggleFavorite = useCallback((query: string) => {
    setFavorites((prev) =>
      prev.includes(query)
        ? prev.filter((fav) => fav !== query)
        : [...prev, query],
    );
  }, []);

  const handleAddFavoriteToSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>React Performance Interview Challenge</h1>
        <p>
          Explore performance optimization techniques and deep JavaScript
          concepts
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
            {/* Virtual List Container */}
            <div style={{ height: "800px" }}>
              {" "}
              {/* Fixed height for the container */}
              <VirtualList
                items={filteredData}
                itemHeight={160}
                containerHeight={800}
              />
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
          />

          {/* Stats Dashboard */}
          <StatsDashboard stats={stats} />
        </aside>
      </div>

      {/* Performance Guide */}
      <PerformanceGuide />
    </div>
  );
}
