'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TopArrow from '@/components/TopArrow';
import Additional from './Additional';
import Services from './Services';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import IconHeader from '@/components/IconHeader';
import HeaderSubText from '@/components/HeaderSubText';
import { Alert } from '@material-tailwind/react';
import dataJson from '@/lib/constants/data.json';
import { route } from '@/lib/routes';

export default function HomeClient({ alert, reviews, heroRef: heroRefProp, aboutUsRef: aboutUsRefProp }) {
  const heroRefInternal = useRef();
  const aboutUsRefInternal = useRef();
  const heroRef = heroRefProp ?? heroRefInternal;
  const aboutUsRef = aboutUsRefProp ?? aboutUsRefInternal;
  const [showAlert, setShowAlert] = useState(alert != null);
  const slideShow = useMemo(() => dataJson.homeSlideShow || [], []);
  const router = useRouter();

  useEffect(() => {
    setShowAlert(alert != null);
  }, [alert]);

  const imagePath = slideShow[0] ? (slideShow[0].startsWith('/') ? slideShow[0] : `/${slideShow[0]}`) : '/images/bg2.jpg';

  return (
    <>
      <div
        ref={heroRef}
        className="relative w-full"
        style={{
          minHeight: '440px',
          height: 'calc(100vw * 0.5625)',
          maxHeight: '100vh',
        }}
      >
        {/* Video: z-0 so it stays visible; Laravel uses z-[-1] but overlay is not full-size there */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/images/gallery2/bgvideo.mp4"
          poster="/images/bg2.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Overlay: semi-transparent black so video shows through; matches Laravel hero-overlay bg-opacity-40 bg-black */}
        <div className="hero-overlay absolute inset-0 z-10 bg-black bg-opacity-40">
          <div className="text-neutral-content text-center h-full flex items-end justify-center gap-[1rem] p-[1rem]">
            {showAlert && (
              <Alert className="absolute z-50 top-24 md:max-w-lg max-w-md" color="green" open={showAlert} onClose={() => setShowAlert(false)}>
                {alert}
              </Alert>
            )}
            <div className="md:max-w-6xl max-w-xl space-y-5" data-aos="fade-down" data-aos-delay={50}>
              <p className=""></p>
              <div className="flex items-center justify-center space-x-4">
                <PrimaryButton className="text-white bg-primary-orange duration-300 ease-in-out" onClick={() => router.push(route('booking'))}>
                  Book Now
                </PrimaryButton>
                <SecondaryButton onClick={() => aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                  About Us
                </SecondaryButton>
              </div>
              <h3 className="lg:text-4xl uppercase md:text-3xl sm:text-2xl text-xl text-white">Protect Your Investment at Detail Your Ride</h3>
            </div>
          </div>
        </div>
      </div>
      <div id="aboutus" ref={aboutUsRef} className="bg-white h-fit flex flex-col py-8">
        <div className="flex xl:flex-row flex-col lg:items-start items-center justify-center rounded-xl 2xl:px-44 lg:px-16 md:px-20 px-10 self-center lg:space-x-12 lg:space-y-0 space-y-4">
          <div data-aos="fade-right" data-aos-delay={100}>
            <IconHeader title="About Us" icon="fa fa-user text-3xl" />
            <HeaderSubText className="text-start ml-14">
              At DYR Autocare, we&apos;re not just a company; we&apos;re a passionate team dedicated to treating your car with the love and care it deserves. Think of us as your car&apos;s best friend!
            </HeaderSubText>
            <IconHeader title="What we do" icon="fa fa-briefcase text-3xl" />
            <HeaderSubText className="text-start ml-14">
              <p><i className="fas fa-check text-primary-orange mr-2" />We go beyond the surface – offering the safest, top-notch interior clean.</p>
              <p><i className="fas fa-check text-primary-orange mr-2" />An exterior wash that brings out the shine your car deserves.</p>
              <p><i className="fas fa-check text-primary-orange mr-2" />We specialize in ceramic coating and paint corrections, ensuring your car receives the royal treatment it craves.</p>
            </HeaderSubText>
            <IconHeader title="Our Mission" icon="fa fa-flag" />
            <HeaderSubText className="text-start ml-14">
              We&apos;re not just about cars; we&apos;re about creating an experience, treating you like family every step of the way. Choose DYR Autocare for a ride that sparkles inside and out!
            </HeaderSubText>
          </div>
          <div className="rounded-xl shadow-black shadow-lg overflow-hidden xl:w-[700px] w-[400px] h-auto" data-aos="fade-left" data-aos-delay={100}>
            <Image src={imagePath} alt="" width={700} height={400} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <Services />
      <Additional reviews={reviews || []} />
      <TopArrow className="" clickAction={() => heroRef.current?.scrollIntoView({ behavior: 'smooth' })} />
    </>
  );
}
