"use client";

import { useState } from "react";

type Item = {
  date: string;
  logo: string;
  alt: string;
  title: string;
  subtitle: string;
};

export default function ExperienceSection() {
  const [tab, setTab] = useState<"work" | "education">("work");

  const workItems: Item[] = [
    // fill these in when you have your data...
    // { date: "Oct 2023 – Feb 2024", logo: "/logos/agilite.png", alt: "Agilite", title: "Agilite", subtitle: "Senior Software Developer" },
  ];

  const eduItems: Item[] = [
    // { date: "Jan 2023 – Dec 2024", logo: "/logos/ljmu.png", alt: "LJMU", title: "Liverpool John Moores University", subtitle: "MSc in AI & ML" },
  ];
  const items = tab === "work" ? workItems : eduItems;

  return (
    <section id="experience" className="w-full max-w-2xl px-5 py-14 ">
      {/* Tab Headers */}
      <div className="flex bg-slate-600 p-0.5 rounded-md h-8">
  <button
    onClick={() => setTab("work")}
    className={`
      flex-1
      text-center text-sm font-medium
      py-1 px-3
      transition
      ${tab === "work"
        ? "bg-black text-white rounded-l-md rounded-r-md"
        : "bg-transparent text-gray-300 hover:text-white"}
    `}
  >
    Work
  </button>
  <button
    onClick={() => setTab("education")}
    className={`
      flex-1
      text-center text-sm font-medium
      py-1 px-3
      transition
      ${tab === "education"
        ? "bg-black text-white rounded-r-md rounded-l-md"
        : "bg-transparent text-gray-300 hover:text-white"}
    `}
  >
    Education
  </button>
</div>

      {/* Timeline Container */}
      <div className="relative mt-2 border border-white-600 rounded-lg p-6">
        {/* vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white" />

        {items.map((item, i) => (
          <div
            key={i}
            className="relative flex mb-8 last:mb-0 items-start"
          >
            {/* logo circle on the line */}
            <div className="absolute left-4 mt-1 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <img
                src={item.logo}
                alt={item.alt}
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* text content */}
            <div className="ml-16">
              <span className="block text-xs text-gray-400">
                {item.date}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.subtitle}</p>
            </div>
          </div>
        ))}

        {/* if you want a placeholder when empty */}
        {items.length === 0 && (
          <p className="text-gray-500 text-center italic">
            No entries yet — fill these in when you have them!
          </p>
        )}
      </div>
    </section>
  );
}
