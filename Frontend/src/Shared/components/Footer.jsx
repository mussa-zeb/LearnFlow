import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-neutral-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold text-neutral-900 tracking-tight">
                LearnFlow
              </span>
            </Link>
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
              A thoughtfully crafted online learning platform designed to help
              you learn at your own pace. No distractions, just learning.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/courses"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100">
          <p className="text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} LearnFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;