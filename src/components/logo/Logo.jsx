function Logo({ size = "md" }) {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <div className={`flex items-center ${sizes[size]}`}>
      {/* Cart Icon */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-full w-auto text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 10h6l4 20h16l4-14H16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="36" r="2.5" fill="currentColor" />
        <circle cx="32" cy="36" r="2.5" fill="currentColor" />
      </svg>

      {/* Brand Text */}
      <span className="text-xl font-semibold tracking-wide text-gray-900 dark:text-gray-700">
        Fashion
        <span className="font-extrabold text-blue-500 ml-1">
          KART
        </span>
      </span>
    </div>
  );
}

export default Logo;
