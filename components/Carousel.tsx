import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Swipe handling ---
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      // swipe left
      goToNext();
    } else if (deltaX < -50) {
      // swipe right
      goToPrev();
    }
  };

  // --- Auto switch every 3 seconds ---
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ aspectRatio: '16 / 9' }} // --- force 16:9 aspect ratio ---
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img) => (
          <div
            key={img}
            className="relative w-full flex-shrink-0 rounded-lg overflow-hidden"
            style={{ aspectRatio: '16 / 9' }}
          >
            <Image
              fill
              alt="Carousel image"
              className="object-cover"
              quality={100}
              src={img}
            />
          </div>
        ))}
      </div>

      {totalImages > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white z-10"
            onClick={goToPrev}
          >
            ‹
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white z-10"
            onClick={goToNext}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
