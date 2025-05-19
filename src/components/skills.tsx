// components/SkillsSection.tsx
"use client";

import React from "react";

const SKILLS = [
  "TypeScript",
  "Python", 
  "C#",
  "ReactJS",
  "NextJS",
  "Express",
  "Tailwind",
  "Unity",
  // …add your own here
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full max-w-2xl px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1 text-sm font-medium text-gray-200 border border-gray-500 rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
