const extensions = ['markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'md', 'mdx'] as const;
export const DEFAULT_PATTERN = ['!**/node_modules/', `**/[^_]*.{${extensions.join(',')}}`] as const;
