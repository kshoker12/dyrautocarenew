import GalleryClient from '@/components/gallery/GalleryClient';
import Navigation from '@/layouts/Navigation';

export default function GalleryPage() {
  return (
    <Navigation title="Gallery" navColor footer={false}>
      <GalleryClient />
    </Navigation>
  );
}
