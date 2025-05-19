import Image from "next/image";
import React from "react";
import { FaGithub } from 'react-icons/fa';

export type Project = {
  title:     string;
  description: string;
  imageSrc:  string;
  imageAlt:  string;
  tags:      string[];
  href:      string;
  ctaLabel:  string;
};

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  tags,
  href,
  ctaLabel,
}: Project) {
  return (
    <div className="border border-gray-500 rounded-xl overflow-hidden flex flex-col">
      {/* screenshot */}
      <div className="relative w-full aspect-video bg-gray-800">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
          <p className="text-sm text-gray-300 mb-4">{description}</p>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-700 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-2 px-3 py-1.5 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition"
        >
            <FaGithub className="text-lg" />
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
