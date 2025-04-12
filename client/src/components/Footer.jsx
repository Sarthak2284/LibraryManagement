import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">📚 BookVerse</h2>
          <p className="text-gray-400">
            Your one-stop digital library. Discover books, borrow easily, and stay informed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Collections</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Admin Panel</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#"><Facebook className="hover:text-white" /></a>
            <a href="#"><Instagram className="hover:text-white" /></a>
            <a href="#"><Twitter className="hover:text-white" /></a>
            <a href="#"><Linkedin className="hover:text-white" /></a>
          </div>
        </div>

        {/* Newsletter Prompt or Address */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Reach Us</h3>
          <p className="text-gray-400">
            123 Book Street, Knowledge City, IN
          </p>
          <p className="text-gray-400 mt-2">Email: support@bookverse.com</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
