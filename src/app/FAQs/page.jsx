import FaqClient from '@/components/faq/FaqClient';
import Navigation from '@/layouts/Navigation';

export default function FAQsPage() {
  return (
    <Navigation title="FAQs" navColor footer={true}>
      <FaqClient />
    </Navigation>
  );
}
