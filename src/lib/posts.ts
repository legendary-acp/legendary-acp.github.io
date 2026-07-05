import type { JSX } from 'react';
import type { PaperNote } from '../components/notes/d';

type MDXComponent = (props: unknown) => JSX.Element;

interface MDXModule {
    default: MDXComponent;
    frontmatter?: PaperNote;
}

const componentModules = import.meta.glob<MDXModule>('../posts/*.md', {
    eager: true,
});

type PaperNoteRecord = {
    meta: PaperNote;
    Component: MDXComponent;
};

const posts: PaperNoteRecord[] = Object.entries(componentModules)
    .map(([path, mod]) => {
        const Component = mod.default;
        const frontmatter = mod.frontmatter;

        if (!frontmatter || !frontmatter.title) {
            console.warn('Missing frontmatter in', path);
            return null;
        }

        const filename = path.split('/').pop()?.replace(/\.md$/, '') || '';
        const slug = frontmatter.slug || filename;

        const readTime = frontmatter.readTime || "NA";

        const meta: PaperNote = {
            title: frontmatter.title,
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            slug,
            description: frontmatter.description || '',
            tags: frontmatter.tags || [],
            readTime,
            paperId: frontmatter.paperId,
        };

        return {
            meta,
            Component,
        };
    })
    .filter((item): item is PaperNoteRecord => item !== null);

posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

export function getAllPaperNotes(): PaperNote[] {
    return posts.map(p => p.meta).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPaperNotesBySlug(slug: string): PaperNoteRecord | null {
    return posts.find(p => p.meta.slug === slug) ?? null;
}

export function getPaperNoteByPaperId(paperId: string): PaperNote | null {
    return posts.find(p => p.meta.paperId === paperId)?.meta ?? null;
}
