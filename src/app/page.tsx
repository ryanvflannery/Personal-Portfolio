import Hero from '../components/hero';
import Navbar from '@/components/navbar';
import ExperienceSection from '@/components/experience';

import ProjectsSection from '@/components/projectSection';

import SkillsSection from '@/components/skills';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-4">
      <Navbar />
      <Hero />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      

    </main>
  );
}
