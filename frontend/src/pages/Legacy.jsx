import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Award, Users, TrendingUp, Heart } from "lucide-react";
import bakary from './bakery.jpg';
import bhaiya from './bhaiya.jpg'
import product from './product.jpg'
import trans from './trans.jpg'
import com from './com.jpg'
import grow from './grow.jpg'

const Legacy = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images
  const galleryImages = [
    {
      url: `${bakary}`,
      title: "The Bakery Era",
      description: "Where our journey began in 1998"
    },
    {
      url: `${trans}`,
      title: "The Transition",
      description: "Opening the kirana shop in 2007"
    },
    {
      url: `${com}`,
      title: "Community Hub",
      description: "Serving our neighborhood"
    },
    {
      url: `${product}`,
      title: "Quality Products",
      description: "Trusted essentials for every home"
    },
    {
      url: `${bhaiya}`,
      title: "Family Business",
      description: "Father and son working together"
    },
    {
      url: `${grow}`,
      title: "Growing Together",
      description: "Building relationships that last"
    },
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const milestones = [
    { year: "1998", title: "The Bakery", description: "Ashok Kumar Kasaudhan started with a bakery shop" },
    { year: "2007", title: "New Beginning", description: "Transitioned from bakery to kirana shop - a pivotal moment" },
    { year: "2015", title: "Steady Growth", description: "Established as a trusted name in the community" },
    { year: "2021", title: "Next Generation", description: "Satyam Kasaudhan joins, bringing digital innovation" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description: "We believe in honest business practices and transparent dealings with all our customers.",
    },
    {
      icon: Award,
      title: "Quality",
      description: "Every product undergoes rigorous quality checks to ensure customer satisfaction.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with customers and contributing to local growth.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Embracing technology while maintaining traditional values of trust and service.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300 mb-4">
            ✨ Our Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Legacy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Since 1998, Shri Ashok Traders has been serving the community with dedication, 
            quality products, and unwavering commitment to customer satisfaction. From a bakery 
            to a thriving kirana shop, our journey is a story of resilience and growth.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Story Behind SAT
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                In 1998, Ashok Kumar Kasaudhan started his entrepreneurial journey with a small bakery 
                shop in Pratapgarh, Uttar Pradesh. For nine years, the aroma of fresh bread and the 
                warmth of community connections defined his business. It was more than just baking—it 
                was about serving the neighborhood with quality and care.
              </p>
              <p>
                In 2007, Ashok Kumar made a bold decision that would shape the future of his family business. 
                He closed the bakery and opened a kirana shop—a decision driven by vision and determination. 
                This pivot marked the true beginning of Shri Ashok Traders as we know it today. From that 
                moment, the business has never looked back, growing steadily day by day.
              </p>
              <p>
                The kirana shop became a cornerstone of the community, offering everything from daily 
                essentials to trusted service. Through consistent quality, fair pricing, and genuine 
                relationships, Ashok Kumar built a reputation that extended far beyond transactions. 
                Each customer became part of the family, and the shop became a place of trust.
              </p>
              <p>
                Today, the legacy continues with the next generation. Satyam Kasaudhan, Ashok Kumar's son, 
                now handles all operations of the business, bringing fresh energy and modern innovations. 
                Yet the foundation remains strong—father and son work together, blending traditional values 
                with contemporary approaches. Together, they continue to grow the business every single day, 
                honoring the past while building the future.
              </p>
              <p>
                Shri Ashok Traders is more than a kirana shop—it's a testament to resilience, family values, 
                and the power of serving your community with integrity. Our journey from a bakery in 1998 to 
                a thriving business in 2024 reflects decades of hard work, trust, and an unwavering commitment 
                to excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Journey Through Time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-gray-400 text-sm">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Through The Years
          </h2>
          <p className="text-center text-gray-400 mb-12">
            A visual journey of our growth and milestones
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer border border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <div className="aspect-video bg-slate-900">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-400">{selectedImage.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {currentImageIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Closing Message */}
        <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20">
          <p className="text-2xl font-semibold mb-4 italic text-gray-300">
            "From bakery to kirana—a journey of resilience, trust, and family."
          </p>
          <p className="text-gray-400">— Ashok Kumar & Satyam Kasaudhan</p>
        </div>
      </div>
    </div>
  );
};

export default Legacy;