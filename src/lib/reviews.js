import { prisma } from './prisma';
import { safeRating } from './helpers';

/**
 * Fetch reviews for the home page from the database.
 * Returns plain, serializable objects with rating clamped to 0–5 to avoid Rating component errors.
 */
export async function getReviews() {
  try {
    const rows = await prisma.review.findMany();
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => ({
      id: r.id,
      date: r.date ?? '',
      link: r.link ?? '',
      rating: safeRating(r.rating),
      review_id: r.review_id ?? '',
      snippet: r.snippet ?? '',
      username: r.username ?? '',
      userlink: r.userlink ?? '',
      userreviews: typeof r.userreviews === 'number' && Number.isInteger(r.userreviews) ? r.userreviews : -1,
      userthumbnail: r.userthumbnail ?? '',
    }));
  } catch (_) {
    return [];
  }
}
