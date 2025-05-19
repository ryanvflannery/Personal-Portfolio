'use client';

import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import React from 'react';
import { useState } from 'react';

export default function Hero() {
  const [showMatcha, setShowMatcha] = useState(false);

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
        I enjoy developing full-stack applications, creating games, staying active, and making{' '}
        <button
          onClick={() => setShowMatcha(true)}
          className="text-green-300 hover:underline focus:outline-none"
        >
          Matcha
        </button>
        {' '}every morning.
      </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="/resume.pdf"
              target="_blank"
              className="h-8 px-4 aspect-square rounded border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center"
            >
              Resume
            </a>

             {/* Icon links */}
        <a href="https://github.com/ryanvflannery" target="_blank" rel="noopener noreferrer"
           className="text-white hover:text-blue-400 transition">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/ryan-flannery6980/" target="_blank" rel="noopener noreferrer"
           className="text-white hover:text-blue-400 transition">
          <FaLinkedin size={24} />
        </a>
        <a href="mailto:ryanvflannery@gmail.com"
           className="text-white hover:text-blue-400 transition">
          <FaEnvelope size={24} />
        </a>
      </div>
    </div>

     {/* ————————————— MODAL LIGHTBOX ————————————— */}
     {showMatcha && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowMatcha(false)}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMatcha(false)}
              className="absolute top-2 right-1 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <img
              src="/matcha.jpg"
              alt="My morning matcha"
              className="max-w-full max-h-[60vh] rounded"
            />
          </div>
        </div>
        )}

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
