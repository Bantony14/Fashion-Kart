import { useState, useEffect } from "react";

function NewArrivalsSlider() {
  const products = [
    { id: 1, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    },
    { id: 4, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772" },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
  ];

  const VISIBLE = 5;
  const CARD_WIDTH = 246;
  const MAX_INDEX = products.length - VISIBLE;

  const [index, setIndex] = useState(0);

  /* ✅ AUTO SLIDE (PERFECT RESET) */
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % (MAX_INDEX + 1));
    }, 3000);

    return () => clearInterval(id);
  }, [MAX_INDEX]);

  /* ✅ MANUAL */
  const next = () => setIndex((prev) => (prev + 1) % (MAX_INDEX + 1));

  const prev = () => setIndex((prev) => (prev === 0 ? MAX_INDEX : prev - 1));

  return (
    <section className="bg-[#111827] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            New Arrivals
          </h2>

          <span className="text-xs sm:text-sm text-blue-500 cursor-pointer hover:text-blue-400">
            View All
          </span>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="
            flex
            gap-3 sm:gap-6
            transition-transform
            duration-500
            ease-out
          "
            style={{
              transform: `translateX(-${index * CARD_WIDTH}px)`,
            }}
          >
            {products.map((item) => (
              <div
                key={item.id}
                className="
                group
                w-[170px]
                sm:w-[200px]
                md:w-[220px]
                flex-shrink-0
                bg-[#1F2937]
                rounded-xl
                p-2.5 sm:p-4
                border border-gray-700
                transition-all
                duration-300
                ease-out
                hover:shadow-2xl
                hover:border-gray-500
                cursor-pointer
              "
              >
                {/* Image */}
                <div className="overflow-hidden rounded-lg bg-[#1F2937]">
                  <img
                    src={item.img}
                    alt="new arrival"
                    className="
                    h-28
                    sm:h-32
                    md:h-36
                    w-full
                    object-contain
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-110
                  "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous */}
        <button
          onClick={prev}
          className="
          absolute
          left-0
          sm:-left-2
          md:-left-4
          top-1/2
          -translate-y-1/2
          bg-white
          h-8 w-8
          sm:h-10 sm:w-10
          rounded-full
          shadow-md
          flex
          items-center
          justify-center
          text-lg sm:text-xl
          cursor-pointer
          hover:bg-gray-100
          transition
        "
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="
          absolute
          right-0
          sm:-right-2
          md:-right-4
          top-1/2
          -translate-y-1/2
          bg-white
          h-8 w-8
          sm:h-10 sm:w-10
          rounded-full
          shadow-md
          flex
          items-center
          justify-center
          text-lg sm:text-xl
          cursor-pointer
          hover:bg-gray-100
          transition
        "
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default NewArrivalsSlider;
