export function notifyHydration(id: string): void {
  dispatchEvent(new CustomEvent(`hydrated:${id}`));
}

export function listenHydration(id: string, callback: () => void): void {
  addEventListener(`hydrated:${id}`, () => callback());
}
