import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  ScaleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function LegalPage() {
  const legalSections = [
    {
      title: 'Terms of Service',
      description: 'Our terms and conditions for using the platform',
      icon: DocumentTextIcon,
      lastUpdated: '2024-01-15'
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      icon: ShieldCheckIcon,
      lastUpdated: '2024-01-15'
    },
    {
      title: 'Content Policy',
      description: 'Guidelines for acceptable content and behavior on the platform',
      icon: ExclamationTriangleIcon,
      lastUpdated: '2024-01-10'
    },
    {
      title: 'User Agreement',
      description: 'Your rights and responsibilities as a platform user',
      icon: CheckCircleIcon,
      lastUpdated: '2024-01-15'
    }
  ];

  const legalRights = [
    {
      title: 'Right to Information (RTI)',
      description: 'You have the right to request information from government departments under the RTI Act, 2005.',
      applicable: 'All citizens of India'
    },
    {
      title: 'Freedom of Expression',
      description: 'You have the constitutional right to express your opinions and concerns about governance.',
      applicable: 'All citizens of India'
    },
    {
      title: 'Whistleblower Protection',
      description: 'Legal protections exist for those who report corruption and maladministration.',
      applicable: 'Government employees and contractors'
    },
    {
      title: 'Data Protection',
      description: 'Your personal data is protected under the Digital Personal Data Protection Act, 2023.',
      applicable: 'All users'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal Information</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Important legal information, your rights, and our commitment to protecting users while promoting transparency.
              </p>
            </div>

            {/* Legal Documents */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {legalSections.map((section, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <section.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                        <p className="text-gray-600 mb-3">{section.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Updated {section.lastUpdated}</span>
                          <Button variant="outline" size="sm">Read Document</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Your Legal Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Legal Rights</h2>
              <div className="space-y-6">
                {legalRights.map((right, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <ScaleIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{right.title}</h3>
                        <p className="text-gray-600 mb-3">{right.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Applicable to:</span>
                          <span className="text-sm text-primary-600">{right.applicable}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer */}
            <Card className="p-8 bg-yellow-50 border-yellow-200">
              <div className="flex items-start space-x-4">
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Legal Disclaimer</h3>
                  <p className="text-gray-700 mb-4">
                    .gov.cooker is a platform for civic engagement and transparency. While we provide tools and resources, 
                    we are not a legal service provider. For specific legal advice, please consult with qualified legal professionals.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• We do not provide legal advice or representation</li>
                    <li>• Users are responsible for their own legal compliance</li>
                    <li>• We encourage consulting legal professionals for complex matters</li>
                    <li>• Our platform is designed to facilitate lawful civic engagement</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Contact Legal Team */}
            <div className="mt-12">
              <Card className="p-8 bg-primary-50">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Legal Assistance?</h2>
                  <p className="text-gray-600 mb-6">
                    If you need legal help or have questions about your rights, we can connect you with resources.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <a href="/contact">Contact Legal Team</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/help">Help Center</a>
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
