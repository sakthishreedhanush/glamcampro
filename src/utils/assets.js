/**
 * Safely resolves an asset path considering Vite's base URL and GitHub Pages deployment.
 * Guarantees paths work with or without trailing slashes and across localhost and GitHub Pages.
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

  // Strip any leading '/', './', or repeated 'glamcampro/'
  let cleanPath = path.replace(/^(\.\/|\/)/, '');
  if (cleanPath.startsWith('glamcampro/')) {
    cleanPath = cleanPath.slice('glamcampro/'.length);
  }

  // In the browser, check if we are on GitHub Pages
  if (typeof window !== 'undefined') {
    if (
      window.location.hostname.includes('github.io') ||
      window.location.pathname.startsWith('/glamcampro')
    ) {
      return `/glamcampro/${cleanPath}`;
    }
  }

  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
}
