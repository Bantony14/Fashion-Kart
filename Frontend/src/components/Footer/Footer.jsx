import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">YourStore</h2>

          <p className="mt-2 text-sm text-gray-400">
            Quality products. Better lifestyle.
          </p>
        </div>

        <div className="mt-6 border-t border-gray-600 pt-5 text-center text-sm text-gray-400">
          © 2026 YourStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
