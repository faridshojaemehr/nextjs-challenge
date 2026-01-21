export interface SearchContainerProps {
    query: string;
    onSearch: (query: string) => void;
    resultCount: number;
}
