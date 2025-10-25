import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import image1 from '../assets/WhatsApp Image 2025-10-25 at 03.34.27.jpeg';
import image2 from '../assets/WhatsApp Image 2025-10-25 at 03.34.28.jpeg';
import image3 from '../assets/WhatsApp Image 2025-10-25 at 03.34.28 (1).jpeg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: image1,
      title: 'YOUR TRUSTED LEGAL PARTNERS',
      description:
        "Providing exceptional legal services with integrity and expertise.",
    },
    {
      image: image2,
      title: 'STRENGTH THROUGH COLLABORATION',
      description:
        "Our experienced team delivers comprehensive legal solutions.",
    },
    {
      image: image3,
      title: 'PROFESSIONAL EXCELLENCE',
      description:
        'Expert legal representation with a commitment to justice.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true
  });

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      {...swipeHandlers}
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: '100vh' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="min-h-[180px] flex flex-col justify-center bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-6 transition-all duration-700 tracking-wide"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#FFFFFF',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 30px rgba(59, 130, 246, 0.5)'
                }}>
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed transition-all duration-700 font-medium"
               style={{
                 fontFamily: 'system-ui, -apple-system, sans-serif',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.9)'
               }}>
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up-delay">
          <button
            onClick={scrollToContact}
            className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <Phone className="h-5 w-5" />
            <span>Get Legal Consultation</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToServices}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <span>Our Services</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-12 h-3'
                : 'bg-white/50 hover:bg-white/70 w-3 h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;