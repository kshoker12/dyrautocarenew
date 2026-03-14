'use client';

import { useRef, useState, useEffect } from 'react';
import Navigation from '@/layouts/Navigation';
import HomeClient from './HomeClient';

/**
 * Wraps Home content with Navigation and owns scroll state so navColor (gray nav background)
 * can be passed to Navigation when user scrolls down. Matches Laravel: Home has insideAboutUs
 * and passes navColor={insideAboutUs} to Navigation.
 */
export default function HomePageWrapper({ alert, reviews }) {
  const heroRef = useRef(null);
  const aboutUsRef = useRef(null);
  const [insideAboutUs, setInsideAboutUs] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const target = heroRef.current;
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.innerHeight / 1.2;
        const viewportHeight = window.innerHeight - 300;
        setInsideAboutUs(targetPosition <= viewportHeight);
      }
    };
    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navigation title="Home" navColor={insideAboutUs} footer={true}>
      <HomeClient alert={alert} reviews={reviews} heroRef={heroRef} aboutUsRef={aboutUsRef} />
    </Navigation>
  );
}
