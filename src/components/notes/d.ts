export interface PaperNote {
    id: number;
    title: string;
    date: string;
    readTime: string;
    summary: string;
    tags: string[];
    link: string;
};

export interface MediumBlogItem {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    image?: string | null;
    summary: string;
    readTime: string;
    categories: string[];
};

export interface RssResponse { items?: RssItem[] };

interface RssItem {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    categories?: string[];
};