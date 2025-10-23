import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Link from 'next/link';
import {
  PlusIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  EyeIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function IssuesPage() {
  const mockIssues = [
    {
      id: '1',
      title: 'Corruption in Land Records',
      description: 'Systematic corruption in land record maintenance affecting thousands of farmers',
      status: 'investigating',
      severity: 'high',
      location: 'Rajasthan',
      created_at: '2024-01-15T10:00:00Z',
      reports_count: 45,
      verified_reports: 38
    },
    {
      id: '2',
      title: 'Delayed Pension Payments',
      description: 'Senior citizens not receiving pension payments on time',
      status: 'active',
      severity: 'critical',
      location: 'Kerala',
      created_at: '2024-01-12T08:00:00Z',
      reports_count: 120,
      verified_reports: 95
    },
    {
      id: '3',
      title: 'Water Supply Irregularities',
      description: 'Inconsistent water supply and poor water quality in residential areas',
      status: 'resolved',
      severity: 'medium',
      location: 'Mumbai',
      created_at: '2024-01-10T14:00:00Z',
      reports_count: 67,
      verified_reports: 52
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'investigating':
        return <ClockIcon className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircleIcon className="h-4 w-4" />;
      default:
        return <ExclamationTriangleIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Reported Issues</h1>
                <p className="text-gray-600">Citizen reports of corruption and governance issues</p>
              </div>
              <Button asChild className="flex items-center">
                <Link href="/issues/report" className="flex items-center">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Report an Issue
                </Link>
              </Button>
            </div>

            {/* Issues List */}
            <div className="space-y-6">
              {mockIssues.map((issue) => (
                <Card key={issue.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                        <Badge className={getStatusColor(issue.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(issue.status)}
                            {issue.status}
                          </div>
                        </Badge>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{issue.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {issue.location}
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {issue.reports_count} reports
                        </div>
                        <div className="text-green-600">
                          {issue.verified_reports} verified
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex items-center">
                        <Link href={`/issues/${issue.id}`} className="flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Reported:</strong> {new Date(issue.created_at).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Status:</strong> {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                    </div>
                    <div>
                      <strong>Severity:</strong> {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Issue Reporting Information */}
            <Card className="p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Report Issues</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  Report corruption, maladministration, or governance issues anonymously and securely. 
                  Your identity is protected through client-side encryption.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">What you can report:</h4>
                    <ul className="space-y-1">
                      <li>• Corruption and bribery</li>
                      <li>• Maladministration</li>
                      <li>• Service delivery failures</li>
                      <li>• Policy violations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Protection features:</h4>
                    <ul className="space-y-1">
                      <li>• Anonymous reporting</li>
                      <li>• Client-side encryption</li>
                      <li>• Secure evidence upload</li>
                      <li>• Legal protection</li>
                    </ul>
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
