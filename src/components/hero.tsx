'use client';

import Image from 'next/image';
import React from 'react';

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center pt-30 pb-6 px-6 text-left">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl ">
        {/* Text Section */}
        <div className="md:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Hi, Ryan Here <span className="inline-block">👋</span>
          </h1>
          <p className="text-gray-300 mb-2">
            21‑year‑old Software Developer from San Francisco, CA.
          </p>
          <p className="text-gray-300 mb-6">
            I enjoy developing full‑stack applications, creating games, staying active, and drinking matcha every morning.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-4 py-2 rounded border border-white text-white hover:bg-white hover:text-black transition"
            >
              Resume
            </a>
            <a href="https://github.com/ryanvflannery" target="_blank">
              <i className="fab fa-github text-white text-xl hover:text-blue-400" />
            </a>
            <a href="https://www.linkedin.com/in/ryan-flannery6980/" target="_blank">
              <i className="fab fa-linkedin text-white text-xl hover:text-blue-400" />
            </a>
            <a href="mailto:ryanvflannery@gmail.com">
              <i className="fas fa-envelope text-white text-xl hover:text-blue-400" />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="md:w-1/5 flex justify-center">
          <div className="relative w-37 h-44 rounded-2xl overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Ryan Flannery"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
