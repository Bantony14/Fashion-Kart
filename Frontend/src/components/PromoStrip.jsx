function PromoStrip() {
  return (
    <section
      className="
      relative
      w-full
      h-[200px]
      sm:h-[230px]
      md:h-[260px]
      overflow-hidden
      mt-4
      sm:mt-5
      mb-4
      sm:mb-5
    "
    >
      {/* Background Image */}
      <div
        className="
        absolute
        inset-0
        bg-center
        bg-cover
        bg-no-repeat
      "
        style={{
          backgroundImage:
            "url('https://www.nicepng.com/png/detail/6-60018_fashion-model-png-transparent.png')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        h-full
        px-4
        sm:px-6
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
      >
        <h2
          className="
          text-white
          text-lg
          sm:text-xl
          md:text-2xl
          font-semibold
          leading-tight
        "
        >
          Up to <span className="text-blue-400">50% Off</span> This Season
        </h2>

        <p
          className="
          text-gray-200
          text-xs
          sm:text-sm
          mt-2
        "
        >
          Fresh styles curated just for you
        </p>

        <button
          className="
          mt-3
          sm:mt-4
          px-5
          sm:px-6
          py-2
          sm:py-2.5
          bg-blue-600
          text-white
          text-xs
          sm:text-sm
          font-medium
          rounded-md
          hover:bg-blue-700
          transition
          cursor-pointer
        "
        >
          Shop Deals
        </button>
      </div>
    </section>
  );
}

export default PromoStrip;
