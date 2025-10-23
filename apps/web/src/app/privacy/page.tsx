import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function PrivacyPage() {
  const privacyPrinciples = [
    {
      icon: LockClosedIcon,
      title: 'Data Minimization',
      description: 'We collect only the data necessary to provide our services and protect your privacy.',
      details: ['Collect only essential information', 'No unnecessary data storage', 'Regular data cleanup']
    },
    {
      icon: EyeSlashIcon,
      title: 'Anonymity Protection',
      description: 'Your identity is protected through client-side encryption and anonymous reporting options.',
      details: ['Client-side encryption', 'Anonymous reporting', 'Identity protection protocols']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Storage',
      description: 'All data is encrypted and stored securely with industry-standard security measures.',
      details: ['End-to-end encryption', 'Secure servers', 'Regular security audits']
    },
    {
      icon: DocumentTextIcon,
      title: 'Transparency',
      description: 'We are transparent about what data we collect and how we use it.',
      details: ['Clear privacy policies', 'Regular updates', 'User control over data']
    }
  ];

  const dataTypes = [
    {
      type: 'Account Information',
      collected: 'Email, username, profile data',
      purpose: 'Account management and communication',
      retention: 'Until account deletion',
      sharing: 'Never shared with third parties'
    },
    {
      type: 'Campaign Data',
      collected: 'Campaign content, signatures, comments',
      purpose: 'Platform functionality and transparency',
      retention: 'Permanent (public records)',
      sharing: 'Publicly visible (as intended)'
    },
    {
      type: 'RTI Requests',
      collected: 'Request details, responses, documents',
      purpose: 'RTI request processing and tracking',
      retention: '7 years (legal requirement)',
      sharing: 'Government departments only'
    },
    {
      type: 'Issue Reports',
      collected: 'Report content, evidence, metadata',
      purpose: 'Issue tracking and resolution',
      retention: '5 years',
      sharing: 'Authorities only (when necessary)'
    }
  ];

  const userRights = [
    {
      title: 'Right to Access',
      description: 'You can request a copy of all personal data we have about you.',
      icon: DocumentTextIcon
    },
    {
      title: 'Right to Rectification',
      description: 'You can correct or update your personal information at any time.',
      icon: CheckCircleIcon
    },
    {
      title: 'Right to Erasure',
      description: 'You can request deletion of your personal data (with some exceptions).',
      icon: ExclamationTriangleIcon
    },
    {
      title: 'Right to Portability',
      description: 'You can export your data in a machine-readable format.',
      icon: LockClosedIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your privacy and security are our top priorities. Learn how we protect your data 
                and respect your rights as a user of our platform.
              </p>
            </div>

            {/* Privacy Principles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Privacy Principles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {privacyPrinciples.map((principle, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <principle.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h3>
                        <p className="text-gray-600 mb-3">{principle.description}</p>
                        <ul className="space-y-1">
                          {principle.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Data Collection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data We Collect</h2>
              <div className="space-y-6">
                {dataTypes.map((data, index) => (
                  <Card key={index} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{data.type}</h3>
                        <p className="text-sm text-gray-600">{data.collected}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Purpose</h4>
                        <p className="text-sm text-gray-600">{data.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Retention</h4>
                        <p className="text-sm text-gray-600">{data.retention}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Sharing</h4>
                        <p className="text-sm text-gray-600">{data.sharing}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* User Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userRights.map((right, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <right.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{right.title}</h3>
                        <p className="text-gray-600">{right.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Data Security */}
            <Card className="p-8 bg-green-50 border-green-200">
              <div className="flex items-start space-x-4">
                <ShieldCheckIcon className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Data Security Measures</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Technical Safeguards</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• End-to-end encryption for sensitive data</li>
                        <li>• Secure HTTPS connections</li>
                        <li>• Regular security audits</li>
                        <li>• Multi-factor authentication</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Operational Safeguards</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Limited access to personal data</li>
                        <li>• Staff training on privacy</li>
                        <li>• Incident response procedures</li>
                        <li>• Regular privacy assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Privacy Team */}
            <div className="mt-12">
              <Card className="p-8 bg-primary-50">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Questions?</h2>
                  <p className="text-gray-600 mb-6">
                    If you have questions about your privacy or want to exercise your rights, 
                    contact our privacy team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <a href="/contact">Contact Privacy Team</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/legal">Legal Information</a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
