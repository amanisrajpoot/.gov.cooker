import { Campaigns } from '../../components/Campaigns';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">All Campaigns</h1>
              <Button asChild className="flex items-center">
                <Link href="/campaigns/create" className="flex items-center">Start a Campaign</Link>
              </Button>
            </div>
            <Campaigns />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}