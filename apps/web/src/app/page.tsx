import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Stats } from '../components/Stats';
import { Campaigns } from '../components/Campaigns';
import { CTA } from '../components/CTA';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Campaigns />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
