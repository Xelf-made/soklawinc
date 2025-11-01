import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { consultancyAreas } from '../data/consultancyData';
import { podcastsData } from '../data/podcastsData';
import { resourcesData } from '../data/resourcesData';

const TYPING_TEXT = 'SIMIYU, OPONDO, KIRANGA & COMPANY ADVOCATES';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < TYPING_TEXT.length) {
        setTypedText((prev) => prev + TYPING_TEXT[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [consultancyDropdownOpen, setConsultancyDropdownOpen] = useState(false);
  const [mobileConsultancyOpen, setMobileConsultancyOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Legal Services', hasDropdown: true, type: 'services' },
    { href: '/consultancy', label: 'Consultancy', hasDropdown: true, type: 'consultancy' },
    { href: '#team', label: 'Team' },
    { href: '#news', label: 'News', hasDropdown: true, type: 'news' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f9f7f1]/50 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Typing Text */}
          <div className="flex flex-col items-start space-y-0.5 py-2 max-w-[200px]">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
            >
              <img
                src="https://soklaw.co.ke/images/logo.png"
                alt="SOK Law Logo"
                className="h-9 w-auto object-contain transition-all duration-300"
              />
            </a>
            <p className="text-[10px] sm:text-xs text-[#4B3621] font-medium whitespace-nowrap overflow-hidden">
              {typedText}
              {showCursor && <span className="animate-pulse">|</span>}
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => {
                      if (link.type === 'services') setServicesDropdownOpen(true);
                      else if (link.type === 'consultancy') setConsultancyDropdownOpen(true);
                      else if (link.type === 'news') setNewsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (link.type === 'services') setServicesDropdownOpen(false);
                      else if (link.type === 'consultancy') setConsultancyDropdownOpen(false);
                      else if (link.type === 'news') setNewsDropdownOpen(false);
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.type === 'services') {
                          scrollToSection('#services');
                        }
                      }}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-400 flex items-center gap-1 ${
                        isScrolled ? 'text-gray-700' : 'text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {link.type === 'services' && servicesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {servicesData.map((service) => (
                          <a
                            key={service.id}
                            href={`#${service.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection('#services');
                              setServicesDropdownOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <service.icon className="h-4 w-4" />
                              <span>{service.title}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                    {link.type === 'consultancy' && consultancyDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {consultancyAreas.map((area) => (
                          <a
                            key={area.id}
                            href={`/consultancy/${area.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/consultancy/${area.slug}`;
                              setConsultancyDropdownOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {area.title}
                          </a>
                        ))}
                      </div>
                    )}
                    {link.type === 'news' && newsDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Podcasts</div>
                        {podcastsData.map((podcast) => (
                          <a
                            key={podcast.id}
                            href={`/podcasts/${podcast.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/podcasts/${podcast.slug}`;
                              setNewsDropdownOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {podcast.title}
                          </a>
                        ))}
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t mt-2">Resources</div>
                        {resourcesData.map((resource) => (
                          <a
                            key={resource.id}
                            href={`/resources/${resource.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/resources/${resource.slug}`;
                              setNewsDropdownOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-400 ${
                      isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#f9f7f1]/95 backdrop-blur-md border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.href}>
                  <button
                    onClick={() => {
                      if (link.type === 'services') setMobileServicesOpen(!mobileServicesOpen);
                      else if (link.type === 'consultancy') setMobileConsultancyOpen(!mobileConsultancyOpen);
                      else if (link.type === 'news') setMobileNewsOpen(!mobileNewsOpen);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${(link.type === 'services' && mobileServicesOpen) || (link.type === 'consultancy' && mobileConsultancyOpen) || (link.type === 'news' && mobileNewsOpen) ? 'rotate-180' : ''}`} />
                  </button>
                  {link.type === 'services' && mobileServicesOpen && (
                    <div className="pl-4 space-y-1">
                      {servicesData.map((service) => (
                        <a
                          key={service.id}
                          href={`#${service.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('#services');
                            setIsOpen(false);
                            setMobileServicesOpen(false);
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <service.icon className="h-4 w-4" />
                            <span>{service.title}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                  {link.type === 'consultancy' && mobileConsultancyOpen && (
                    <div className="pl-4 space-y-1">
                      {consultancyAreas.map((area) => (
                        <a
                          key={area.id}
                          href={`/consultancy/${area.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/consultancy/${area.slug}`;
                            setIsOpen(false);
                            setMobileConsultancyOpen(false);
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        >
                          {area.title}
                        </a>
                      ))}
                    </div>
                  )}
                  {link.type === 'news' && mobileNewsOpen && (
                    <div className="pl-4 space-y-1">
                      <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Podcasts</div>
                      {podcastsData.map((podcast) => (
                        <a
                          key={podcast.id}
                          href={`/podcasts/${podcast.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/podcasts/${podcast.slug}`;
                            setIsOpen(false);
                            setMobileNewsOpen(false);
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        >
                          {podcast.title}
                        </a>
                      ))}
                      <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase border-t mt-2">Resources</div>
                      {resourcesData.map((resource) => (
                        <a
                          key={resource.id}
                          href={`/resources/${resource.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/resources/${resource.slug}`;
                            setIsOpen(false);
                            setMobileNewsOpen(false);
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        >
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
