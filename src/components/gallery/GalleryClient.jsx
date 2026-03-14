'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Carousel } from '@material-tailwind/react';
import dataJson from '@/lib/constants/data.json';
import TopArrow from '@/components/TopArrow';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { route } from '@/lib/routes';
import { normalizePath } from '@/lib/helpers';

export default function GalleryClient() {
  const heroRef = useRef();
  const ceramicRef = useRef();
  const interiorRef = useRef();
  const beforeRef = useRef();
  const [insideAboutUs, setInsideAboutUs] = useState(false);
  const router = useRouter();

  const { beforeAfter, exterior2, interior } = useMemo(() => dataJson.gallery || {}, []);

  useEffect(() => {
    const currentDiv = heroRef.current;
    const handleScroll = () => {
      if (heroRef.current && heroRef.current.scrollTop > 50) setInsideAboutUs(true);
      else setInsideAboutUs(false);
    };
    if (currentDiv) currentDiv.addEventListener('scroll', handleScroll);
    return () => currentDiv?.removeEventListener('scroll', handleScroll);
  }, []);

  const exteriorList = exterior2 || [];
  const interiorList = interior || [];
  const beforeAfterList = beforeAfter || [];

  return (
    <>
      <div className="hero min-h-screen overflow-hidden z-0" style={{ backgroundImage: 'url(/images/bg2.jpg)' }}>
        <div ref={heroRef} className="hero-overlay bg-opacity-40 bg-black h-screen overflow-y-scroll flex-col flex">
          <div className="flex items-center justify-center mt-32 mb-10" />
          <div className="flex flex-row items-center justify-center mb-10" id="ceramic" ref={ceramicRef}>
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              <div className="w-full space-y-5 border-white py-6 px-10 border-[1px] xl:col-span-4 lg:col-span-3 sm:col-span-2 col-span-1">
                <h1 className="text-5xl font-bold text-white text-center uppercase">Gallery</h1>
                <div className="flex items-center justify-center space-x-4">
                  <PrimaryButton className="text-white bg-primary-orange duration-300 ease-in-out" onClick={() => router.push(route('booking'))}>
                    Book Now
                  </PrimaryButton>
                  <SecondaryButton onClick={() => router.push(`${route('home')}#aboutus`)}>About Us</SecondaryButton>
                </div>
              </div>
              <div className="xl:col-span-4 lg:col-span-3 sm:col-span-2 col-span-1" />
              {exteriorList.map((image) => (
                <div key={image} className="md:h-[280px] md:w-[280px] sm:h-[260px] sm:w-[260px] w-[350px] h-[350px] shadow-black shadow-lg overflow-hidden relative">
                  <Image src={normalizePath(image)} alt="" fill className="object-cover" sizes="(max-width: 768px) 350px, 280px" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-10" ref={interiorRef}>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {interiorList.map((image) => (
                <div key={image} className="md:h-[280px] md:w-[280px] sm:h-[260px] sm:w-[260px] w-[350px] h-[350px] shadow-black shadow-lg overflow-hidden relative">
                  <Image src={normalizePath(image)} alt="" fill className="object-cover" sizes="(max-width: 768px) 350px, 280px" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center justify-center bg-gray-100 w-full" ref={beforeRef}>
            <Carousel
              id="beforeafter"
              loop
              autoplay
              className="bg-gray-300 md:m-10 m-4 h-fit w-full shadow-lg shadow-gray-400 py-4"
              prevArrow={({ handlePrev }) => (
                <button type="button" className="!absolute top-2/4 left-4 -translate-y-2/4 hover:rounded-full hover:bg-gray-700/50 lg:w-16 lg:h-16 h-12 w-12 sm:block hidden" onClick={handlePrev}>
                  <i className="fas fa-chevron-left lg:text-5xl text-3xl text-primary-orange" />
                </button>
              )}
              nextArrow={({ handleNext }) => (
                <button type="button" className="!absolute top-2/4 right-4 -translate-y-2/4 hover:rounded-full hover:bg-gray-700/50 lg:w-16 lg:h-16 h-12 w-12 sm:block hidden" onClick={handleNext}>
                  <i className="fas fa-chevron-right lg:text-5xl text-3xl text-primary-orange" />
                </button>
              )}
              navigation={({ setActiveIndex, activeIndex, length }) => {
                const safeLength = Math.max(0, Math.min(Number(length) || 0, 100));
                return (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {Array.from({ length: safeLength }, (_, i) => (
                    <span
                      key={i}
                      role="button"
                      tabIndex={0}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? 'w-8 bg-primary-orange' : 'w-4 bg-gray-800/50'}`}
                      onClick={() => setActiveIndex(i)}
                      onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(i)}
                    />
                  ))}
                </div>
                );
              }}
            >
              {beforeAfterList.map((item) => (
                <div key={item.before} className="flex md:flex-row md:space-x-2 md:space-y-0 space-y-10 items-center justify-center flex-col p-6">
                  <div className="flex-col space-y-1 items-start justify-center">
                    <h3 className="text-[#263d4d] text-4xl font-bold font-sans">Before</h3>
                    <div className="2xl:h-[500px] 2xl:w-[500px] xl:h-[400px] xl:w-[400px] md:h-64 md:w-64 sm:h-72 sm:w-72 h-64 w-64 relative">
                      <Image src={normalizePath(item.before)} alt="Before" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="flex-col space-y-1 items-start justify-center">
                    <h3 className="text-[#263d4d] text-4xl font-bold font-sans">After</h3>
                    <div className="2xl:h-[500px] 2xl:w-[500px] xl:h-[400px] xl:w-[400px] md:h-64 md:w-64 sm:h-72 sm:w-72 h-64 w-64 relative">
                      <Image src={normalizePath(item.after)} alt="After" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <TopArrow className="" clickAction={() => heroRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} />
    </>
  );
}
