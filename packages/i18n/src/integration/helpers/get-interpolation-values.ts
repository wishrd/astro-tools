export function getInterpolationValues(
  translation: string,
): Array<{ key: string; type: string }> {
  return (translation.match(/\{\w+(:\w+)?\}/g) || []).map((match) => {
    const [key, type = 'string'] = match.replace(/{|}/g, '').trim().split(':');
    if (!key) {
      throw new Error(`Key interpolation value on match ${match} not found`);
    }

    return { key, type };
  });
}
