import HomePageWrapper from '@/components/home/HomePageWrapper';
import { getReviews } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }) {
  const reviews = await getReviews();
  console.log('reviews', reviews);
  const alert = searchParams?.booking === 'success' ? 'Successfully Completed Booking. We will get back to you shortly' : null;
  return <HomePageWrapper alert={alert} reviews={reviews} />;
}
