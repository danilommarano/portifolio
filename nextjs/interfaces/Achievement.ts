import { Tech } from "./Technology";

export interface Achievement {
    collectionId: string;
    collectionName: string;
    created: string;
    description: string;
    expand: {
        tech: Tech[];
        type: {
            collectionId: string;
            collectionName: string;
            created: string;
            id: string;
            name: string;
            updated: string;
        };
    };
    id: string;
    link: string;
    status: string;
    subtitle: string;
    tech: string[];
    title: string;
    type: string;
    updated: string;
}
