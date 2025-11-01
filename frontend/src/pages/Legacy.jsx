import React from "react";
import { motion } from "framer-motion";

const Legacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 mt-20 px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-600 mb-6"
        >
          Our Legacy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10"
        >
          Since our inception, <span className="font-semibold text-blue-500">Shri Ashok Traders (SAT)</span> has been a trusted
          name in providing high-quality goods with a commitment to timely
          scheduling and customer satisfaction. Over the years, we have evolved
          from a local trading setup to a modern digital platform, while keeping
          our core values — integrity, reliability, and quality — at the heart
          of everything we do.
        </motion.p>

        {/* Legacy Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Decades of Trust",
              desc: "Our long-standing relationships with clients and partners are built on transparency and dependability.",
              icon: "🏆",
            },
            {
              title: "Commitment to Quality",
              desc: "From sourcing to delivery, every product undergoes thorough checks to ensure customer satisfaction.",
              icon: "✅",
            },
            {
              title: "Innovation in Service",
              desc: "By embracing technology, we continue to simplify the order scheduling process for everyone we serve.",
              icon: "💡",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Section Divider */}
        <div className="my-16 h-px bg-gray-300 w-3/4 mx-auto"></div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To empower businesses and customers by streamlining the order
              scheduling process — ensuring convenience, efficiency, and
              reliability through technology-driven solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-8 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To become India’s most trusted and customer-centric scheduling
              network, bridging the gap between traditional values and modern
              commerce with seamless digital experiences.
            </p>
          </motion.div>
        </div>

        {/* Footer Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-gray-500 italic"
        >
          “Legacy built on trust. Future powered by innovation.”
        </motion.p>
      </div>
    </div>
  );
};

export default Legacy;
