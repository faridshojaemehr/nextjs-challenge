export interface SidebarProps {
    searchHistory: string[];
    favorites: string[];
    onUseHistory: (query: string) => void;
    onToggleFavorite: (query: string) => void;
    onAddFavoriteToSearch: (query: string) => void;
}

export interface HistoryItemProps {
    query: string;
    isFavorite: boolean;
    onUse: (query: string) => void;
    onToggleFavorite: (query: string) => void;
}
