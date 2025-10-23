import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@govcooker.org',
      responseTime: 'Within 24 hours'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM IST',
      responseTime: 'Immediate'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+91-XXX-XXXX-XXX',
      responseTime: 'Business hours only'
    }
  ];

  const departments = [
    {
      name: 'Technical Support',
      email: 'tech@govcooker.org',
      description: 'Platform issues, bugs, and technical problems'
    },
    {
      name: 'Legal Assistance',
      email: 'legal@govcooker.org',
      description: 'Legal questions, rights, and protection concerns'
    },
    {
      name: 'Media & Press',
      email: 'press@govcooker.org',
      description: 'Media inquiries, interviews, and press releases'
    },
    {
      name: 'Partnerships',
      email: 'partnerships@govcooker.org',
      description: 'Collaboration opportunities and partnerships'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get in touch with our team for support, questions, or to report issues. 
                We're here to help you make a difference.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <Card key={index} className="p-6 text-center">
                  <method.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="text-sm font-medium text-primary-600 mb-2">{method.contact}</p>
                  <p className="text-xs text-gray-500">{method.responseTime}</p>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select id="subject" name="subject" className="w-full input" required>
                      <option value="">Select a subject</option>
                      <option value="technical">Technical Support</option>
                      <option value="legal">Legal Question</option>
                      <option value="report">Report an Issue</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="media">Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full input"
                      placeholder="Please describe your inquiry in detail..."
                      required
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      className="mt-1 mr-3"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      I agree to the <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> and 
                      <a href="/terms" className="text-primary-600 hover:underline ml-1">Terms of Service</a>.
                    </label>
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Headquarters</p>
                        <p className="text-gray-600">123 Democracy Street<br />New Delhi, India 110001</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ClockIcon className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Business Hours</p>
                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST<br />Saturday: 10:00 AM - 2:00 PM IST</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Urgent Safety Issues</p>
                      <p className="text-gray-600 mb-2">If you're facing immediate threats or safety concerns:</p>
                      <p className="text-red-600 font-medium">emergency@govcooker.org</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-gray-600 mb-3">{dept.description}</p>
                    <p className="text-primary-600 font-medium">{dept.email}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
