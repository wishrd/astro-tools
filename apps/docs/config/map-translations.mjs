function getTranslations(propOrObj, stack = []) {
  if (typeof propOrObj === 'string') {
    return [{ key: stack.join('.'), value: propOrObj }];
  }

  const keys = Object.keys(propOrObj);
  return keys.flatMap(key => getTranslations(propOrObj[key], stack.concat(key)));
}

export function mapTranslations(propOrObj)  {
  return getTranslations(propOrObj).reduce((obj, translation) => {
    obj[translation.key] = translation.value;
    return obj;
  }, {});
}
