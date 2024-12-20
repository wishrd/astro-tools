export function getInterpolationValues(translation: string) {
  return (translation.match(/\{\w+(:\w+)?\}/g) || [])
    .map((match) => {
      const [key, type = 'string'] = match.replace(/{|}/g, '').trim().split(':');
      return { key, type };
    });
}
