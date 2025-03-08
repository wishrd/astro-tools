const DEFAULT_EXTENSIONS = ['markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'md', 'mdx'];

export const DEFAULT_PATTERN = ['!**/node_modules/', `**/[^_]*.{${DEFAULT_EXTENSIONS.join(',')}}`];
