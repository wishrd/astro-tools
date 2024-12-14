import { defineToolbarApp } from 'astro/toolbar';

function createHeader(text: string): HTMLElement {
  const header = document.createElement('header');
  const title = document.createElement('div');
  const brand = document.createElement('div');
  brand.textContent = 'Astro Tools';
  title.textContent = text;

  header.appendChild(title);
  header.appendChild(brand);

  header.style.display = 'flex';
  header.style.flexDirection = 'row';
  header.style.justifyContent = 'space-between';
  header.style.fontWeight = 'bold';
  header.style.marginBlockEnd = '1rem';

  return header;
}

export default defineToolbarApp({
  init: async (canvas) => {
    const toolbarWindow = document.createElement('astro-dev-toolbar-window');
    toolbarWindow.appendChild(createHeader('Transfer state'));

    const transferState = document.getElementById('astro-tools-transfer-state');

    if (!transferState || !transferState.textContent) {
      toolbarWindow.textContent = 'Transfer state element not found';
    } else if (!transferState.textContent) {
      toolbarWindow.textContent = 'Transfer state element is empty';
    } else {
      let textContent: string | null = null;

      try {
        textContent = JSON.parse(transferState.textContent);
      } catch (err) {
        console.error(err);
      }

      if (!textContent) {
        toolbarWindow.textContent = 'Transfer state content is not valid';
      } else {
        await import('@alenaksu/json-viewer');

        const jsonViewer = document.createElement('json-viewer');
        jsonViewer.style.padding = '0 1rem';
        jsonViewer.textContent = JSON.stringify(textContent);
        toolbarWindow.appendChild(jsonViewer);
      }
    }

    canvas.appendChild(toolbarWindow);
  },
});
