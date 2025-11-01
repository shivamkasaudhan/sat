import React from "react";
import { Mail, Phone, MapPin, Package, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "FAQs", href: "/faqs" }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white mt-auto border-t border-purple-500/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-75"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Shri Ashok Traders
                </h2>
                <p className="text-xs text-purple-300">Premium Quality Since 1995</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Your trusted partner in quality trading and supply solutions. 
              Delivering excellence with integrity and commitment to every order.
            </p>
            
            {/* Social or additional info could go here */}
            <div className="mt-6 flex gap-3">
              <div className="px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-xs text-purple-300">Easy Scheduling</p>
              </div>
              <div className="px-4 py-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <p className="text-xs text-pink-300">On-Time Pickup</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-1.5 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <Phone size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+919118700266" className="text-sm text-white hover:text-purple-400 transition-colors">
                    +91 91187 00266
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-1.5 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                  <Mail size={16} className="text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:support@shriashoktraders.com" className="text-sm text-white hover:text-pink-400 transition-colors">
                    satyamkasaudhan29@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-1.5 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <MapPin size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-sm text-white">
                    Babuganj, Antu<br />Pratapgarh, Uttar Pradesh, India
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} <span className="text-purple-400 font-medium">Shri Ashok Traders</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <span className="hover:text-purple-400 cursor-pointer transition-colors">Made with 💜 in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;