import React from "react";
import ProjectCard, { Project } from "./projectCard";

const projects: Project[] = [
  {
    title: "Joystick Journal",
    description: "A video game discovery website offering 5 star ratings across multiple metrics, detailed reviews, and AI-powered recommendations to help you find games you’ll love.",
    imageSrc: "/images/sudoresume-demo.png",
    imageAlt: "Joystick Journal screenshot",
    tags: ["TypeScript", "React", "Tailwind", "Express", "Node.js", "MySQL"],
    href: "https://github.com/abccodes/Joystick-Journal",
    ctaLabel: "Source",
  },
  {
    title: "ZenZone",
    description: "Focus-driven productivity app that helps users set goals, track progress, and build consistent habits in a focused, distraction-free space.",
    imageSrc: "/images/melanoma-demo.png",
    imageAlt: "ZenZone screenshot",
    tags: ["TypeScript", "React Native", "Expo", "Express", "Node.js", "MySQL"],
    href: "https://github.com/ryanvflannery/ZenZone",
    ctaLabel: "Source",
  },
  // add more later
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full max-w-4xl px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <ProjectCard key={proj.title} {...proj} />
        ))}
      </div>
    </section>
  );
}
