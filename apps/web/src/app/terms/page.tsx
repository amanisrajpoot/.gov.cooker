import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

export default function TermsPage() {
  const termsSections = [
    {
      title: 'Acceptance of Terms',
      content: 'By using .gov.cooker, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our platform.',
      icon: CheckCircleIcon
    },
    {
      title: 'User Responsibilities',
      content: 'Users are responsible for ensuring their content is lawful, accurate, and does not violate any rights. Users must not engage in harassment, spam, or illegal activities.',
      icon: UserGroupIcon
    },
    {
      title: 'Platform Usage',
      content: 'The platform is provided for legitimate civic engagement purposes. Users must use the platform in accordance with applicable laws and regulations.',
      icon: ShieldCheckIcon
    },
    {
      title: 'Content Moderation',
      content: 'We reserve the right to moderate content and remove inappropriate material. Users may appeal moderation decisions through our established process.',
      icon: ExclamationTriangleIcon
    }
  ];

  const userAgreements = [
    {
      title: 'Account Registration',
      description: 'You must provide accurate information when creating an account. You are responsible for maintaining account security.',
      requirements: ['Valid email address', 'Secure password', 'Accurate personal information']
    },
    {
      title: 'Content Submission',
      description: 'All content submitted must be lawful and accurate. You retain ownership of your content while granting us necessary licenses.',
      requirements: ['Original or properly licensed content', 'Factual accuracy', 'Respect for others\' rights']
    },
    {
      title: 'Campaign Participation',
      description: 'When participating in campaigns, you agree to provide truthful information and respect the democratic process.',
      requirements: ['Genuine participation', 'Respect for campaign rules', 'Civil discourse']
    },
    {
      title: 'RTI Requests',
      description: 'RTI requests must be legitimate and in accordance with the Right to Information Act, 2005.',
      requirements: ['Valid information requests', 'Proper department targeting', 'Compliance with RTI Act']
    }
  ];

  const prohibitedActivities = [
    'Harassment, abuse, or threats against other users',
    'Spam, phishing, or other malicious activities',
    'Impersonation of others or false identity',
    'Violation of intellectual property rights',
    'Illegal activities or content',
    'Attempts to compromise platform security',
    'Misuse of reporting systems',
    'Commercial use without permission'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These terms govern your use of .gov.cooker. Please read them carefully 
                to understand your rights and responsibilities.
              </p>
            </div>

            {/* Key Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Terms</h2>
              <div className="space-y-6">
                {termsSections.map((section, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <section.icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                        <p className="text-gray-600">{section.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* User Agreements */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Agreements</h2>
              <div className="space-y-6">
                {userAgreements.map((agreement, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{agreement.title}</h3>
                    <p className="text-gray-600 mb-4">{agreement.description}</p>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {agreement.requirements.map((requirement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Prohibited Activities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prohibited Activities</h2>
              <Card className="p-6 bg-red-50 border-red-200">
                <div className="flex items-start space-x-4">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">The following activities are prohibited:</h3>
                    <ul className="space-y-2">
                      {prohibitedActivities.map((activity, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Platform Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <ScaleIcon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Moderation</h3>
                  <p className="text-gray-600 mb-4">
                    We reserve the right to moderate content, remove inappropriate material, 
                    and suspend accounts that violate our terms.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Content review and removal</li>
                    <li>• Account suspension or termination</li>
                    <li>• Appeal process available</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <ShieldCheckIcon className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Compliance</h3>
                  <p className="text-gray-600 mb-4">
                    We may cooperate with legal authorities when required by law and 
                    protect the platform from abuse.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Legal compliance requirements</li>
                    <li>• Cooperation with authorities</li>
                    <li>• Platform security measures</li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* Dispute Resolution */}
            <Card className="p-8 bg-primary-50">
              <div className="text-center">
                <DocumentTextIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
                <p className="text-gray-600 mb-6">
                  We are committed to resolving disputes fairly and transparently. 
                  If you have concerns about our terms or platform usage, please contact us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Step 1</h3>
                    <p className="text-sm text-gray-600">Contact our support team</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Step 2</h3>
                    <p className="text-sm text-gray-600">Internal review process</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Step 3</h3>
                    <p className="text-sm text-gray-600">Resolution or escalation</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <a href="/contact">Contact Support</a>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Legal Information */}
            <div className="mt-12">
              <Card className="p-6 bg-gray-100">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Information</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    These terms are governed by Indian law. For questions about legal matters, 
                    please consult with qualified legal professionals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/legal">Legal Information</a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/privacy">Privacy Policy</a>
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
