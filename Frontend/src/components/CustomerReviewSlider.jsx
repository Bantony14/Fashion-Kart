import { useState } from "react";

function CustomerReviewSection() {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      review:
        "Loved the quality and the fit. Delivery was fast and products matched the description.",
    },
    {
      id: 2,
      name: "David R.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review:
        "Great shopping experience. The collection is trendy and pricing is fair.",
    },
    {
      id: 3,
      name: "Emily T.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      review:
        "Stylish products and responsive customer support. Will shop again.",
    },
    {
      id: 4,
      name: "John K.",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      review: "Very smooth checkout and great quality products.",
    },
  ];

  const [viewAll, setViewAll] = useState(false);

  const visibleReviews = viewAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="bg-[#F8FAFC] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div
          className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-3
        mb-6
        sm:mb-10
      "
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            What Our Customers Say
          </h2>

          {!viewAll ? (
            <button
              onClick={() => setViewAll(true)}
              className="
              text-sm
              text-blue-600
              hover:underline
              self-start
              sm:self-auto
              cursor-pointer
            "
            >
              View All
            </button>
          ) : (
            <button
              onClick={() => setViewAll(false)}
              className="
              text-sm
              text-gray-600
              hover:text-gray-900
              border
              border-gray-300
              px-3
              py-1
              rounded-md
              self-start
              sm:self-auto
              cursor-pointer
            "
            >
              ✕ Close
            </button>
          )}
        </div>

        {/* Reviews */}
        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        gap-4
        sm:gap-6
      "
        >
          {visibleReviews.map((item) => (
            <div
              key={item.id}
              className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-4
              sm:p-6
              shadow-sm
              hover:shadow-md
              transition
            "
            >
              {/* User */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                  h-10
                  w-10
                  sm:h-12
                  sm:w-12
                  rounded-full
                  object-cover
                  shrink-0
                "
                />

                <div className="min-w-0">
                  <p
                    className="
                  font-medium
                  text-gray-900
                  text-sm
                  sm:text-base
                  truncate
                "
                  >
                    {item.name}
                  </p>

                  <div className="flex">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span
                        key={i}
                        className="text-yellow-400 text-xs sm:text-sm"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review */}
              <p
                className="
              text-gray-600
              text-xs
              sm:text-sm
              leading-relaxed
            "
              >
                “{item.review}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerReviewSection;
