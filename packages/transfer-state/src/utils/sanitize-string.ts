const ESCAPED_CHARS: Record<string, string> = {
  '<': '\\u003C',
  '>': '\\u003E',
  "'": '\\u0027',
  '"': '\\u0022',
  '&': '\\u0026',
};

const ESCAPED_CHARS_REVERSE = Object.fromEntries(
  Object.entries(ESCAPED_CHARS).map(([key, value]) => [value, key]),
);

export function escapeString(str: string): string {
  const len = str.length;

  let sanitizedString = '';
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    if (!char) {
      continue;
    }

    const replacement = ESCAPED_CHARS[char];
    sanitizedString += replacement ?? char;
  }

  return sanitizedString;
}

export function unescapeString(str: string): string {
  return str.replace(/(\\u[\d\w]{4})/gi, (_, grp) => {
    return ESCAPED_CHARS_REVERSE[grp] ?? grp;
  });
}
