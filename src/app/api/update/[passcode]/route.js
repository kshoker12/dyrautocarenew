import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { safeRating } from '../../../../lib/helpers';

// Mirror Laravel routes/web.php GET "/update/{passcode}"
const ALLOWED_PASSCODE = 'Reece1045$';
const PLACE_ID = 'ChIJB78oDxOVo6MRwoP3IshiEIU';

export async function GET(request, { params }) {
  const passcode = params?.passcode;
  if (passcode !== ALLOWED_PASSCODE) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    console.error('SERPAPI_KEY not set');
    return NextResponse.redirect(new URL('/home', request.url));
  }

  try {
    // 1. Same as Laravel: clear existing reviews first
    await prisma.review.deleteMany({});

    // 2. Same as Laravel: first page (no next_page_token)
    let reviews = [];
    let query = {
      engine: 'google_maps_reviews',
      place_id: PLACE_ID,
      api_key: apiKey,
    };

    let url = new URL('https://serpapi.com/search.json');
    Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    let res = await fetch(url.toString());
    let data = await res.json();

    const pageReviews = Array.isArray(data?.reviews) ? data.reviews : [];
    reviews = reviews.concat(pageReviews);
    let pagination = data?.serpapi_pagination ?? null;

    // 3. Same as Laravel: while pagination exists, fetch next page and merge
    while (pagination) {
      query = {
        engine: 'google_maps_reviews',
        place_id: PLACE_ID,
        next_page_token: pagination.next_page_token,
        api_key: apiKey,
      };
      url = new URL('https://serpapi.com/search.json');
      Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));
      res = await fetch(url.toString());
      data = await res.json();

      const nextPageReviews = Array.isArray(data?.reviews) ? data.reviews : [];
      reviews = reviews.concat(nextPageReviews);
      pagination = data && typeof data.serpapi_pagination !== 'undefined' ? data.serpapi_pagination : null;
    }

    // 4. Same as Laravel: foreach($reviews as $review) -> map and save
    for (const review of reviews) {
      const snippet = typeof review.snippet !== 'undefined' ? review.snippet : '';
      const user = review.user;
      const username = user?.name ?? '';
      const userlink = user?.link ?? '';
      const userreviews = user && typeof user.reviews !== 'undefined' ? user.reviews : -1;
      const userthumbnail = user?.thumbnail ?? '';

      await prisma.review.create({
        data: {
          date: String(review.date ?? '').slice(0, 255),
          link: String(review.link ?? '').slice(0, 2048),
          rating: Math.round(safeRating(review.rating)),
          review_id: review.review_id ?? '',
          snippet,
          username,
          userlink,
          userreviews: Number.isInteger(userreviews) ? userreviews : -1,
          userthumbnail,
        },
      });
    }
  } catch (err) {
    console.error('SerpAPI sync error:', err);
  }

  return NextResponse.redirect(new URL('/home', request.url));
}
