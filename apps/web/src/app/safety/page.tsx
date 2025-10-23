import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function SafetyPage() {
  const safetyTips = [
    {
      icon: LockClosedIcon,
      title: 'Use Strong Passwords',
      description: 'Create unique, complex passwords for your account. Use a password manager to generate and store them securely.',
      level: 'high'
    },
    {
      icon: EyeSlashIcon,
      title: 'Stay Anonymous When Needed',
      description: 'Use our anonymous reporting features when dealing with sensitive issues. Your identity is protected through client-side encryption.',
      level: 'critical'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Secure Your Device',
      description: 'Keep your device updated, use screen locks, and avoid using public Wi-Fi for sensitive activities.',
      level: 'high'
    },
    {
      icon: GlobeAltIcon,
      title: 'Use VPN When Necessary',
      description: 'Consider using a VPN when accessing the platform from locations where your activity might be monitored.',
      level: 'medium'
    }
  ];

  const reportingGuidelines = [
    {
      step: 1,
      title: 'Gather Evidence Safely',
      description: 'Document incidents with photos, videos, or documents. Store evidence securely and make backups.',
      tips: ['Use secure cloud storage', 'Keep multiple copies', 'Document dates and locations']
    },
    {
      step: 2,
      title: 'Protect Your Identity',
      description: 'Use anonymous reporting features. Never include personal information in public reports.',
      tips: ['Use anonymous mode', 'Avoid personal details', 'Use secure communication']
    },
    {
      step: 3,
      title: 'Submit Securely',
      description: 'Use our encrypted submission system. Your data is protected with client-side encryption.',
      tips: ['Use the platform\'s secure forms', 'Verify encryption indicators', 'Don\'t use email for sensitive reports']
    },
    {
      step: 4,
      title: 'Follow Up Safely',
      description: 'Monitor your report status through secure channels. Avoid discussing sensitive cases in public.',
      tips: ['Use secure messaging', 'Monitor status updates', 'Keep communications private']
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Safety Guide</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn how to use .gov.cooker safely and protect yourself while fighting for transparency and accountability.
              </p>
            </div>

            {/* Safety Tips */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Safety Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {safetyTips.map((tip, index) => (
                  <Card key={index} className={`p-6 border-l-4 ${getLevelColor(tip.level)}`}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <tip.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                        <p className="text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reporting Guidelines */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Safe Reporting Guidelines</h2>
              <div className="space-y-6">
                {reportingGuidelines.map((guideline) => (
                  <Card key={guideline.step} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                          {guideline.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{guideline.title}</h3>
                        <p className="text-gray-600 mb-3">{guideline.description}</p>
                        <ul className="space-y-1">
                          {guideline.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <Card className="p-8 bg-red-50 border-red-200">
              <div className="text-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency Situations</h2>
                <p className="text-gray-600 mb-6">
                  If you're in immediate danger or facing threats, contact emergency services immediately.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Police</h3>
                    <p className="text-2xl font-bold text-red-600">100</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Women Helpline</h3>
                    <p className="text-2xl font-bold text-red-600">181</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Child Helpline</h3>
                    <p className="text-2xl font-bold text-red-600">1098</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Resources */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <ShieldCheckIcon className="h-8 w-8 text-primary-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Security</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about digital security best practices and tools to protect your online privacy.
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </Card>
                <Card className="p-6">
                  <LockClosedIcon className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Protection</h3>
                  <p className="text-gray-600 mb-4">
                    Understand your legal rights and protections when reporting corruption and issues.
                  </p>
                  <Button variant="outline" size="sm">Read Guide</Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
