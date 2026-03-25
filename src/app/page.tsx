import Hero from '@/components/Hero';
import CraftScene3 from '@/components/CraftScene3';
import Scene6ClosingFrame from '@/components/ClosingScene6';
import StoryMotion from '@/components/StoryMotion';


export default function Home() {
  return (
    <main className="bg-rayo-black">
      <StoryMotion />

      <div data-scene="scene1" className="relative z-10">
        <Hero />
      </div>

      <div data-scene="scene3" className="relative z-10 bg-rayo-cream">
        <CraftScene3 />
      </div>

      <div data-scene="scene6" className="relative z-10">
        <Scene6ClosingFrame />
      </div>
    </main>
  );
}
