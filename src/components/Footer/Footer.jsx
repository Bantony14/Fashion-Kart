import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const footerLinks = [
  {
    title: "About",
    links: ["Our Story", "Careers", "Blog"],
  },
  {
    title: "Quick Links",
    links: ["Careers", "Blog", "Contact Us"],
  },
  {
    title: "Support",
    links: ["FAQ", "Shipping & Returns", "Privacy Policy"],
  },
];

const socialIcons = [
  { icon: Facebook },
  { icon: Instagram },
  { icon: Twitter },
  { icon: Youtube },
];

function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top footer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white">
              YourStore
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Discover premium products curated for your lifestyle.
              Quality, comfort, and value — all in one place.
            </p>
          </div>

          {/* Link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li
                    key={link}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialIcons.map((Item, i) => {
                const Icon = Item.icon;
                return (
                  <div
                    key={i}
                    className="p-2 rounded-full bg-gray-700 hover:bg-primary transition cursor-pointer"
                  >
                    <Icon size={18} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
          © 2026 YourStore. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
