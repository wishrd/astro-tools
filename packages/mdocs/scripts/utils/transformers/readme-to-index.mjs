export function readmeToIndexTransformer(file) {
  return {...file, output: file.output.replace('README', 'index') };
}
