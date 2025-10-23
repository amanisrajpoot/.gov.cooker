import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ShareIcon,
  EyeIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  title: string;
  description: string;
  status: string;
  signature_count: number;
  verified_signature_count: number;
  anonymous_signature_count: number;
  targets: Array<{ name: string; role: string }>;
  created_at: string;
  expires_at: string;
  location: string;
  category: string;
  urgency: string;
  progress: number;
}

// Mock campaign data
const mockCampaign: Campaign = {
  id: '1',
  title: 'Fix Mumbai Roads',
  description: 'Campaign to fix potholes and improve road infrastructure in Mumbai. This campaign aims to hold the Mumbai Municipal Corporation accountable for the poor state of roads that cause daily inconvenience to millions of citizens.',
  status: 'active',
  signature_count: 1250,
  verified_signature_count: 1100,
  anonymous_signature_count: 150,
  targets: [
    { name: 'Mumbai Municipal Corporation', role: 'Mayor' },
    { name: 'Public Works Department', role: 'Commissioner' }
  ],
  created_at: '2024-01-15T10:00:00Z',
  expires_at: '2024-03-15T10:00:00Z',
  location: 'Mumbai, Maharashtra',
  category: 'infrastructure',
  urgency: 'high',
  progress: 75
};

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = mockCampaign; // In real app, fetch by params.id

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

            {/* Campaign Header */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Badge className={getUrgencyColor(campaign.urgency)}>
                      {campaign.urgency} priority
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {campaign.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    {campaign.description}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Sign Campaign
                  </Button>
                </div>
              </div>

              {/* Campaign Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {campaign.signature_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Signatures</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {campaign.verified_signature_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {campaign.progress}%
                  </div>
                  <div className="text-sm text-gray-600">Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {new Date(campaign.expires_at).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Expires</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Campaign Progress</span>
                  <span>{campaign.progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>

              {/* Campaign Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-3" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4 mr-3" />
                      <span>Created {new Date(campaign.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-3" />
                      <span>Expires {new Date(campaign.expires_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Officials</h3>
                  <div className="space-y-2">
                    {campaign.targets.map((target, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{target.name}</div>
                          <div className="text-sm text-gray-600">{target.role}</div>
                        </div>
                        <Button size="sm" variant="outline" className="flex items-center">
                          Contact
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Signatures */}
            <Card className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Signatures</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Citizen #{1000 + i}</div>
                        <div className="text-sm text-gray-600">
                          {i === 1 ? 'Verified' : 'Anonymous'} • {i} hours ago
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {campaign.location}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}