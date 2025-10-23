import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">.gov.cooker</h3>
            <p className="text-gray-400 text-sm">
              Making corruption visible, verifiable, and costly for officials.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/campaigns" className="text-gray-400 hover:text-white">Campaigns</Link></li>
              <li><Link href="/issues" className="text-gray-400 hover:text-white">Issues</Link></li>
              <li><Link href="/rti" className="text-gray-400 hover:text-white">RTI Requests</Link></li>
              <li><Link href="/data" className="text-gray-400 hover:text-white">Open Data</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link href="/safety" className="text-gray-400 hover:text-white">Safety Guide</Link></li>
              <li><Link href="/legal" className="text-gray-400 hover:text-white">Legal</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/transparency" className="text-gray-400 hover:text-white">Transparency</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © 2024 .gov.cooker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
