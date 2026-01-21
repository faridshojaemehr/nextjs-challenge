import { Item } from "./state.interface";

export interface VirtualListProps {
    items: Item[];
    itemHeight: number;
    containerHeight: number;
}
