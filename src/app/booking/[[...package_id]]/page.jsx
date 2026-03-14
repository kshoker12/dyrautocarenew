import BookingClient from '@/components/booking/BookingClient';
import Navigation from '@/layouts/Navigation';
import dataJson from '@/lib/constants/data.json';

export default function BookingPage({ params }) {
  const idParam = params?.package_id?.[0];
  const packageId = idParam != null ? Number(idParam) : 0;
  const safePackageId = packageId >= 0 && packageId < (dataJson.packagesNew?.length || 0) ? packageId : 0;
  return (
    <Navigation title="Booking" navColor footer={true}>
      <BookingClient packageId={safePackageId} />
    </Navigation>
  );
}
