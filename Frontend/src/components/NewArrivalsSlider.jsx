import { useState, useEffect } from "react";

function NewArrivalsSlider() {
  const products = [
    { id: 1, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
    { id: 2, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
    { id: 3, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77" },
    { id: 4, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772" },
    { id: 5, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7" },
    { id: 6, img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f" },
    { id: 7, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
    { id: 8, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
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
  const next = () =>
    setIndex((prev) => (prev + 1) % (MAX_INDEX + 1));

  const prev = () =>
    setIndex((prev) => (prev === 0 ? MAX_INDEX : prev - 1));

  return (
    <section className="bg-[#111827] py-16">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-white">
            New Arrivals
          </h2>
          <span className="text-sm text-blue-500 cursor-pointer">
            View All
          </span>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * CARD_WIDTH}px)` }}
          >
            {products.map((item) => (
              <div
  key={item.id}
  className="
    group
    w-[220px] flex-shrink-0
    bg-[#1F2937] rounded-xl p-4
    border border-gray-200
    transition-all duration-300 ease-out
    hover:shadow-2xl
    hover:border-gray-300
    cursor-pointer
  "
>
  {/* Image wrapper */}
  <div className="overflow-hidden rounded-lg bg-[#1F2937]">
    <img
      src={item.img}
      alt="new arrival"
      className="
        h-36 w-full object-contain
        transition-transform duration-500 ease-out
        group-hover:scale-110
      "
    />
  </div>
</div>

            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          className="
            absolute -left-4 top-1/2 -translate-y-1/2
            bg-white h-10 w-10 rounded-full
            shadow-md flex items-center justify-center
          "
        >
          ‹
        </button>

        <button
          onClick={next}
          className="
            absolute -right-4 top-1/2 -translate-y-1/2
            bg-white h-10 w-10 rounded-full
            shadow-md flex items-center justify-center
          "
        >
          ›
        </button>

      </div>
    </section>
  );
}

export default NewArrivalsSlider;
