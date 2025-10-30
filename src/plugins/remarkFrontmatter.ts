import { visit } from 'unist-util-visit';

export function remarkFrontmatter() {
    return (tree: any, file: any) => {
        let frontmatter: Record<string, any> = {};

        visit(tree, 'yaml', (node: any) => {
            frontmatter = node.value;
        });

        file.data.frontmatter = frontmatter;
    };
}