import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoplayInterval?: number;
}

const HeroSlider = ({ slides, autoplayInterval = 5000 }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [slides.length, autoplayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!slides.length) return null;

  return (
    <div className="relative overflow-hidden h-[300px] sm:h-[400px] md:h-[500px]">
      <div 
        className="flex transition-transform duration-500 ease-out h-full" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="min-w-full h-full relative"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">{slide.title}</h2>
              <p className="text-lg sm:text-xl mb-4 sm:mb-6 max-w-xl">{slide.subtitle}</p>
              <Link 
                to={slide.buttonLink}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;