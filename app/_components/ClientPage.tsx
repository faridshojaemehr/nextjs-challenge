"use client";

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useDeferredValue,
  useRef,
} from "react";
import dynamic from "next/dynamic";
import { SearchContainer } from "./SearchContainer";
import { StatsDashboard } from "./StatsDashboard";
import { Sidebar } from "./Sidebar";
import { ActionBox } from "./ActionBox";
import { VirtualList } from "./VirtualList";
import styles from "../_styles/style.module.scss";
import { Item, Stats } from "../_types/state.interface";
import { ClientPageProps } from "../_types/clientpage.interface";
import LoadingState from "./Loading";

const PerformanceGuide = dynamic(() => import("./PerformanceGuide"), {
  ssr: false,
});

export default function ClientPage({ initialData }: ClientPageProps) {
  const [items, setItems] = useState<Item[]>(initialData || []);
  const [searchQuery, setSearchQuery] = useState("");

  const deferredQuery = useDeferredValue(searchQuery);

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (items.length > 0) return;

    // Initialize Worker
    workerRef.current = new Worker(
      new URL("../_workers/data.worker.ts", import.meta.url),
    );

    workerRef.current.onmessage = (event) => {
      const { type, data } = event.data;
      if (type === "SUCCESS") {
        setItems(data);
        workerRef.current?.terminate();
      }
    };

    workerRef.current.postMessage({ type: "START", count: 500000 });

    return () => {
      workerRef.current?.terminate();
    };
  }, [items.length]);

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const { filteredData, stats } = useMemo(() => {
    let sum = 0;
    let maxValue = 0;
    let minValue = Infinity;
    const categoryCount: Record<string, number> = {};
    const lowerQuery = deferredQuery.toLowerCase();
    const result: Item[] = [];

    for (const item of items) {
      const matches =
        !lowerQuery ||
        item.titleLower.includes(lowerQuery) ||
        item.descriptionLower.includes(lowerQuery) ||
        item.categoryLower.includes(lowerQuery);

      if (matches) {
        result.push(item);

        // Stats Logic (accumulate on the fly)
        sum += item.value;
        maxValue = Math.max(maxValue, item.value);
        minValue = Math.min(minValue, item.value);
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
      }
    }

    // Finalize Stats
    const total = result.length;
    const average = total > 0 ? sum / total : 0;

    // Handle edge case where no items match (min should not be Infinity)
    if (total === 0) minValue = 0;

    const computedStats: Stats = {
      total,
      sum: sum.toFixed(2),
      average: average.toFixed(2),
      max: maxValue.toFixed(2),
      min: minValue.toFixed(2),
      categories: categoryCount,
    };

    return { filteredData: result, stats: computedStats };
  }, [items, deferredQuery]);

  // Handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

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

  if (items.length === 0) {
    return <LoadingState />;
  }

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
            {/* Memoized ActionBox with primitive props */}
            <ActionBox
              currentQuery={searchQuery}
              isFavorited={favoritesSet.has(searchQuery)}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Virtualized Heavy List */}
          <div className={styles.listContainer}>
            <h2>Results ({filteredData.length})</h2>
            <div style={{ height: "800px" }}>
              <VirtualList
                items={filteredData}
                itemHeight={160} // Matches CSS height + padding + border
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
