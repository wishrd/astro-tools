import { readFile } from 'fs';

function getTranslations(propOrObj, stack = []) {
  if (typeof propOrObj === 'string') {
    return [{ key: stack.join('.'), value: propOrObj }];
  }

  const keys = Object.keys(propOrObj);
  return keys.flatMap(key => getTranslations(propOrObj[key], stack.concat(key)));
}

function mapTranslations(propOrObj)  {
  return getTranslations(propOrObj).reduce((obj, translation) => {
    obj[translation.key] = translation.value;
    return obj;
  }, {});
}

export function i18nSchemaLoder(filePath) {
  return () => new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) return reject(err);
      resolve(mapTranslations(JSON.parse(data.toString())));
    });
  });
}
