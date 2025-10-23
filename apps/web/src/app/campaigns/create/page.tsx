import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import Link from 'next/link';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            {/* Back Button */}
            <div className="mb-6">
              <Button variant="outline" asChild>
                <Link href="/campaigns">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Campaigns
                </Link>
              </Button>
            </div>

            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Start a New Campaign
              </h1>
              <p className="text-lg text-gray-600">
                Create a campaign to hold officials accountable and drive change
              </p>
            </div>

            {/* Campaign Creation Form */}
            <Card className="p-8">
              <form className="space-y-6">
                {/* Campaign Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="e.g., Fix Mumbai Roads"
                    className="w-full input"
                    required
                  />
                </div>

                {/* Campaign Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe the issue and what change you want to see..."
                    className="w-full input"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g., Mumbai, Maharashtra"
                    className="w-full input"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select id="category" name="category" className="w-full input" required>
                    <option value="">Select a category</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="environment">Environment</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="corruption">Corruption</option>
                    <option value="governance">Governance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select id="urgency" name="urgency" className="w-full input" required>
                    <option value="">Select urgency level</option>
                    <option value="high">High - Immediate action needed</option>
                    <option value="medium">Medium - Action needed within weeks</option>
                    <option value="low">Low - Action needed within months</option>
                  </select>
                </div>

                {/* Target Officials */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Officials *
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Official Name"
                        className="flex-1 input"
                      />
                      <input
                        type="text"
                        placeholder="Role/Position"
                        className="flex-1 input"
                      />
                      <Button type="button" variant="outline" size="sm">
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Add the officials or departments you want to hold accountable
                    </div>
                  </div>
                </div>

                {/* Campaign Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Duration (days) *
                  </label>
                  <select id="duration" name="duration" className="w-full input" required>
                    <option value="">Select duration</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="120">120 days</option>
                  </select>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="additional" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="additional"
                    name="additional"
                    rows={3}
                    placeholder="Any additional context, evidence, or supporting information..."
                    className="w-full input"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mt-1 mr-3"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and 
                    <Link href="/privacy" className="text-primary-600 hover:underline ml-1">Privacy Policy</Link>. 
                    I understand that this campaign will be public and my information may be visible to others.
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/campaigns">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex-1">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </form>
            </Card>

            {/* Help Section */}
            <Card className="p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Be specific about the issue and the change you want to see</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Include relevant evidence, documents, or supporting information</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Target the right officials who have the power to make changes</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Keep your campaign focused on a single, clear issue</p>
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