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

function createContent(): HTMLElement {
  const content = document.createElement('div');
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.overflowY = 'auto';
  return content;
}

export default defineToolbarApp({
  init: async (canvas) => {
    const toolbarWindow = document.createElement('astro-dev-toolbar-window');
    const toolbarWindowContent = createContent();
    toolbarWindow.appendChild(createHeader('Transfer state'));
    toolbarWindow.appendChild(toolbarWindowContent);

    const transferState = document.getElementById('astro-tools-transfer-state');

    if (!transferState || !transferState.textContent) {
      toolbarWindowContent.textContent = 'Transfer state element not found';
    } else if (!transferState.textContent) {
      toolbarWindowContent.textContent = 'Transfer state element is empty';
    } else {
      let textContent: string | null = null;

      try {
        textContent = JSON.parse(transferState.textContent);
      } catch (err) {
        console.error(err);
      }

      if (!textContent) {
        toolbarWindowContent.textContent =
          'Transfer state content is not valid';
      } else {
        if (Object.keys(textContent).length > 0) {
          await import('@alenaksu/json-viewer');

          const jsonViewer = document.createElement('json-viewer');
          jsonViewer.style.padding = '0 1rem';
          jsonViewer.textContent = JSON.stringify(textContent);
          toolbarWindowContent.appendChild(jsonViewer);
        } else {
          toolbarWindowContent.textContent = 'Transfer state is empty';
        }
      }
    }

    canvas.appendChild(toolbarWindow);
  },
});
