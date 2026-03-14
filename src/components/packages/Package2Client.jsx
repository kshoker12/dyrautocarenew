'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import dataJson from '@/lib/constants/data.json';
import Navigation from '@/layouts/Navigation';
import PrimaryButton from '@/components/PrimaryButton';
import { extractCategories } from '@/lib/helpers';
import { route } from '@/lib/routes';
import Video from '@/components/Video';
import { normalizePath } from '@/lib/helpers';

export default function Package2Client({ packageType }) {
  const heroRef = useRef();
  const [insideAboutUs, setInsideAboutUs] = useState(false);
  const currCategory = useMemo(
    () => extractCategories().find((category) => category.codeName === packageType),
    [packageType]
  );

  useEffect(() => {
    const handleScroll = () => {
      const target = heroRef.current;
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.innerHeight / 1.2;
        const viewportHeight = window.innerHeight - 200;
        setInsideAboutUs(targetPosition <= viewportHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router = useRouter();

  if (!currCategory) return null;

  return (
    <Navigation title={currCategory.name} navColor={insideAboutUs}>
      <div ref={heroRef} className="hero min-h-screen z-0" style={{ backgroundImage: 'url(/images/bg2.jpg)' }}>
        <div className="hero-overlay bg-opacity-40 bg-black h-fit min-h-screen flex flex-col items-center justify-center space-y-6 py-[14vh] px-2">
          {currCategory.packages.map((subPackage) => (
            <Card key={subPackage.name} className="max-w-[60rem] w-full shadow-lg shadow-gray-800">
              <div className="flex sm:flex-row flex-col w-full">
                <CardHeader shadow={false} floated={false} className="m-4 sm:w-2/5 w-11/12 self-center shrink-0 rounded-r-none">
                  <div className="h-96 w-full relative">
                    {subPackage.video ? (
                      <Video
                        src={normalizePath(subPackage.video)}
                        poster={normalizePath(subPackage.image)}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        priority
                      />
                    ) : (
                      <Image
                        src={normalizePath(subPackage.image)}
                        alt="card-image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 40vw"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col w-full">
                  <Typography variant="h6" color="gray" className="mb-1 uppercase">
                    {currCategory.name}
                  </Typography>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {subPackage.name}
                  </Typography>
                  <div className="flex flex-col flex-grow">
                    {subPackage.description && (
                      <Typography color="gray" className="mb-1 font-normal">
                        {subPackage.description}
                      </Typography>
                    )}
                    <ul className="flex flex-col mb-1">
                      {(subPackage.includes || []).map((inc) => (
                        <li key={inc} className="flex items-center gap-0.5">
                          <i className="fas fa-check text-primary-orange mr-2" />
                          <Typography className="font-normal">{inc}</Typography>
                        </li>
                      ))}
                    </ul>
                    {subPackage.addons && (
                      <ul className="flex flex-col mb-1">
                        <Typography variant="h6" color="black">
                          Addons
                        </Typography>
                        {subPackage.addons.map((addon) => (
                          <li key={addon} className="flex items-center gap-0.5">
                            <i className="fas fa-plus-circle text-green-700 mr-2" />
                            <Typography className="font-normal">{addon}</Typography>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col justify-center items-start">
                      {(subPackage.price || []).map((price) => (
                        <Typography key={price} className="font-normal" color="black">
                          {price}
                        </Typography>
                      ))}
                    </div>
                    <PrimaryButton
                      className="bg-primary-orange text-white hover:border-gray-600 hover:text-gray-600 min-w-fit"
                      onClick={() => router.push(route('booking', subPackage.id))}
                    >
                      Book Now
                    </PrimaryButton>
                  </div>
                </CardBody>
              </div>
              <span className="border-b-[1px] border-gray-500 mx-6" />
              {subPackage.descriptions?.map(({ text, image }, index) => (
                <div
                  key={index}
                  className={`flex ${index === 0 ? 'flex-col items-center' : 'sm:flex-row flex-col sm:items-start items-center gap-2'} justify-center space-y-4 md:space-y-0 md:space-x-4 ${index === 1 ? 'md:flex-row-reverse' : ''} mb-6`}
                >
                  <Typography color="gray" className={`mb-1 font-normal md:text-left p-5 text-left ${index === 1 ? 'max-w-md' : ''}`}>
                    {text}
                  </Typography>
                  <div className={`flex flex-wrap justify-center md:justify-start ${index === 0 ? 'gap-16' : ''}`}>
                    {(image || []).map((path, imgIndex) => (
                      <div key={imgIndex} className="lg:w-96 lg:h-96 md:w-72 md:h-72 sm:w-80 sm:h-80 w-96 h-96 relative">
                        <Image
                          src={normalizePath(path)}
                          alt="Description"
                          fill
                          className="object-cover rounded-lg shadow-md"
                          sizes="384px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {subPackage.beforeAndAfters && (
                <div className="flex flex-row flex-wrap gap-16 justify-center pb-8">
                  {subPackage.beforeAndAfters.map(({ before, after }) => (
                    <span key={before} className="contents">
                      <div className="lg:w-96 lg:h-96 md:w-72 md:h-72 sm:w-80 sm:h-80 w-96 h-96 relative">
                        <Image src={normalizePath(before)} alt="Before" fill className="object-cover rounded-lg shadow-md" sizes="384px" />
                      </div>
                      <div className="lg:w-96 lg:h-96 md:w-72 md:h-72 sm:w-80 sm:h-80 w-96 h-96 relative">
                        <Image src={normalizePath(after)} alt="After" fill className="object-cover rounded-lg shadow-md" sizes="384px" />
                      </div>
                    </span>
                  ))}
                </div>
              )}
              {subPackage.steps && (
                <CardBody className="w-full">
                  {subPackage.steps.steps && (
                    <Typography variant="h6" color="black">
                      {subPackage.steps.intro}
                    </Typography>
                  )}
                  {(subPackage.steps.list || []).map((step, index) => (
                    <span key={index} className="contents">
                      {subPackage.steps.steps && !subPackage.steps.stepsList && (
                        <Typography variant="h6" className="border-t-[1px] border-gray-300 pt-1" color="black">
                          {`Step ${index + 1}`}
                        </Typography>
                      )}
                      {subPackage.steps.stepsList && (
                        <Typography variant="h6" className={`${index !== 0 ? 'border-t-[1px] border-gray-300' : ''} pt-1`} color="black">
                          {subPackage.steps.stepsList[index]}
                        </Typography>
                      )}
                      <Typography className={`font-normal ${!subPackage.steps.steps && index !== 0 && !subPackage.steps.stepsList ? 'border-t-[1px] border-gray-500 pt-1' : ''}`}>
                        {step}
                      </Typography>
                    </span>
                  ))}
                </CardBody>
              )}
              {subPackage.video2 && (
                <div className="h-96 w-full">
                  <Video src={normalizePath(subPackage.video2)} className="h-full w-full object-contain" controls preload="auto" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Navigation>
  );
}
