import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  EyeIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function TransparencyPage() {
  const transparencyMetrics = [
    {
      title: 'Platform Usage',
      value: '15,420',
      description: 'Total users registered',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Campaigns Launched',
      value: '1,250',
      description: 'Active campaigns on platform',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'RTI Requests',
      value: '3,890',
      description: 'RTI requests submitted',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Issues Resolved',
      value: '890',
      description: 'Issues successfully resolved',
      change: '+22%',
      trend: 'up'
    }
  ];

  const transparencyReports = [
    {
      title: 'Monthly Transparency Report',
      description: 'Comprehensive report on platform activity, user engagement, and outcomes',
      period: 'January 2024',
      downloads: 234,
      lastUpdated: '2024-02-01'
    },
    {
      title: 'Campaign Success Analysis',
      description: 'Analysis of successful campaigns and their impact on governance',
      period: 'Q4 2023',
      downloads: 156,
      lastUpdated: '2024-01-15'
    },
    {
      title: 'RTI Response Tracking',
      description: 'Government response rates and compliance with RTI requests',
      period: '2023 Annual',
      downloads: 89,
      lastUpdated: '2024-01-01'
    }
  ];

  const governanceStructure = [
    {
      role: 'Board of Directors',
      members: 7,
      description: 'Independent board members overseeing platform governance',
      responsibilities: ['Strategic oversight', 'Financial accountability', 'Policy decisions']
    },
    {
      role: 'Advisory Council',
      members: 12,
      description: 'Experts from civil society, legal, and technology sectors',
      responsibilities: ['Policy guidance', 'Technical advice', 'Community representation']
    },
    {
      role: 'User Representatives',
      members: 5,
      description: 'Elected representatives from the user community',
      responsibilities: ['User feedback', 'Feature requests', 'Community concerns']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Transparency</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We believe in transparency not just for government, but for ourselves. 
                Here's how we operate, our impact, and our commitment to openness.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {transparencyMetrics.map((metric, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Transparency Reports */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transparency Reports</h2>
              <div className="space-y-6">
                {transparencyReports.map((report, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                        <p className="text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {report.period}
                          </span>
                          <span className="flex items-center">
                            <DocumentTextIcon className="h-4 w-4 mr-1" />
                            {report.downloads} downloads
                          </span>
                          <span>Updated {report.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <EyeIcon className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <DocumentTextIcon className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Governance Structure */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Governance Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {governanceStructure.map((structure, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <UserGroupIcon className="h-6 w-6 text-primary-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{structure.role}</h3>
                        <p className="text-sm text-gray-600">{structure.members} members</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{structure.description}</p>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Responsibilities:</h4>
                      <ul className="space-y-1">
                        {structure.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Financial Transparency */}
            <Card className="p-8 bg-primary-50">
              <div className="text-center">
                <ShieldCheckIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Transparency</h2>
                <p className="text-gray-600 mb-6">
                  We publish our financial reports, funding sources, and expenditure details 
                  to maintain complete transparency about our operations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Annual Budget</h3>
                    <p className="text-2xl font-bold text-primary-600">₹50 Lakhs</p>
                    <p className="text-sm text-gray-600">2024-25</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Funding Sources</h3>
                    <p className="text-2xl font-bold text-green-600">100%</p>
                    <p className="text-sm text-gray-600">Transparent</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Audit Status</h3>
                    <p className="text-2xl font-bold text-blue-600">Annual</p>
                    <p className="text-sm text-gray-600">External Audit</p>
                  </div>
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
