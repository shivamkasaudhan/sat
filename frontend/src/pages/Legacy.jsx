import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Award, Users, TrendingUp, Heart } from "lucide-react";

const Legacy = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images (you can replace with actual images)
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      title: "Our Store in 1995",
      description: "Where it all began"
    },
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      title: "Product Range",
      description: "Quality products since day one"
    },
    {
      url: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800",
      title: "Customer Service",
      description: "Building relationships"
    },
    {
      url: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800",
      title: "Modern Facility",
      description: "Expanded in 2010"
    },
    {
      url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800",
      title: "Team Spirit",
      description: "Our dedicated team"
    },
    {
      url: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800",
      title: "Quality Check",
      description: "Ensuring excellence"
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
    { year: "1995", title: "Foundation", description: "Started as a small trading business in Pratapgarh" },
    { year: "2005", title: "Expansion", description: "Expanded to serve 100+ regular customers" },
    { year: "2015", title: "Modernization", description: "Upgraded facility and product range" },
    { year: "2024", title: "Digital Era", description: "Launched online ordering and scheduling system" },
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
            Since 1995, Shri Ashok Traders has been serving the community with dedication, 
            quality products, and unwavering commitment to customer satisfaction.
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
                What started as a modest trading business in Pratapgarh, Uttar Pradesh, has grown into 
                a trusted name in the region. Founded in 1995 by Shri Ashok Ji, our journey has been 
                marked by perseverance, dedication, and an unwavering commitment to quality.
              </p>
              <p>
                Over the past three decades, we've witnessed tremendous growth—not just in business, 
                but in the relationships we've built with our customers. Each transaction has been an 
                opportunity to earn trust, and every customer has become part of our extended family.
              </p>
              <p>
                In 2024, we embraced digital transformation by launching our online ordering and 
                scheduling system, making it easier than ever for our customers to access quality 
                products at their convenience. Yet, despite technological advances, our core values 
                remain unchanged: integrity, quality, and customer-first service.
              </p>
              <p>
                Today, Shri Ashok Traders stands as a testament to what can be achieved through hard work, 
                honesty, and a genuine desire to serve the community. We're proud of our legacy and excited 
                about the future as we continue to grow and serve you better.
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
            "Legacy built on trust. Future powered by innovation."
          </p>
          <p className="text-gray-400">— Shri Ashok Traders Family</p>
        </div>
      </div>
    </div>
  );
};

export default Legacy;