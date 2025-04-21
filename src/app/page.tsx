import Hero from '../components/hero';
import Navbar from '@/components/navbar';
import ExperienceSection from '@/components/experience';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-4">
      <Navbar />
      <Hero />
      <ExperienceSection />

    </main>
  );
}
