import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">E-Commerce</h2>
            <ul className="flex space-x-4 md:ml-8 mb-4 md:mb-0">
              <li>
                <a className="hover:underline">Home</a>
              </li>
              <li>
                <a className="hover:underline">Shop</a>
              </li>
              <li>
                <a className="hover:underline">About</a>
              </li>
              <li>
                <a className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-white-700 pt-4 text-center">
          <p>&copy; 2024 E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
