export interface ActionBoxProps {
    currentQuery: string;
    isFavorited: boolean;
    onToggleFavorite: (query: string) => void;
}