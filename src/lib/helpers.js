import dataJson from './constants/data.json';

/**
 * Ensure path works from public root (prefix / if missing).
 * @param {string} path
 * @returns {string}
 */
export function normalizePath(path) {
  if (!path || typeof path !== 'string') return path;
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Extract package categories from data (same structure as Laravel).
 * @returns {Array<Object>}
 */
export function extractCategories() {
  const packageCategories = dataJson.categories.map((category) => {
    const categoryObject = {
      name: category.name,
      packages: [],
      id: category.id,
      codeName: category.codeName,
      image: category.image,
    };
    dataJson.packagesNew.forEach((pack) => {
      if (pack.categoryId === category.id) {
        categoryObject.packages.push(pack);
      }
    });
    return categoryObject;
  });
  return packageCategories;
}

/**
 * Safe 0–5 rating (for display/average).
 * @param {unknown} value
 * @returns {number}
 */
export function safeRating(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(5, Math.max(0, n));
}

/**
 * Integer 0–5 only. Use this for Material Tailwind Rating's value prop — library
 * does Array(value) and Array(count-value); any float or value > 5 causes Invalid array length.
 * @param {unknown} value
 * @returns {number}
 */
export function ratingInteger(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(5, Math.max(0, Math.round(n)));
}

/**
 * Extract average review ratings.
 * @param {Array<Object>} reviews
 * @returns {number}
 */
export function extractAverageRating(reviews) {
  if (!reviews || !Array.isArray(reviews) || !reviews.length) return 0;
  const sum = reviews.reduce((total, currRev) => total + (Number(currRev?.rating) || 0), 0);
  const avg = sum / reviews.length;
  return safeRating(Number.isFinite(avg) ? avg : 0);
}
