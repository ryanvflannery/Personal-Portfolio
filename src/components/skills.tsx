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
    <section className="w-full max-w-4xl mx-auto px-30">
    <section id="skills" className="w-full max-w-2xl px-4 py-2">
      <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
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
    </section>
  );
}
