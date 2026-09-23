/**
 * Safely resolves an asset path considering Vite's base URL (e.g. for GitHub Pages).
 * Ensures paths resolve properly whether deployed to root domain, subpath, or local dev.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading '/' or './'
  const cleanPath = path.replace(/^(\.\/|\/)/, '');
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
