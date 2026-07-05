export type PaperNote = {
    title: string;
    date: string;
    slug: string;
    tags?: string[];
    description?: string;
    readTime: string;
    paperId?: string;
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