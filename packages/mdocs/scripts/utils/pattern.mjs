const extensions = ['markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'md', 'mdx'];
export const DEFAULT_PATTERN = ['!**/node_modules/', `**/[^_]*.{${extensions.join(',')}}`];
