import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function HelpPage() {
  const faqs = [
    {
      id: 1,
      question: 'How do I start a campaign?',
      answer: 'Click on "Start a Campaign" from the main navigation, fill out the campaign form with details about the issue, target officials, and your goals. Make sure to provide clear evidence and specific demands.',
      category: 'Campaigns'
    },
    {
      id: 2,
      question: 'Is my identity protected when reporting issues?',
      answer: 'Yes, we use client-side encryption to protect your identity. Your personal information is encrypted before being sent to our servers, and you can choose to remain anonymous.',
      category: 'Privacy'
    },
    {
      id: 3,
      question: 'How do I submit an RTI request?',
      answer: 'Go to the RTI section, click "New RTI Request", fill out the form with the information you\'re seeking, select the appropriate department, and submit. We\'ll help you format it correctly.',
      category: 'RTI'
    },
    {
      id: 4,
      question: 'What happens after I sign a campaign?',
      answer: 'Your signature is recorded and verified. The campaign organizers and target officials are notified. You\'ll receive updates on the campaign\'s progress and any responses from officials.',
      category: 'Campaigns'
    },
    {
      id: 5,
      question: 'How do I know if my report was received?',
      answer: 'You\'ll receive a confirmation email with a tracking number. You can check the status of your report using this number on our platform.',
      category: 'Reports'
    },
    {
      id: 6,
      question: 'Can I edit or delete my campaign?',
      answer: 'You can edit your campaign details if it\'s still in draft status. Once published, you can only update certain information. Contact support for major changes.',
      category: 'Campaigns'
    }
  ];

  const categories = ['All', 'Campaigns', 'Privacy', 'RTI', 'Reports'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions and learn how to use .gov.cooker effectively.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center">
                <ShieldCheckIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety & Privacy</h3>
                <p className="text-gray-600 text-sm mb-4">Learn how we protect your identity and data</p>
                <Button variant="outline" size="sm">Read Guide</Button>
              </Card>
              <Card className="p-6 text-center">
                <DocumentTextIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">RTI Guide</h3>
                <p className="text-gray-600 text-sm mb-4">Step-by-step guide to filing RTI requests</p>
                <Button variant="outline" size="sm">Learn More</Button>
              </Card>
              <Card className="p-6 text-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Issues</h3>
                <p className="text-gray-600 text-sm mb-4">How to safely report corruption and issues</p>
                <Button variant="outline" size="sm">Get Started</Button>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === 'All' ? 'default' : 'outline'}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <QuestionMarkCircleIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                          <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                        </div>
                        <p className="text-gray-600 ml-8">{faq.answer}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {faq.category}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <Card className="p-8 bg-primary-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href="/contact">Contact Support</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/safety">Safety Guide</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
