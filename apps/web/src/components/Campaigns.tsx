'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Skeleton } from './ui/Skeleton';
import {
  ArrowRightIcon,
  ShareIcon,
  EyeIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  title: string;
  description: string;
  status: string;
  signature_count: number;
  verified_signature_count: number;
  anonymous_signature_count: number;
  targets: any[];
  created_at: string;
  expires_at?: string;
  progress: number;
  owner: {
    handle: string;
  };
}

interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function Campaigns() {
  const [filters, setFilters] = useState({
    search: '',
    geo: '',
    status: '',
    page: 1,
    limit: 12,
  });
  const [data, setData] = useState<CampaignsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simple test data for now
  const testData = {
    campaigns: [
      {
        id: '1',
        title: 'Fix Mumbai Roads',
        description: 'Campaign to fix potholes and improve road infrastructure in Mumbai',
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
        progress: 75,
        owner: { handle: 'citizen123' }
      },
      {
        id: '2',
        title: 'Clean Ganga River',
        description: 'Demand immediate action to clean and restore the ecological balance of the Ganga River.',
        status: 'active',
        signature_count: 800,
        verified_signature_count: 600,
        anonymous_signature_count: 200,
        targets: [
          { name: 'National Mission for Clean Ganga', role: 'Director General' },
          { name: 'Ministry of Jal Shakti', role: 'Minister' }
        ],
        created_at: '2024-01-10T12:00:00Z',
        expires_at: '2024-04-10T12:00:00Z',
        location: 'Varanasi, Uttar Pradesh',
        category: 'environment',
        urgency: 'medium',
        progress: 50,
        owner: { handle: 'environmentalist' }
      }
    ],
    total: 2,
    page: 1,
    limit: 12,
    totalPages: 1
  };

  useEffect(() => {
    // Simulate API call
    console.log('Campaigns component mounted');
    setTimeout(() => {
      console.log('Setting test data');
      setData(testData);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFilters(prev => ({
      ...prev,
      search: formData.get('search') as string,
      page: 1,
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const campaigns = data?.campaigns || [];
  const totalPages = data?.totalPages || 1;

  console.log('Campaigns component render:', { data, campaigns, isLoading, error });
  
  // Debug: Show what we're getting
  if (data) {
    console.log('Data received:', data);
    console.log('Campaigns array:', campaigns);
  }

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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load campaigns: {error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  // Debug: Show loading state
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-blue-600 mb-4">Loading campaigns... (isLoading: {isLoading.toString()})</p>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // Debug: Show what we have
  console.log('Campaigns render:', { data, campaigns, isLoading, error });

  // Simple test - just show the data
  if (data && data.campaigns) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container-mobile">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Active Campaigns</h2>
            <p className="text-lg text-gray-600">Join thousands of citizens fighting for change</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-4">{campaign.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{campaign.signature_count} signatures</span>
                  <span className="text-sm text-blue-600">{campaign.progress}% complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback - show test data directly
  return (
    <div className="py-16 bg-gray-50">
      <div className="container-mobile">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Active Campaigns</h2>
          <p className="text-lg text-gray-600">Join thousands of citizens fighting for change</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/campaigns/1" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fix Mumbai Roads</h3>
              <p className="text-gray-600 mb-4">Campaign to fix potholes and improve road infrastructure in Mumbai</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">1250 signatures</span>
                <span className="text-sm text-blue-600">75% complete</span>
              </div>
            </div>
          </Link>
          <Link href="/campaigns/2" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean Ganga River</h3>
              <p className="text-gray-600 mb-4">Demand immediate action to clean and restore the ecological balance of the Ganga River.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">800 signatures</span>
                <span className="text-sm text-blue-600">50% complete</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-mobile">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Active Campaigns
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of citizens fighting for transparency and accountability
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                name="search"
                placeholder="Search campaigns..."
                className="flex-1 input"
                defaultValue={filters.search}
              />
              <Button type="submit" className="sm:w-auto">
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap gap-4 justify-center">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input w-auto"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filters.geo}
              onChange={(e) => handleFilterChange('geo', e.target.value)}
              className="input w-auto"
            >
              <option value="">All Locations</option>
              <option value="IN-MH">Maharashtra</option>
              <option value="IN-DL">Delhi</option>
              <option value="IN-KA">Karnataka</option>
              <option value="IN-TN">Tamil Nadu</option>
            </select>
          </div>
        </div>

        {/* Campaigns Grid */}
        {isLoading ? (
          <div className="grid-mobile">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-4" />
                <Skeleton className="h-8 w-1/3 mb-4" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid-mobile">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {campaign.description}
                    </p>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    <span className="font-medium">
                      {formatNumber(campaign.signature_count)} signatures
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {formatNumber(campaign.verified_signature_count)} verified
                    </span>
                  </div>

                  {campaign.targets && campaign.targets.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span>Target: {campaign.targets[0]?.name || 'Multiple officials'}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>
                      {campaign.expires_at 
                        ? `Expires ${new Date(campaign.expires_at).toLocaleDateString()}`
                        : 'No expiration'
                      }
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1">
                    <Link href={`/campaigns/${campaign.id}`}>
                      View Campaign
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="sm:w-auto">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {data && data.total > filters.limit && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === 1}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
              >
                Previous
              </Button>
              
              <span className="text-sm text-gray-600">
                Page {filters.page} of {Math.ceil(data.total / filters.limit)}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page >= Math.ceil(data.total / filters.limit)}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EyeIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <Button asChild>
              <Link href="/campaigns/create">
                Create First Campaign
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
