'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dataJson from '@/lib/constants/data.json';
import TopArrow from '@/components/TopArrow';
import Video from '@/components/Video';
import { normalizePath } from '@/lib/helpers';

function slugify(str) {
  return str.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export default function FaqClient() {
  const heroRef = useRef();
  const [insideAboutUs, setInsideAboutUs] = useState(false);
  const faqs = useMemo(() => dataJson.faqs || [], []);

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

  return (
    <>
      <section
        id="faq"
        ref={heroRef}
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/faq/city.webp')" }}
      >
        <div className="bg-black absolute w-full h-full opacity-40" />
        <section className="faq-info flex justify-center items-center h-full space-x-4">
          <div className="faq-info-container grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-5/6">
            {faqs.map((faq) => (
              <Link
                href={`#${slugify(faq.question)}`}
                key={faq.question}
                className="hover:opacity-70 transition-opacity duration-150 ease-in-out row-span-1 z-20"
              >
                <div
                  className="rounded-xl bg-cover bg-center border-white border-2 flex justify-center items-center lg:h-[30vh] h-[22vh]"
                  style={{ backgroundImage: "url('/images/bg2.jpg')" }}
                >
                  <h1 className="text-white p-3 lg:text-xl text-md font-semibold text-center">{faq.question}</h1>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
      <main id="main" className="py-1 bg-gray-100">
        {faqs.map((faq) => (
          <div key={faq.question} id={slugify(faq.question)} className="m-20 shadow-md shadow-gray-400">
            <section id="about" className="about p-10">
              <div className="container mx-auto" data-aos="fade-up">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-1/2 pt-3 lg:pt-0 text-black">
                    <h3 className="text-[#263d4d] text-4xl font-bold font-sans mb-4">{faq.question}</h3>
                    {faq.answers.map((answer, index) => (
                      <div key={index} className="mb-6">
                        {typeof answer === 'object' && answer.details ? (
                          <ul className="list-disc pl-6">
                            {answer.details.map((detail, i) => (
                              <li key={i} className="mb-2 flex items-start">
                                <span className="mr-2 text-yellow-500">✔</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="italic text-lg">{typeof answer === 'string' ? answer : ''}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="w-full lg:w-1/2 flex justify-center" data-aos="zoom-in" data-aos-delay="100">
                    <div className="w-96 lg:ml-24 relative h-64">
                      {faq.video ? (
                        <Video
                          className="p-2 w-full h-full object-cover"
                          src={normalizePath(faq.video)}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          className="p-2 object-cover"
                          src={normalizePath(faq.image)}
                          alt="FAQ"
                          fill
                          sizes="384px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </main>
      <TopArrow className="" clickAction={() => heroRef.current?.scrollIntoView({ behavior: 'smooth' })} />
    </>
  );
}
