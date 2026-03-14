'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ApplicationLogo from '@/components/ApplicationLogo';
import NavLink from '@/components/NavLink';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import Footer from './Footer';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { route, isCurrentRoute } from '@/lib/routes';

export default function Navigation({ children, title, navColor, footer = true }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    Aos.refresh();
  }, []);

  return (
    <div className="max-w-screen overflow-x-hidden">
      <nav
        className="w-full fixed ease-in-out duration-300 z-50"
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
      >
        {/* Nav bar background: only covers the bar height (h-24), not the full viewport; shows when navColor (scroll) is true */}
        {navColor && <div className="absolute top-0 left-0 right-0 h-24 -z-20 opacity-90" style={{ backgroundColor: '#1e293b' }} />}
        <div className="max-w-8xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex lg:w-full justify-between">
              <div className="shrink-0 flex items-center">
                <Link href={route('home')}>
                  <ApplicationLogo className={`block h-auto fill-current text-gray-800 ${navColor ? 'w-36' : 'w-36 -mb-2'}`} />
                </Link>
                <div className="flex flex-row items-center justify-center space-x-3 text-xl text-white">
                  <a href="https://instagram.com/dyr_autocare?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noreferrer" className="">
                    <i className="fab fa-instagram text-3xl ease-in-out duration-200 text-primary-gold hover:text-primary-orange"></i>
                  </a>
                  <a href="https://www.google.com/search?q=dyr+autocare" className="" target="_blank" rel="noreferrer">
                    <i className="fab fa-google text-3xl ease-in-out duration-200 text-primary-gold hover:text-primary-orange"></i>
                  </a>
                  <a href="https://www.tiktok.com/@dyrautocare" className="" target="_blank" rel="noreferrer">
                    <i className="fab fa-tiktok text-3xl ease-in-out duration-200 text-primary-gold hover:text-primary-orange"></i>
                  </a>
                </div>
              </div>
              {/* Desktop nav: visible only at xl (1280px) and up */}
              <div className="hidden space-x-8 lg:my-6 xl:flex">
                <NavLink href={route('home')} active={isCurrentRoute(pathname, 'home')}>Home</NavLink>
                <NavLink href={route('booking')} active={isCurrentRoute(pathname, 'booking')}>Booking</NavLink>
                <NavLink href={route('exterior')} active={isCurrentRoute(pathname, 'exterior')}>Exterior</NavLink>
                <NavLink href={route('interior')} active={isCurrentRoute(pathname, 'interior')}>Interior</NavLink>
                <NavLink href={route('full')} active={isCurrentRoute(pathname, 'full')}>Full Packages</NavLink>
                <NavLink href={route('coating')} active={isCurrentRoute(pathname, 'coating')}>Ceramic Coating</NavLink>
                <NavLink href={route('paint')} active={isCurrentRoute(pathname, 'paint')}>Paint Correction</NavLink>
                <NavLink href={route('enhance')} active={isCurrentRoute(pathname, 'enhance')}>Enhance & Seal</NavLink>
                <NavLink href={route('gallery')} active={isCurrentRoute(pathname, 'gallery')}>Gallery</NavLink>
              </div>
            </div>
            {/* Hamburger: visible only below xl (under 1280px) */}
            <div className="flex items-center xl:hidden -me-2">
              <button
                type="button"
                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                className="inline-flex items-center justify-center p-2 rounded-md text-primary-gold hover:text-gray-500 focus:outline-none focus:text-primary-gold transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile dropdown: visible only below xl */}
        <div className={`xl:hidden bg-white ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('home')} active={isCurrentRoute(pathname, 'home')}>Home</ResponsiveNavLink>
            <ResponsiveNavLink href={route('booking')} active={isCurrentRoute(pathname, 'booking')}>Booking</ResponsiveNavLink>
            <ResponsiveNavLink href={route('exterior')} active={isCurrentRoute(pathname, 'exterior')}>Exterior</ResponsiveNavLink>
            <ResponsiveNavLink href={route('interior')} active={isCurrentRoute(pathname, 'interior')}>Interior</ResponsiveNavLink>
            <ResponsiveNavLink href={route('full')} active={isCurrentRoute(pathname, 'full')}>Full Packages</ResponsiveNavLink>
            <ResponsiveNavLink href={route('coating')} active={isCurrentRoute(pathname, 'coating')}>Ceramic Coating</ResponsiveNavLink>
            <ResponsiveNavLink href={route('paint')} active={isCurrentRoute(pathname, 'paint')}>Paint Correction</ResponsiveNavLink>
            <ResponsiveNavLink href={route('enhance')} active={isCurrentRoute(pathname, 'enhance')}>Enhance & Seal</ResponsiveNavLink>
            <ResponsiveNavLink href={route('gallery')} active={isCurrentRoute(pathname, 'gallery')}>Gallery</ResponsiveNavLink>
          </div>
        </div>
      </nav>
      <main className="flex flex-col">{children}</main>
      {footer && <Footer />}
    </div>
  );
}
