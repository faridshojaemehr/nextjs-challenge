import { ReactNode } from "react";

export interface AccordionItemProps {
    title: string;
    content: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}
