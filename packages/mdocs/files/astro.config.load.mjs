export async function loadConfig() {
  return import(/* @vite-ignore */ process.env.REPO_DOCS_CONFIG_FILE).then(
    (m) => m.default.starlight,
  );
}
