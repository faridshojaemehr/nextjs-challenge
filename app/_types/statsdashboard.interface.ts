import { Stats } from "./state.interface";

export interface StatsDashboardProps {
    stats: Stats;
}

export interface StatCardProps {
    label: string;
    value: string;
}
