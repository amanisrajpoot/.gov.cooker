import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">About .gov.cooker</h1>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                .gov.cooker is a transparency and accountability platform that makes corruption 
                and non-delivery visible, verifiable, and costly for officials—while protecting 
                citizens and whistleblowers.
              </p>
              <p className="text-gray-600">
                About page content coming soon...
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
